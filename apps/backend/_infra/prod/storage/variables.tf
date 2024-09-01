variable "aws_region" {
  description = "The region in which the resources will be created"
  default     = "eu-west-1"
}

variable "project_name" {
  default = "snipcode"
}

variable "domain_name" {
  default = "snipcode.dev"
}

variable "environment" {
  default = "prod"
}

variable "doppler_database_prod_token" {
  default   = ""
  sensitive = true
}
