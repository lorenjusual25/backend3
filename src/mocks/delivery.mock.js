import { faker } from "@faker-js/faker";
import { DELIVERY_STATUS } from "../constants/delivery.constants.js";
export const generateMockDelivery = (order, driverIds) => {
    const status = faker.helpers.arrayElement(Object.values(DELIVERY_STATUS))
    const delivery = {
        order: order._id,
        priority: order.priority,
        status,
        driver:null,
        assignedAt:null,
        deliveredAt:null,
        canceledAt:null
    }
    if (status !== DELIVERY_STATUS.PENDING) {
        delivery.driver = faker.helpers.arrayElement(driverIds)
        delivery.assignedAt = faker.date.recent({ days: 5 })
    }
    if (status === DELIVERY_STATUS.DELIVERED) {
        delivery.deliveredAt = faker.date.between({ from: delivery.assignedAt, to: new Date() })
    }
    if (status === DELIVERY_STATUS.CANCELED) {
        delivery.canceledAt = faker.date.between({ from: delivery.assignedAt,to: new Date()})
    }
    return delivery
}
export const generateMockDeliveries = (orders, driverIds) => {
    return orders.map(o => generateMockDelivery(o,driverIds))
}