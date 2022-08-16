/*
  Warnings:

  - You are about to drop the column `graphic_artist_id` on the `Article` table. All the data in the column will be lost.
  - Added the required column `graphics_artist_id` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_graphic_artist_id_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "graphic_artist_id",
ADD COLUMN     "graphics_artist_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_graphics_artist_id_fkey" FOREIGN KEY ("graphics_artist_id") REFERENCES "Journalist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
