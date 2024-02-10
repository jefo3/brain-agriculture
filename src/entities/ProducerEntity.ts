import { $Enums, Producer as ProducerPrisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

type TProducer = Partial<ProducerPrisma>;

export class Producer implements TProducer {
  id?: string;

  cpfCnpj: string;

  nameProducer: string;

  nameFarm: string;

  city: string;

  state: string;

  totalFarmArea: Decimal;

  agriculturalArea: Decimal;

  vegetationArea: Decimal;

  plantedCrops?: [] | $Enums.Crop[];

  createdAt?: Date;

  updatedAt?: Date;

  constructor(producer: TProducer) {
    Object.assign(this, producer);
  }
}
