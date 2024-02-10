import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProducerDTO } from "@dtos/createProducerDTO";
import { CreateProducerService } from "@services/producer/CreateProducerService";
import { ListProducerService } from "@services/producer/ListProducerService";

export class ProducerController {
  async create(request: Request, response: Response) {
    try {
      const data: CreateProducerDTO = request.body;

      const createProducerService = container.resolve(CreateProducerService);
      const producerCreated = await createProducerService.execute(data);

      return response.status(201).json({
        message: "User created successfully",
        data: producerCreated,
      });
    } catch (err) {
      return response.status(400).send(err.message);
    }
  }

  async list(request: Request, response: Response) {
    try {
      const listProducerService = container.resolve(ListProducerService);
      const producers = await listProducerService.execute();

      return response.status(200).json({
        message: "All Users",
        data: producers,
      });
    } catch (err) {
      return err;
    }
  }
}
