import { Router } from "express";
import { GenerateOrderController } from "../controller/generate_order.controller";

const router = Router()

router.get("get-orders/:userId/orderId")
router.post("/generate-order", GenerateOrderController)

export default router