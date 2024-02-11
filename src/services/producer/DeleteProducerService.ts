import { inject, injectable } from "tsyringe";

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
      throw new Error("Producer Not Exists");
    }

    const producer = await this.producersRepository.delete(id);
    return producer;
  }
}
