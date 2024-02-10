import { Router } from "express";

import { producerRoutes } from "@routes/producers.routes";

const router = Router();

router.use("/producers", producerRoutes);

export { router };
