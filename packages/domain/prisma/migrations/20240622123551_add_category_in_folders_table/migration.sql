-- AlterTable
ALTER TABLE `folders` ADD COLUMN `category` ENUM('visible', 'favorite', 'archived', 'hidden') NOT NULL DEFAULT 'visible';
