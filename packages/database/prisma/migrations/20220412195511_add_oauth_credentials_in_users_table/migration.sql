/*
  Warnings:

  - A unique constraint covering the columns `[accessToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessToken` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oauthProvider` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_role_id_key` ON `users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `accessToken` VARCHAR(100) NOT NULL,
    ADD COLUMN `oauthProvider` ENUM('github', 'stackoverflow', 'twitter') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_accessToken_key` ON `users`(`accessToken`);

-- CreateIndex
CREATE INDEX `users_role_id_idx` ON `users`(`role_id`);
