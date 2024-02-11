import { inject, injectable } from "tsyringe";

import { CreateProducerDTO } from "@dtos/createProducerDTO";
import { IProducerRepository } from "@repositories/IProducersRepository";
import { valitadeCpfOrCnpj } from "@shared/utils";

@injectable()
export class CreateProducerService {
  constructor(
    @inject("ProducersRepository")
    private producersRepository: IProducerRepository,
  ) {}

  async execute(data: CreateProducerDTO) {
    valitadeCpfOrCnpj(data.cpfCnpj);

    const producerAlreadyExists =
      await this.producersRepository.getProducerByCpforCnpj(data.cpfCnpj);

    if (producerAlreadyExists) {
      throw new Error("Producer already exists");
    }

    const producer = this.producersRepository.create(data);

    return producer;
  }
}
