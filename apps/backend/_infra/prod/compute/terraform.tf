terraform {
  cloud {
    workspaces {
      name = "snipcode-backend-compute-prod"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }
    ovh = {
      source  = "ovh/ovh"
      version = "~> 0.47.0"
    }
    doppler = {
      source  = "DopplerHQ/doppler"
      version = "~> 1.8.0"
    }
  }

  required_version = "~> 1.2"
}
