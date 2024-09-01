provider "aws" {
  region = var.aws_region
}

# Create Route53 Zone
resource "aws_route53_zone" "hosted_zone" {
  name = var.domain_name
}

