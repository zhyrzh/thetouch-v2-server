/*
  Warnings:

  - You are about to drop the column `articlePhotosId` on the `Article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticlePhotos" DROP CONSTRAINT "ArticlePhotos_article_id_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "articlePhotosId";

-- AlterTable
ALTER TABLE "ArticlePhotos" ALTER COLUMN "article_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ArticlePhotos" ADD CONSTRAINT "ArticlePhotos_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
