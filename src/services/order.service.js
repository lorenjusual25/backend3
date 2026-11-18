import logger from "../config/logger.js";
import { DELIVERY_PRIORITY } from "../constants/delivery.constants.js";
import { orderRepository } from "../repositories/order.repository.js";
import { AppError } from "../utils/error.js"
import { ERROR_CODES } from "../utils/errorDictionary.js";
export function calculateShippingCost(declaredValue, priority = DELIVERY_PRIORITY.NORMAL) {
    switch (priority) {
        case DELIVERY_PRIORITY.LOW:
            return declaredValue * 0.05
        case DELIVERY_PRIORITY.NORMAL:
            return declaredValue * 0.1
        case DELIVERY_PRIORITY.HIGH:
            return declaredValue * 0.3
    }
}
export const orderService = {
    findAll: async () => {
        return await orderRepository.findAll()
    },
    findById: async (id) => {
        const order = await orderRepository.findById(id)
        if (!order) {
            throw new AppError(ERROR_CODES.ORDER_NOT_FOUND)
        }
        return order
    },
    create: async (order) => {
        if (!order.customer) {
            throw new AppError(ERROR_CODES.USER_NOT_FOUND)
        }
        if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
            throw new AppError(ERROR_CODES.ORDER_LENGTH_INVALID)
        }
        const itemsTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const declaredValue = order.declaredValue || itemsTotal
        const shippingCost = calculateShippingCost(declaredValue,order.priority)
        const total = declaredValue + shippingCost
        logger.info("Pedido creado correctamente")
        return await orderRepository.create({
            ...order,
            declaredValue,
            shippingCost,
            total
        })
    },
    update: async (id, updates) => {
        if (updates.priority) {
            const declaredValue = updates.declaredValue || updates.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
            const shippingCost = calculateShippingCost(declaredValue, updates.priority)
            updates.declaredValue = declaredValue
            updates.shippingCost = shippingCost
            updates.total = declaredValue + shippingCost
        }
        const order = await orderRepository.update(id, updates)
        if (!order) {
            logger.error("Pedido no encontrado")
            throw new AppError(ERROR_CODES.ORDER_NOT_FOUND)
        }
        return order
    },
    delete: async (id) => {
        const order = await orderRepository.delete(id)
        if (!order) {
            throw new AppError(ERROR_CODES.ORDER_NOT_FOUND)
        }
        return order
    }
}