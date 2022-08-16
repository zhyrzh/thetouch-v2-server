/*
  Warnings:

  - You are about to drop the column `authord_by` on the `articles` table. All the data in the column will be lost.
  - Added the required column `authored_by` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "authord_by",
ADD COLUMN     "authored_by" TEXT NOT NULL;
