import { inject, injectable } from "tsyringe";

import { CreateProducerDTO } from "@dtos/createProducerDTO";
import { IProducerRepository } from "@repositories/IProducersRepository";
import { isFarmAreasValid, valitadeCpfOrCnpj } from "@shared/utils";

@injectable()
export class CreateProducerService {
  constructor(
    @inject("ProducersRepository")
    private producersRepository: IProducerRepository,
  ) {}

  async execute(data: CreateProducerDTO) {
    valitadeCpfOrCnpj(data.cpfCnpj);

    const farmAreasIsValid = isFarmAreasValid({
      farmArea: data.totalFarmArea,
      agriculturalArea: data.agriculturalArea,
      vegetationArea: data.vegetationArea,
    });

    if (!farmAreasIsValid) {
      throw new Error(
        "agriculturalArea next to vegetationArea cannot be greater than the total area of the farm",
      );
    }

    const producerAlreadyExists =
      await this.producersRepository.getProducerByCpforCnpj(data.cpfCnpj);

    if (producerAlreadyExists) {
      throw new Error("Producer already exists");
    }

    const producer = this.producersRepository.create(data);

    return producer;
  }
}
