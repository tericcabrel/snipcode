terraform {
  cloud {
    workspaces {
      name = "snipcode-global-prod"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }
  }

  required_version = "~> 1.2"
}
