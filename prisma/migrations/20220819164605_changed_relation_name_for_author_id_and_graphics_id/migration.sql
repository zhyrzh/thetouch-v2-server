/*
  Warnings:

  - You are about to drop the column `author_id` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `graphics_artist_id` on the `articles` table. All the data in the column will be lost.
  - Added the required column `authored_by_id` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graphics_by_id` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_author_id_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_graphics_artist_id_fkey";

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "author_id",
DROP COLUMN "graphics_artist_id",
ADD COLUMN     "authored_by_id" INTEGER NOT NULL,
ADD COLUMN     "graphics_by_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_authored_by_id_fkey" FOREIGN KEY ("authored_by_id") REFERENCES "journalists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_graphics_by_id_fkey" FOREIGN KEY ("graphics_by_id") REFERENCES "journalists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
