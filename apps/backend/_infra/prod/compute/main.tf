provider "aws" {
  region = var.aws_region
}

provider "ovh" {
  endpoint = "ovh-eu"
}

provider "doppler" {}

provider "doppler" {
  doppler_token = var.doppler_backend_prod_token
  alias         = "backend_prod"
}

data "doppler_secrets" "prod" {
  provider = doppler.backend_prod
}

# Create IAM Role for App Runner
resource "aws_iam_role" "app_runner_role" {
  name = "${var.project_name}-backend-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "build.apprunner.amazonaws.com"
      }
    }]
  })
}

# Attach Policy to IAM Role
resource "aws_iam_role_policy" "app_runner_policy" {
  role = aws_iam_role.app_runner_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability"
        ],
        Effect   = "Allow",
        Resource = data.terraform_remote_state.storage.outputs.container_repository_arn
      },
      {
        Action   = "sts:AssumeRole",
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

# Create App Runner Auto Scaling Configuration
resource "aws_apprunner_auto_scaling_configuration_version" "app_runner_scaling" {
  auto_scaling_configuration_name = "${var.project_name}-backend-auto-scaling"
  max_concurrency                 = 200
  max_size                        = 3
  min_size                        = 1
}

# Create App Runner Service
resource "aws_apprunner_service" "api_service" {
  service_name = "${var.project_name}-backend-${var.environment}"

  instance_configuration {
    cpu    = "1 vCPU"
    memory = "2 GB"
  }

  source_configuration {
    auto_deployments_enabled = false

    image_repository {
      image_identifier      = "${data.terraform_remote_state.storage.outputs.container_repository_url}:latest"
      image_repository_type = "ECR_PUBLIC"

      image_configuration {
        port = data.doppler_secrets.prod.map.PORT

        runtime_environment_variables = {
          NODE_ENV                 = "production"
          ADMIN_PASSWORD           = data.doppler_secrets.prod.map.ADMIN_PASSWORD
          CONVERTKIT_API_KEY       = data.doppler_secrets.prod.map.CONVERTKIT_API_KEY
          CONVERTKIT_FORM_ID       = data.doppler_secrets.prod.map.CONVERTKIT_FORM_ID
          CONVERTKIT_TAG_ID        = data.doppler_secrets.prod.map.CONVERTKIT_TAG_ID
          DATABASE_URL             = data.doppler_secrets.prod.map.DATABASE_URL
          ENABLE_INTROSPECTION     = data.doppler_secrets.prod.map.ENABLE_INTROSPECTION
          GITHUB_CLIENT_ID         = data.doppler_secrets.prod.map.GITHUB_CLIENT_ID
          GITHUB_CLIENT_SECRET     = data.doppler_secrets.prod.map.GITHUB_CLIENT_SECRET
          HOST                     = data.doppler_secrets.prod.map.HOST
          JWT_SECRET               = data.doppler_secrets.prod.map.JWT_SECRET
          PORT                     = data.doppler_secrets.prod.map.PORT
          REQUEST_TIMEOUT          = data.doppler_secrets.prod.map.REQUEST_TIMEOUT
          SENTRY_DSN               = data.doppler_secrets.prod.map.SENTRY_DSN
          SENTRY_ENABLED           = data.doppler_secrets.prod.map.SENTRY_ENABLED
          SESSION_LIFETIME         = data.doppler_secrets.prod.map.SESSION_LIFETIME
          SNIPPET_RENDERER_API_URL = data.doppler_secrets.prod.map.SNIPPET_RENDERER_API_URL
          SNIPPET_RENDERER_URL     = data.doppler_secrets.prod.map.SNIPPET_RENDERER_URL
          WEB_APP_URL              = data.doppler_secrets.prod.map.WEB_APP_URL
          WEB_AUTH_ERROR_URL       = data.doppler_secrets.prod.map.WEB_AUTH_ERROR_URL
          WEB_AUTH_SUCCESS_URL     = data.doppler_secrets.prod.map.WEB_AUTH_SUCCESS_URL
        }
      }
    }
  }

  auto_scaling_configuration_arn = aws_apprunner_auto_scaling_configuration_version.app_runner_scaling.arn

  tags = {
    env = var.environment
  }
}

# Create ACM Certificate
resource "aws_acm_certificate" "api_domain_cert" {
  domain_name       = "${var.api_subdomain_name}.${var.domain_name}"
  validation_method = "DNS"

  tags = {
    Name = "${var.project_name}-${var.api_subdomain_name}-cert"
  }
}

# Create Route53 Record for ACM Certificate Validation
resource "aws_route53_record" "api_domain_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.api_domain_cert.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }

  zone_id = data.terraform_remote_state.global.outputs.hosted_zone_id

  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.value]
}

# Create Route53 Record for App Runner Service
resource "aws_route53_record" "api_domain" {
  zone_id = data.terraform_remote_state.global.outputs.hosted_zone_id
  name    = "${var.api_subdomain_name}.${var.domain_name}"
  type    = "CNAME"
  ttl     = 300

  records = [aws_apprunner_service.api_service.service_url]
}

# Create Custom Domain Association
resource "aws_apprunner_custom_domain_association" "api_domain" {
  service_arn = aws_apprunner_service.api_service.arn
  domain_name = aws_acm_certificate.api_domain_cert.domain_name
}

# Create DNS record for SSL certificate validation and the API domain on OVH
resource "ovh_domain_zone_record" "certificate_validation_dns_records" {
  for_each = {
    for dvo in aws_acm_certificate.api_domain_cert.domain_validation_options : dvo.domain_name => {
      name  = replace(dvo.resource_record_name, ".${var.domain_name}.", "") # Remove the domain name from the record name because it will be added in the zone field
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }

  zone      = var.domain_name
  subdomain = each.value.name
  fieldtype = each.value.type
  ttl       = 60
  target    = each.value.value
}

resource "ovh_domain_zone_record" "api_service_domain_validation_dns_records" {
  for_each = {
    for record in aws_apprunner_custom_domain_association.api_domain.certificate_validation_records : record.name => {
      name  = replace(record.name, ".${var.domain_name}.", "")
      type  = record.type
      value = record.value
    }
  }

  zone      = var.domain_name
  subdomain = each.value.name
  fieldtype = each.value.type
  ttl       = 60
  target    = each.value.value
}

resource "ovh_domain_zone_record" "api_domain_dns_record" {
  zone      = var.domain_name
  subdomain = var.api_subdomain_name
  fieldtype = "CNAME"
  ttl       = 60
  target    = aws_apprunner_service.api_service.service_url
}
