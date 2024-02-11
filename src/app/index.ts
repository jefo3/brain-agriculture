import "express-async-errors";
import "reflect-metadata";

import cors from "cors";
import express from "express";
import celebrateErrorHandler from "middlewares/celebrateErrorHandle";

import { router } from "@routes/index";

import "@shared/container";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(celebrateErrorHandler);

export { app };
