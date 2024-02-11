import { inject, injectable } from "tsyringe";

import { UpdateProducerDTO } from "@dtos/updateProducerDTO";
import {
  IProducerRepository,
  IUpdate,
} from "@repositories/IProducersRepository";

@injectable()
export class UpdateProducerService {
  constructor(
    @inject("ProducersRepository")
    private producersRepository: IProducerRepository,
  ) {}

  async execute({ data, id }: IUpdate) {
    const producerAlreadyExists =
      await this.producersRepository.getProducerById(id);

    if (!producerAlreadyExists) {
      throw new Error("Producer Not Exists");
    }

    const dataUpdate: UpdateProducerDTO = { ...data, updatedAt: new Date() };

    const producer = await this.producersRepository.update({
      data: dataUpdate,
      id,
    });

    return producer;
  }
}
