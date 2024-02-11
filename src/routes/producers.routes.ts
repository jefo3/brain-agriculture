import { Router } from "express";

import { ProducerController } from "@controllers/ProducerController";

const producerRoutes = Router();

const producerController = new ProducerController();

producerRoutes.post("/", producerController.create);
producerRoutes.get("/", producerController.list);
producerRoutes.delete("/:id", producerController.delete);
producerRoutes.put("/:id", producerController.update);

export { producerRoutes };
