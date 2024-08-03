output "backend_prod_token_key" {
  value = doppler_service_token.backend_prod_token.key
  sensitive = true
}

output "backend_dev_token_key" {
  value = doppler_service_token.backend_dev_token.key
  sensitive = true
}