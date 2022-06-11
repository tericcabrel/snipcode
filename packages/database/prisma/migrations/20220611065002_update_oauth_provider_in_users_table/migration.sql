-- AlterTable
ALTER TABLE `users` MODIFY `oauthProvider` ENUM('email', 'github', 'google', 'stackoverflow') NOT NULL;
