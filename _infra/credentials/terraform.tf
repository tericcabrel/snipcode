terraform {
  cloud {
    workspaces {
      name = "snipcode-credentials"
    }
  }

  required_providers {
    doppler = {
      source  = "DopplerHQ/doppler"
      version = "1.8.0"
    }
  }

  required_version = "~> 1.2"
}
