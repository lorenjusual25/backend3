import { orderService } from "../services/order.service.js"
import { successResponse } from "../utils/apiResponse.js";
import { unlink } from "node:fs/promises"
import logger from "../config/logger.js";
import { parsePagination } from "../utils/pagination.js";
export async function findAllOrders(req, res, next) {
    try {
        const { page, limit, offset } = parsePagination(req.query)
        const orders = await orderService.findAll({skip: offset, limit, status: req.query.status})
        successResponse(res, {message: "Ordenes obtenidas", page, limit, payload: orders})
    } catch (error) {
        next(error)
    }
}
export async function findOrderById(req, res, next) {
    try {
        const order = await orderService.findById(req.params.id)
        successResponse(res, {message: "Orden obtenida", payload: order})
    } catch (error) {
        next(error)
    }
}
export async function createOrder(req, res, next) {
    try {
        const order = await orderService.create(req.body)
        successResponse(res, {message: "Orden creada", payload: order})
    } catch (error) {
        next(error)
    }
}
export async function updateOrder(req, res, next) {
    try {
        const order = await orderService.update(req.params.id, req.body)
        successResponse(res, {message: "Orden actualizada", payload: order})
    } catch (error) {
        next(error)
    }
}
export async function deleteOrder(req, res, next) {
    try {
        const order = await orderService.delete(req.params.id)
        successResponse(res, {message: "Orden eliminada", payload: order})
    } catch (error) {
        next(error)
    }
}
export async function addProof(req, res, next) {
    try {
        const order = await orderService.addProof(req.params.id, req.file, req.body.type)
        logger.info("Comprobante agregado correctamente")
        successResponse(res, {message: "Documento subido correctamente", payload: order})
    } catch (error) {
        if (req.file) {
            await unlink(req.file.path)
        }
        next(error)
    }
}