import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IProducerRepository } from "@repositories/IProducersRepository";

@injectable()
export class DeleteProducerService {
  constructor(
    @inject("ProducersRepository")
    private producersRepository: IProducerRepository,
  ) {}

  async execute(id: string) {
    const producerAlreadyExists =
      await this.producersRepository.getProducerById(id);

    if (!producerAlreadyExists) {
      throw new AppError("Producer Not Exists", 409);
    }

    const producer = await this.producersRepository.delete(id);
    return producer;
  }
}
