/*
  Warnings:

  - Added the required column `capacity` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `panelCount` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "capacity" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "endDate" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "panelCount" INTEGER NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Tamamlandı';
