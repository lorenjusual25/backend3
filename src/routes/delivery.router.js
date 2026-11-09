import { Router } from "express";
import { findAllDeliveries, findDeliveryById, createDelivery, updateDelivery, deleteDelivery } from "../controllers/delivery.controller.js";
const router = Router()
router.get("/", findAllDeliveries)
router.get("/:id", findDeliveryById)
router.post("/", createDelivery)
router.put("/:id", updateDelivery)
router.delete("/:id", deleteDelivery)
export default router