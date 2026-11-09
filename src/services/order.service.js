import { DELIVERY_PRIORITY } from "../constants/delivery.constants.js";
import { orderRepository } from "../repositories/order.repository.js";
import { AppError } from "../utils/error.js"
function calculateShippingCost(declaredValue, priority = DELIVERY_PRIORITY.NORMAL) {
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
    findAll: () => {
        return orderRepository.findAll()
    },
    findById: (id) => {
        const order = orderRepository.findById(id)
        if (!order) {
            throw new AppError("Orden no encontrada", 404)
        }
        return order
    },
    create: (order) => {
        if (!order.customer) {
            throw new AppError("El cliente no existe o no es válido", 400)
        }
        if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
            throw new AppError("La orden debe tener al menos un item", 400)
        }
        const itemsTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const declaredValue = order.declaredValue || itemsTotal
        const shippingCost = calculateShippingCost(declaredValue,order.priority)
        const total = declaredValue + shippingCost
        return orderRepository.create({
            ...order,
            declaredValue,
            shippingCost,
            total
        })
    },
    update: (id, updates) => {
        if (updates.priority) {
            const declaredValue = updates.declaredValue || updates.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
            const shippingCost = calculateShippingCost(declaredValue, updates.priority)
            updates.declaredValue = declaredValue
            updates.shippingCost = shippingCost
            updates.total = declaredValue + shippingCost
        }
        const order = orderRepository.update(id, updates)
        if (!order) {
            throw new AppError("Orden no encontrada", 404)
        }
        return order
    },
    delete: (id) => {
        const order = orderRepository.delete(id)
        if (!order) {
            throw new AppError("Orden no encontrada", 404)
        }
        return order
    }
}