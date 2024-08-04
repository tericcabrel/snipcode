output "app_runner_service_url" {
  description = "The URL of the AppRunner service"
  value       = aws_apprunner_service.api_service.service_url
}
