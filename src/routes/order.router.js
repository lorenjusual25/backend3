import { Router } from "express";
import { findAllOrders, findOrderById, createOrder, updateOrder, deleteOrder, addProof } from "../controllers/order.controller.js";
import upload from '../middlewares/upload.middleware.js';
const router = Router()
router.get("/", findAllOrders)
router.get("/:id", findOrderById)
router.post("/", createOrder)
router.put("/:id", updateOrder)
router.delete("/:id", deleteOrder)
router.post("/:id/proof", upload.single('document'), addProof)
export default router