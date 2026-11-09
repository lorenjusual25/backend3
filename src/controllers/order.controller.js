import { orderService } from "../services/order.service.js"
export async function findAllOrders(req, res, next) {
    try {
        const orders = await orderService.findAll()
        res.json({status:"ok",payload: orders})
    } catch (error) {
        next(error)
    }
}
export async function findOrderById(req, res, next) {
    try {
        const order = await orderService.findById(req.params.id)
        res.json({status:"ok",payload: order})
    } catch (error) {
        next(error)
    }
}
export async function createOrder(req, res, next) {
    try {
        const order = await orderService.create(req.body)
        res.status(201).json({status:"ok",payload: order})
    } catch (error) {
        next(error)
    }
}
export async function updateOrder(req, res, next) {
    try {
        const order = await orderService.update(req.params.id, req.body)
        res.json({status:"ok",payload: order})
    } catch (error) {
        next(error)
    }
}
export async function deleteOrder(req, res, next) {
    try {
        const order = await orderService.delete(req.params.id)
        res.json({status:"ok",payload: order})
    } catch (error) {
        next(error)
    }
}