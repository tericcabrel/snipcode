provider "doppler" {}

resource "doppler_project" "backend" {
  name        = "snipcode-backend"
  description = "The main backend project"
}