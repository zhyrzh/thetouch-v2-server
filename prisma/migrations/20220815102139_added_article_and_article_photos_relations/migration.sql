/*
  Warnings:

  - Added the required column `photo` to the `Journalist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journalist" ADD COLUMN     "photo" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "graphic_artist_id" INTEGER NOT NULL,
    "articlePhotosId" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticlePhotos" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "article_id" INTEGER NOT NULL,

    CONSTRAINT "ArticlePhotos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Journalist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_graphic_artist_id_fkey" FOREIGN KEY ("graphic_artist_id") REFERENCES "Journalist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticlePhotos" ADD CONSTRAINT "ArticlePhotos_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
