import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProducerDTO } from "@dtos/createProducerDTO";
import { UpdateProducerDTO } from "@dtos/updateProducerDTO";
import { CreateProducerService } from "@services/producer/CreateProducerService";
import { DeleteProducerService } from "@services/producer/DeleteProducerService";
import { ListProducerService } from "@services/producer/ListProducerService";
import { UpdateProducerService } from "@services/producer/UpdateProducerService";

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

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deleteProducerService = container.resolve(DeleteProducerService);

      const producer = await deleteProducerService.execute(id);

      return response.status(200).json({
        message: "User deleted",
        data: producer,
      });
    } catch (err) {
      return response.status(400).send(err.message);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data: UpdateProducerDTO = request.body;

      const updateProducerService = container.resolve(UpdateProducerService);

      const producer = await updateProducerService.execute({ data, id });

      return response.status(200).json({
        message: "User updated",
        data: producer,
      });
    } catch (err) {
      return response.status(400).send(err.message);
    }
  }
}
