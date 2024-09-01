provider "doppler" {}

resource "doppler_project" "backend" {
  name        = "snipcode-backend"
  description = "The main backend project"
}

resource "doppler_project" "database" {
  name        = "snipcode-database"
  description = "The main database project"
}
