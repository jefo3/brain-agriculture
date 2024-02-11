import { celebrate } from "celebrate";
import { Router } from "express";

import { ProducerController } from "@controllers/ProducerController";
import { createProducerSchema } from "@shared/validations/ProducersValidation";

const producerRoutes = Router();

const producerController = new ProducerController();

producerRoutes.post(
  "/",
  celebrate(createProducerSchema),
  producerController.create,
);
producerRoutes.get("/", producerController.list);
producerRoutes.delete("/:id", producerController.delete);
producerRoutes.put("/:id", producerController.update);

producerRoutes.get("/dashboard", producerController.dashboard);

export { producerRoutes };
