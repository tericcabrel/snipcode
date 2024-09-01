output "container_repository_arn" {
  description = "The ARN of the public ECR repository"
  value       = aws_ecrpublic_repository.app_container_repository.arn
}

output "container_repository_url" {
  description = "The URL of the public ECR repository"
  value       = aws_ecrpublic_repository.app_container_repository.repository_uri
}

output "rds_endpoint" {
  description = "The endpoint of the RDS instance in the production environment"
  value       = aws_db_instance.database.endpoint
  sensitive   = true
}
