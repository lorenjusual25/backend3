import { deliveryService } from "../services/delivery.service.js";
import { successResponse } from "../utils/apiResponse.js";
export async function findAllDeliveries(req, res, next) {
    try {
        const deliveries = await deliveryService.findAll()
        successResponse(res, {message: "Entregas obtenidas", payload: deliveries})
    } catch (error) {
        next(error)
    }
}
export async function findDeliveryById(req, res, next) {
    try {
        const delivery = await deliveryService.findById(req.params.id)
        successResponse(res, {message: "Entrega obtenida", payload: delivery})
    } catch (error) {
        next(error)
    }
}
export async function createDelivery(req, res, next) {
    try {
        const delivery = await deliveryService.create(req.body)
        successResponse(res, {message: "Entrega creada", payload: delivery})
    } catch (error) {
        next(error)
    }
}
export async function updateDelivery(req, res, next) {
    try {
        const delivery = await deliveryService.update(req.params.id, req.body)
        successResponse(res, {message: "Entrega actualizada", payload: delivery})
    } catch (error) {
        next(error)
    }
}
export async function deleteDelivery(req, res, next) {
    try {
        const delivery = await deliveryService.delete(req.params.id)
        successResponse(res, {message: "Entrega eliminada", payload: delivery})
    } catch (error) {
        next(error)
    }
}