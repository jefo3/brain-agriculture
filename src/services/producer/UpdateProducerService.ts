import { inject, injectable } from "tsyringe";

import { UpdateProducerDTO } from "@dtos/updateProducerDTO";
import { AppError } from "@errors/AppError";
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
      throw new AppError("Producer Not Exists", 409);
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
      throw new AppError(
        "agriculturalArea next to vegetationArea cannot be greater than the total area of the farm",
        422,
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
