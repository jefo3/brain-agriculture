/*
  Warnings:

  - A unique constraint covering the columns `[cpf_cnpj]` on the table `producers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "producers_cpf_cnpj_key" ON "producers"("cpf_cnpj");
