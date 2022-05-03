-- CreateTable
CREATE TABLE `folders` (
    `id` VARCHAR(50) NOT NULL,
    `user_id` VARCHAR(50) NOT NULL,
    `parent_id` VARCHAR(191) NULL,
    `name` VARCHAR(255) NOT NULL,
    `is_favorite` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `folders_name_idx`(`name`),
    INDEX `folders_is_favorite_idx`(`is_favorite`),
    INDEX `folders_user_id_idx`(`user_id`),
    INDEX `folders_parent_id_idx`(`parent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
