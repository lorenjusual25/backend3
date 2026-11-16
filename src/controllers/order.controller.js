import { orderService } from "../services/order.service.js"
import { successResponse } from "../utils/apiResponse.js";
export async function findAllOrders(req, res, next) {
    try {
        const orders = await orderService.findAll()
        successResponse(res, {message: "Ordenes obtenidas", payload: orders})
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