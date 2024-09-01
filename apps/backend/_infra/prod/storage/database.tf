provider "doppler" {}

provider "doppler" {
  doppler_token = var.doppler_database_prod_token
  alias         = "database_prod"
}

data "doppler_secrets" "prod" {
  provider = doppler.database_prod
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true
}

resource "aws_db_subnet_group" "default" {
  name       = "snipcode-prod-subnet-group"
  subnet_ids = [aws_subnet.public.id]

  tags = {
    Name = "Snipcode Prod subnet group"
  }
}

resource "aws_security_group" "rds_sg" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = data.doppler_secrets.prod.map.PORT
    to_port     = data.doppler_secrets.prod.map.PORT
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # This allows traffic from the internet (Use with caution)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Snipcode Prod Security Group"
  }
}

resource "aws_db_instance" "database" {
  identifier                            = "${var.project_name}-backend-${var.environment}"
  allocated_storage                     = 20
  engine                                = "mysql"
  engine_version                        = "8.0.39"
  instance_class                        = "db.t3.micro"
  db_name                               = data.doppler_secrets.prod.map.DATABASE_NAME
  username                              = data.doppler_secrets.prod.map.ADMIN_USER
  password                              = data.doppler_secrets.prod.map.ADMIN_PASSWORD
  db_subnet_group_name                  = aws_db_subnet_group.default.name
  vpc_security_group_ids                = [aws_security_group.rds_sg.id]
  multi_az                              = false
  publicly_accessible                   = true
  performance_insights_enabled          = true
  performance_insights_retention_period = 7 ## 7 days to stay in the free tier
  skip_final_snapshot                   = true
  allow_major_version_upgrade           = false
  auto_minor_version_upgrade            = true

  tags = {
    Name = "Snipcode Prod RDS Instance"
  }
}
