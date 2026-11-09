import { Router } from "express";
import { findAllOrders, findOrderById, createOrder, updateOrder, deleteOrder } from "../controllers/order.controller.js";
const router = Router()
router.get("/", findAllOrders)
router.get("/:id", findOrderById)
router.post("/", createOrder)
router.put("/:id", updateOrder)
router.delete("/:id", deleteOrder)
export default router