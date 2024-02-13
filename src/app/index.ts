import "reflect-metadata";

import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";

import "express-async-errors";

import { errorHandler } from "@middlewares/errorHandle";
import { router } from "@routes/index";

import swaggerFile from "../../swagger.json";

import "@shared/container";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(router);
app.use(errorHandler);

export { app };
