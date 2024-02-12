import { CelebrateError } from "celebrate";
import { Request, Response, NextFunction } from "express";

import { AppError } from "@errors/AppError";

export const errorHandler = (
  err: Error,
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof CelebrateError) {
    const errorMessage = err.details.get("body")?.message;

    return response.status(400).json({
      status: "error",
      message: errorMessage,
    });
  }

  next(err);

  return response
    .status(500)
    .json({ message: `Internal Server Error - ${err.message}` });
};
