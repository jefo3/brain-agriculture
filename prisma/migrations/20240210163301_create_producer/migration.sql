-- CreateEnum
CREATE TYPE "Crop" AS ENUM ('soja', 'milho', 'algodao', 'cafe', 'cana_de_acucar');

-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "name_producer" TEXT NOT NULL,
    "name_farm" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_farm_area" DECIMAL(10,2) NOT NULL,
    "agricultural_area" DECIMAL(10,2) NOT NULL,
    "vegetation_area" DECIMAL(10,2) NOT NULL,
    "planted_crops" "Crop"[] DEFAULT ARRAY[]::"Crop"[],
    "creadted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);
