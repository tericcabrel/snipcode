data "terraform_remote_state" "storage" {
  backend = "remote"

  config = {
    organization = var.organization
    workspaces = {
      name = "snipcode-backend-storage-prod"
    }
  }
}

data "terraform_remote_state" "global" {
  backend = "remote"

  config = {
    organization = var.organization
    workspaces = {
      name = "snipcode-global-prod"
    }
  }
}
