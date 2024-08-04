variable "aws_region" {
  description = "The region in which the resources will be created"
  default     = "us-east-1"
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