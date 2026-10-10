-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Kitchen" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Kitchen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KitchenImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "kitchenId" INTEGER NOT NULL,

    CONSTRAINT "KitchenImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KitchenImage" ADD CONSTRAINT "KitchenImage_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
