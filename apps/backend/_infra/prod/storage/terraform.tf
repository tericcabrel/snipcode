terraform {
  cloud {
    workspaces {
      name = "snipcode-backend-storage-prod"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }

    doppler = {
      source  = "DopplerHQ/doppler"
      version = "~> 1.8.0"
    }
  }

  required_version = "~> 1.2"
}
