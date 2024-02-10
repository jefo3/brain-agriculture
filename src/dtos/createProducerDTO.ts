import { $Enums, Prisma } from "@prisma/client";

type TCreateProducer = Prisma.ProducerCreateInput;

export class CreateProducerDTO implements TCreateProducer {
  cpfCnpj: string;
  nameProducer: string;
  nameFarm: string;
  city: string;
  state: string;
  totalFarmArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  plantedCrops?: [] | $Enums.Crop[];
}
