import { $Enums, Prisma } from "@prisma/client";

type TUpdateProducer = Prisma.ProducerUpdateInput;

export class UpdateProducerDTO implements TUpdateProducer {
  cpfCnpj?: string;
  nameProducer?: string;
  nameFarm?: string;
  city?: string;
  state?: string;
  totalFarmArea?: number;
  agriculturalArea?: number;
  vegetationArea?: number;
  plantedCrops?: [] | $Enums.Crop[];
  updatedAt?: Date;
}
