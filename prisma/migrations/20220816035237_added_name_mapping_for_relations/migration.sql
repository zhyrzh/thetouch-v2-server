/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArticlePhotos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Journalist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_graphics_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "ArticlePhotos" DROP CONSTRAINT "ArticlePhotos_article_id_fkey";

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "ArticlePhotos";

-- DropTable
DROP TABLE "Journalist";

-- CreateTable
CREATE TABLE "journalists" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "journalists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "graphics_artist_id" INTEGER NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_photos" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "article_id" INTEGER,

    CONSTRAINT "article_photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "journalists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_graphics_artist_id_fkey" FOREIGN KEY ("graphics_artist_id") REFERENCES "journalists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_photos" ADD CONSTRAINT "article_photos_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
