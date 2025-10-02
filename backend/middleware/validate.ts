// middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate =
  <T extends z.ZodType<any, any>>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ message: "Validation failed", error });
    }
  };
