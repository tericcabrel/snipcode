-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(50) NOT NULL,
    `name` ENUM('user', 'admin') NOT NULL,
    `level` INTEGER NOT NULL,
    `description` VARCHAR(200) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `username` VARCHAR(50) NULL,
    `name` VARCHAR(50) NOT NULL,
    `timezone` VARCHAR(50) NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT false,
    `picture_url` VARCHAR(255) NULL,
    `role_id` VARCHAR(50) NOT NULL,
    `oauthProvider` ENUM('github', 'google', 'stackoverflow') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_username_idx`(`username`),
    INDEX `users_role_id_idx`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
