/*
  Warnings:

  - Added the required column `billAmount` to the `Clinic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Clinic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clinic` ADD COLUMN `billAmount` INTEGER NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
