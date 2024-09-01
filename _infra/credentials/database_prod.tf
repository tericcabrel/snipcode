resource "doppler_environment" "database_prod" {
  project = doppler_project.database.name
  slug    = "prod"
  name    = "Production"
}

resource "doppler_config" "database_prod_config" {
  project     = doppler_project.database.name
  environment = doppler_environment.database_prod.slug
  name        = "prod_database"
}

resource "doppler_service_token" "database_prod_token" {
  project = doppler_project.database.name
  config = doppler_config.database_prod_config.name
  name = "CI Token"
  access = "read"
}

variable "database_prod_secrets_map" {
  type = map(string)
  default = {
    "ADMIN_USER" = "",
    "ADMIN_PASSWORD" = "",
    "DATABASE_NAME" = "",
    "PORT" = "3306"
    "CONNECTION_STRING" = ""
  }
}

resource "doppler_secret" "database_prod_secrets" {
  for_each = var.database_prod_secrets_map

  project = doppler_project.database.name
  config  = doppler_config.database_prod_config.name
  name    = each.key
  value   = each.value

  lifecycle {
    ignore_changes = [
      value,  # Ignore changes to the secret value
    ]
  }
}
