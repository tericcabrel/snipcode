-- CreateTable
CREATE TABLE `snippets` (
    `id` VARCHAR(50) NOT NULL,
    `user_id` VARCHAR(50) NOT NULL,
    `folder_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `language` VARCHAR(20) NOT NULL,
    `size` INTEGER NOT NULL DEFAULT 0,
    `visibility` ENUM('public', 'private') NOT NULL DEFAULT 'public',
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `snippets_name_idx`(`name`),
    INDEX `snippets_user_id_idx`(`user_id`),
    INDEX `snippets_folder_id_idx`(`folder_id`),
    INDEX `snippets_language_idx`(`language`),
    INDEX `snippets_visibility_idx`(`visibility`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
