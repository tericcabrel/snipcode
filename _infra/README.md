# Global infrastructure
Define the global infrastructure to used in the whole project by any services.

## Prerequisites
Make sure you have these tools installed before running the project
* Terraform 1.9+
* Terraform Cloud account
* Hashicorp Cloud Platform account
* AWS account
* OVH account
* Doppler account
* You defined "variables set" in the Hashicorp Cloud Platform organization for:
  * AWS: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
  * Doppler: `DOPPLER_TOKEN`
  * OVH: `OVH_APPLICATION_KEY`, `OVH_APPLICATION_SECRET`, and `OVH_CONSUMER_KEY`

## Setup
Create configuration file from the template
```shell
cp .env.template .env

# Edit configuration to set the Hashicorp Cloud Platform organization TF_CLOUD_ORGANIZATION and TF_VAR_organization
nano .env
```

Export the variables environment in the .env file
```shell
export $(grep -v '^#' .env | xargs)
```

Authenticate to HCP to generate a token on your computer
```shell
terraform login
```
You will be redirected in the browser to perform the authentication

Initialize the Terraform configuration for each folders
```shell
cd global
terraform init

cd ../credentials
terraform init
```

Verify you can access the remote Terraform state of the workspace
```shell
terraform plan
```

You can now edit you configuration, plan and apply!
