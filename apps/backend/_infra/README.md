# Backend infrastructure
Define the infrastructure needed to run this application in production which is AWS AppRunner.

## Prerequisites
Make sure you have these tools installed before running the project
* You have configured [the global infrastructure](../../../_infra/README.md) of the project.
* The organization environment variables are exported in the shell; test by running `echo $TF_CLOUD_ORGANIZATION`.

## Setup

Export the variables environment in the .env file
```shell
export $(grep -v '^#' ../../../_infra/.env | xargs)
```

Authenticate to HCP to generate a token on your computer
```shell
terraform login
```
You will be redirected in the browser to perform the authentication

Initialize the Terraform configuration
```shell
cd apps/backend/_infra/prod/storage
terraform init

cd apps/backend/_infra/prod/compute
terraform init
```

Verify you can access the remote Terraform state of the workspace
```shell
terraform plan
```

## Deploy the infrastructure from scratch
You must follow these steps to deploy the infrastructure from scratch 

Build the Docker image
```shell
cd apps/backend
docker build -t snipcode-backend:v1 --progress plain --build-arg APP_VERSION=1.1.7 -f apps/backend/Dockerfile .
```
The APP_VERSION value is the package.json version of this project

Deploy the resources for storing backend artefacts
```shell
cd apps/backend/_infra/prod/storage
terraform init
terraform apply
```

Tag the Docker image and push it to the ECR repository. Log into the public ECR repository created by Terraform
```shell
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin $(terraform output -raw container_repository_url)

docker tag snipcode-backend:v1 $(terraform output -raw container_repository_url):1.1.7
docker tag snipcode-backend:v1 $(terraform output -raw container_repository_url):latest
docker push --all-tags $(terraform output -raw container_repository_url)
```

Deploy the resources for running the backend
```shell
cd apps/backend/_infra/prod/compute
terraform init
terraform apply -target=aws_apprunner_custom_domain_association.api_domain
terraform apply
```

## Deploy the infrastructure changes
There is no particular task to do when apply new changes to the infrastructure.
Once you configuration changes are ready, run the following commands:
```shell
terraform plan
terraform apply
```
