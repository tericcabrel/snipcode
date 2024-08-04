provider "aws" {
  region = var.aws_region
}

# Create ECR Public Repository
resource "aws_ecrpublic_repository" "app_container_repository" {
  # provider = aws.us_east_1

  repository_name = "${var.project_name}-backend-${var.environment}"

  force_destroy = true

  catalog_data {
    architectures     = ["x86-64"]
    operating_systems = ["Linux"]
    # about_text        = "About Text"
    # description       = "Description"
    # usage_text        = "Usage Text"
  }

  tags = {
    env = var.environment
  }
}
