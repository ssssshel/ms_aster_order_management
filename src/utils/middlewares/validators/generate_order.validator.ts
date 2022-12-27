import { check } from "express-validator";
import { validateCreateRequest } from "../../methods";

export const generateOrderValidator = [
  check('id_user').exists().isInt(),
  check('shipping_address').exists().isObject(),

  (req: any, res: any, next: any) => {
    validateCreateRequest(req, res, next)
  }
]