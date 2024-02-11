import { inject, injectable } from "tsyringe";

import { UpdateProducerDTO } from "@dtos/updateProducerDTO";
import {
  IProducerRepository,
  IUpdate,
} from "@repositories/IProducersRepository";
import { isFarmAreasValid, valitadeCpfOrCnpj } from "@shared/utils";

@injectable()
export class UpdateProducerService {
  constructor(
    @inject("ProducersRepository")
    private producersRepository: IProducerRepository,
  ) {}

  async execute({ data, id }: IUpdate) {
    if (data?.cpfCnpj) valitadeCpfOrCnpj(data.cpfCnpj);

    const producerAlreadyExists =
      await this.producersRepository.getProducerById(id);

    if (!producerAlreadyExists) {
      throw new Error("Producer Not Exists");
    }

    const farmArea =
      data.totalFarmArea || Number(producerAlreadyExists.totalFarmArea);

    const agriculturalArea =
      data.agriculturalArea || Number(producerAlreadyExists.agriculturalArea);

    const vegetationArea =
      data.vegetationArea || Number(producerAlreadyExists.vegetationArea);

    const farmAreasIsValid = isFarmAreasValid({
      farmArea,
      agriculturalArea,
      vegetationArea,
    });

    if (!farmAreasIsValid) {
      throw new Error(
        "agriculturalArea next to vegetationArea cannot be greater than the total area of the farm",
      );
    }

    const dataUpdate: UpdateProducerDTO = { ...data, updatedAt: new Date() };

    const producer = await this.producersRepository.update({
      data: dataUpdate,
      id,
    });

    return producer;
  }
}
