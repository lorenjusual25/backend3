import logger from "../config/logger.js";
import { DELIVERY_PRIORITY } from "../constants/delivery.constants.js";
import { orderRepository } from "../repositories/order.repository.js";
import { AppError } from "../utils/error.js"
import { ERROR_CODES } from "../utils/errorDictionary.js";
import { userRepository } from "../repositories/user.repository.js";
import mongoose from "mongoose";
import { DOCUMENT_TYPES } from "../constants/document.constants.js";
import { ORDER_STATUS } from "../constants/order.constants.js";
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
    findAll: async ({skip, limit, status}) => {
        if (status && !Object.values(ORDER_STATUS).includes(status)) {
            throw new AppError(ERROR_CODES.INVALID_ORDER_STATUS)
        }
        const filter = status ? { status } : {}
        return await orderRepository.findPaginate({ skip, limit, filter })
    },
    findById: async (id) => {
        const order = await orderRepository.findById(id)
        if (!order) {
            throw new AppError(ERROR_CODES.ORDER_NOT_FOUND)
        }
        return order
    },
    create: async (order) => {
        if (typeof order.customer !== "string" || !mongoose.isObjectIdOrHexString(order.customer)
            || typeof order.deliveryAddress !== "string" || !order.deliveryAddress.trim()) {
            throw new AppError(ERROR_CODES.VALIDATION_ERROR);
        }
        const customerId = await userRepository.findById(order.customer)
        if (!customerId) {
            throw new AppError(ERROR_CODES.USER_NOT_FOUND)
        }
        if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
            throw new AppError(ERROR_CODES.VALIDATION_ERROR)
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
        if (updates.status) {
            if (!Object.values(ORDER_STATUS).includes(updates.status)) {
                throw new AppError(ERROR_CODES.INVALID_ORDER_STATUS)
            }
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
    },
    addProof: async (id, doc, type) => {
        const order = await orderRepository.findById(id)
        if (!order) {
            throw new AppError(ERROR_CODES.ORDER_NOT_FOUND)
        }
        if (!doc) {
            throw new AppError(ERROR_CODES.FILE_REQUIRED)
        }
        if (!Object.values(DOCUMENT_TYPES).includes(type)) {
            throw new AppError(ERROR_CODES.INVALID_DOCUMENT_TYPE)
        }
        logger.info("El comprobante paso todas las validaciones")
        const proof = {
            originalName: doc.originalname,
            fileName: doc.filename,
            path: doc.path,
            mimeType: doc.mimetype,
            size: doc.size,
            type
        }
        const proofs = [...order.proofs || [], proof]
        const updatedOrder = await orderRepository.update(id, { proofs })
        if (!updatedOrder) {
            throw new AppError(ERROR_CODES.ORDER_NOT_FOUND)
        }
        return updatedOrder
    }
}