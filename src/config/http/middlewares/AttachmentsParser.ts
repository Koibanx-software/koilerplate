import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express-serve-static-core";
import multer from "multer";

const upload: RequestHandler = multer({ limits: { fileSize: 10000000 } }).any();

export const attachmentParser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, next);
};
