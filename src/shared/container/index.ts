import { container } from "tsyringe";

import { ProducersRepository } from "@repositories/implementations/ProducersRepository";
import { IProducerRepository } from "@repositories/IProducersRepository";

container.registerSingleton<IProducerRepository>(
  "ProducersRepository",
  ProducersRepository,
);
