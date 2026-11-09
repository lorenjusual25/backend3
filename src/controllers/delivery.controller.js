import { deliveryService } from "../services/delivery.service.js";
export async function findAllDeliveries(req, res, next) {
    try {
        const deliveries = await deliveryService.findAll()
        res.json({status:"ok",payload:deliveries})
    } catch (error) {
        next(error)
    }
}
export async function findDeliveryById(req, res, next) {
    try {
        const delivery = await deliveryService.findById(req.params.id)
        res.json({status:"ok",payload:delivery})
    } catch (error) {
        next(error)
    }
}
export async function createDelivery(req, res, next) {
    try {
        const delivery = await deliveryService.create(req.body)
        res.json({status:"ok",payload:delivery})
    } catch (error) {
        next(error)
    }
}
export async function updateDelivery(req, res, next) {
    try {
        const delivery = await deliveryService.update(req.params.id, req.body)
        res.json({status:"ok",payload:delivery})
    } catch (error) {
        next(error)
    }
}
export async function deleteDelivery(req, res, next) {
    try {
        const delivery = await deliveryService.delete(req.params.id)
        res.json({status:"ok",payload:delivery})
    } catch (error) {
        next(error)
    }
}