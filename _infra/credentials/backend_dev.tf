resource "doppler_environment" "backend_dev" {
  project = doppler_project.backend.name
  slug    = "dev"
  name    = "Development"
}

resource "doppler_config" "backend_dev_config" {
  project     = doppler_project.backend.name
  environment = doppler_environment.backend_dev.slug
  name        = "dev_backend"
}

resource "doppler_service_token" "backend_dev_token" {
  project = doppler_project.backend.name
  config = doppler_config.backend_dev_config.name
  name = "CI Token"
  access = "read"
}

variable "backend_dev_secrets_map" {
  type = map(string)
  default = {
    "ADMIN_PASSWORD" = "",
    "CONVERTKIT_API_KEY" = "",
    "CONVERTKIT_FORM_ID" = "",
    "CONVERTKIT_TAG_ID" = ""
    "DATABASE_URL" = ""
    "ENABLE_INTROSPECTION" = "false"
    "GITHUB_CLIENT_ID" = ""
    "GITHUB_CLIENT_SECRET" = ""
    "HOST" = "http://localhost"
    "JWT_SECRET" = ""
    "PORT" = "7501"
    "REQUEST_TIMEOUT" = "30000"
    "SENTRY_DSN" = ""
    "SENTRY_ENABLED" = "true"
    "SESSION_LIFETIME" = "14"
    "SNIPPET_RENDERER_API_URL" = ""
    "SNIPPET_RENDERER_URL" = ""
    "WEB_APP_URL" = ""
    "WEB_AUTH_ERROR_URL" = ""
    "WEB_AUTH_SUCCESS_URL" = ""
  }
}

resource "doppler_secret" "backend_dev_secrets" {
  for_each = var.backend_dev_secrets_map

  project = doppler_project.backend.name
  config  = doppler_config.backend_dev_config.name
  name    = each.key
  value   = each.value

  lifecycle {
    ignore_changes = [
      value,  # Ignore changes to the secret value
    ]
  }
}