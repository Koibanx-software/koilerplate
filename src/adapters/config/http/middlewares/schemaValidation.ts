import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidation =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(
          error.issues.map((issue) => ({
            status: 400,
            data: {
              reason: "SCHEMA_VALIDATION_ERROR",
              msg: issue.message,
            },
          }))
        );
      }
      return res.status(400).json({
        status: 400,
        data: {
          reason: "SCHEMA_VALIDATION_ERROR",
          msg: "schema",
        },
      });
    }
  };
