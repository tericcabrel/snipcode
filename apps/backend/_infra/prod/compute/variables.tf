variable "aws_region" {
  description = "The region in which the resources will be created"
  default     = "eu-west-1"
}

variable "organization" {
  description = "The organization name"
  type        = string
}

variable "project_name" {
  default = "snipcode"
}

variable "doppler_backend_prod_token" {
  default   = ""
  sensitive = true
}

variable "doppler_backend_dev_token" {
  default   = ""
  sensitive = true
}

variable "domain_name" {
  default = "snipcode.dev"
}

variable "environment" {
  default = "prod"
}

variable "api_subdomain_name" {
  default = "api"
}

variable "admin_password" {
  default   = ""
  sensitive = true
}

variable "convertkit_api_key" {
  default   = ""
  sensitive = true
}

variable "convertkit_form_id" {
  default   = ""
  sensitive = true
}

variable "convertkit_tag_id" {
  default   = ""
  sensitive = true
}

variable "database_url" {
  default   = ""
  sensitive = true
}

variable "enable_introspection" {
  default = "false"
}

variable "github_client_id" {
  default   = ""
  sensitive = true
}

variable "github_client_secret" {
  default   = ""
  sensitive = true
}

variable "jwt_secret" {
  default   = ""
  sensitive = true
}

variable "request_timeout" {
  default = "30000"
}

variable "sentry_dsn" {
  default   = ""
  sensitive = true
}

variable "sentry_enabled" {
  default = "true"
}

variable "session_lifetime" {
  default = "90"
}

variable "snippet_renderer_api_url" {
  default = "https://apidev.snipcode.dev"
}

variable "snippet_renderer_url" {
  default = "https://embed.snipcode.dev"
}

variable "web_app_url" {
  default = "https://www.snipcode.dev"
}

variable "web_auth_error_url" {
  default = "https://www.snipcode.dev/auth/error"
}

variable "web_auth_success_url" {
  default = "https://www.snipcode.dev/auth/success"
}

variable "port" {
  default = "7501"
}

variable "host" {
  default = "http://localhost"
}
