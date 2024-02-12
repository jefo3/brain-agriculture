import "reflect-metadata";

import cors from "cors";
import express from "express";
import "express-async-errors";

import { errorHandler } from "@middlewares/errorHandle";
import { router } from "@routes/index";

import "@shared/container";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

export { app };
