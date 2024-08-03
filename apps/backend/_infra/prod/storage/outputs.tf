output "container_repository_arn" {
  description = "The ARN of the public ECR repository"
  value       = aws_ecrpublic_repository.app_container_repository.arn
}

output "container_repository_url" {
  description = "The URL of the public ECR repository"
  value       = aws_ecrpublic_repository.app_container_repository.repository_uri
}