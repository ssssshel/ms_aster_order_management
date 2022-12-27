import { Router } from "express";
import { GenerateOrderController } from "../controller/generate_order.controller";
import { generateOrderValidator } from "../utils/middlewares/validators/generate_order.validator";

const router = Router()

router.get("get-orders/:userId/orderId")
router.post("/generate-order", generateOrderValidator, GenerateOrderController)

export default router