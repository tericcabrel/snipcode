/*
  Warnings:

  - Added the required column `theme` to the `snippets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `snippets` ADD COLUMN `theme` VARCHAR(20) NOT NULL;
