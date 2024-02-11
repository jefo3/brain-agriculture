import { CelebrateError } from "celebrate";
import { Request, Response, NextFunction } from "express";

export const celebrateErrorHandler = (
  err: CelebrateError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CelebrateError) {
    const errorMessage = err.details.get("body")?.message;

    return res.status(400).json({ error: errorMessage });
  }

  return next(err);
};

export default celebrateErrorHandler;
