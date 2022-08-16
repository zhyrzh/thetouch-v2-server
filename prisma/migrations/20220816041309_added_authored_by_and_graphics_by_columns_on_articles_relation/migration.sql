/*
  Warnings:

  - Added the required column `authord_by` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graphics_by` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "article_photos" DROP CONSTRAINT "article_photos_article_id_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_author_id_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_graphics_artist_id_fkey";

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "authord_by" TEXT NOT NULL,
ADD COLUMN     "graphics_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "journalists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_graphics_artist_id_fkey" FOREIGN KEY ("graphics_artist_id") REFERENCES "journalists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_photos" ADD CONSTRAINT "article_photos_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
