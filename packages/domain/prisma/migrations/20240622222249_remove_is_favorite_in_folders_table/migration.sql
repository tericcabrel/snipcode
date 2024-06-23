/*

  Warnings:
  - You are about to drop the column `is_favorite` on the `folders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `folders_is_favorite_idx` ON `folders`;

-- AlterTable
ALTER TABLE `folders` DROP COLUMN `is_favorite`;

-- CreateIndex
CREATE INDEX `folders_category_idx` ON `folders`(`category`);
