-- CreateTable
CREATE TABLE "Journalist" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Journalist_pkey" PRIMARY KEY ("id")
);
