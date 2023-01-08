/*
  Warnings:

  - Added the required column `public_id` to the `article_photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "article_photos" ADD COLUMN     "public_id" TEXT NOT NULL;
