import { deliveryRepository } from "../repositories/delivery.repository.js";
import { orderRepository } from "../repositories/order.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/error.js";
import { USER_ROLES } from "../constants/user.constants.js";
import { DELIVERY_STATUS } from "../constants/delivery.constants.js";
export const deliveryService = {
    findAll: () => {
        return deliveryRepository.findAll()
    },
    findById: (id) => {
        const delivery = deliveryRepository.findById(id)
        if (!delivery) {
            throw new AppError("Delivery no encontrado",404)
        }
        return delivery
    },
    create: async (delivery) => {
        const order = await orderRepository.findById(delivery.orderId)
        if (!order) {
            throw new AppError("Order no proporcionada", 400)
        }
        if (delivery.driver) {
            const driver = await userRepository.findById(delivery.driver.id)
            if (!driver) {
                throw new AppError("El usuario proporcionado no existe", 400)
            }
            if (driver.role !== USER_ROLES.DRIVER) {
                throw new AppError("El usuario proporcionado no es un conductor", 400)
            }
            delivery.status = DELIVERY_STATUS.ASSIGNED
            delivery.assignedAt = new Date()
        }
        return deliveryRepository.create(delivery)
    },
    update: (id, updates) => {
        if (updates.status) {
            if (updates.status === DELIVERY_STATUS.ASSIGNED) {
                updates.assignedAt = new Date()
            }
            if (updates.status === DELIVERY_STATUS.DELIVERED) {
                updates.deliveredAt = new Date()
            }
            if (updates.status === DELIVERY_STATUS.CANCELED) {
                updates.canceledAt = new Date()
            }
        }
        const delivery = deliveryRepository.update(id, updates)
        if (!delivery) {
            throw new AppError("Delivery no encontrado", 404)
        }
        return delivery
    },
    delete: (id) => {
        const delivery = deliveryRepository.findById(id)
        if (!delivery) {
            throw new AppError("Delivery no encontrado", 404)
        }
        return deliveryRepository.delete(id)
    }
}