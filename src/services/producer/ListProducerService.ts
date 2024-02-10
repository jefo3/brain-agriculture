import { inject, injectable } from "tsyringe";

import { IProducerRepository } from "@repositories/IProducersRepository";

@injectable()
export class ListProducerService {
  constructor(
    @inject("ProducersRepository")
    private producerRepository: IProducerRepository,
  ) {}

  async execute() {
    const producers = await this.producerRepository.list();

    return producers;
  }
}
