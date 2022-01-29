/*
  Warnings:

  - Added the required column `countryId` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "countryId" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DishCountry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DishCountry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DishCountry_name_key" ON "DishCountry"("name");

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "DishCountry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
