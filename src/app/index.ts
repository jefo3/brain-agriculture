import "express-async-errors";
import "reflect-metadata";

import cors from "cors";
import express from "express";

import { router } from "@routes/index";

import "@shared/container";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export { app };
