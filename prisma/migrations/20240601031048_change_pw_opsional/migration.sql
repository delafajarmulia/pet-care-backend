/*
  Warnings:

  - Made the column `password` on table `owner` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `owner` MODIFY `password` VARCHAR(191) NOT NULL;
