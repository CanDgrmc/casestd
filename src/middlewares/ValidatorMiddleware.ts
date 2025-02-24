import type { NextFunction, Request, Response } from "express";
import Validator from "../utils/Validator.ts";

export const ValidateBody =
  (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const result = Validator(schema, body);

    if (result.error) {
      res.status(400).json({
        success: false,
        error: result.error.details.map((i) => i.message),
      });
    } else {
      next();
    }
  };

export const ValidateParams =
  (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    const params = req.params;

    const result = Validator(schema, params);

    if (result.error) {
      res.status(400).json({
        success: false,
        error: result.error.details.map((i) => i.message),
      });
    } else {
      next();
    }
  };

export const ValidateMerged =
  (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    const params = { ...req.params, ...req.body };

    const result = Validator(schema, params);

    if (result.error) {
      res.status(400).json({
        success: false,
        error: result.error.details.map((i) => i.message),
      });
    } else {
      next();
    }
  };
