import { Request, Response, NextFunction, RequestHandler } from "express";

// Wraps async functions and passes errors to centralized middleware
export const asyncHandler =
  (fn: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
