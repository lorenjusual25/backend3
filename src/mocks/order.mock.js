import {faker} from '@faker-js/faker'
import { DELIVERY_PRIORITY } from '../constants/delivery.constants.js'
const generateMockItem = () => {
    return {
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 5 }),
        price: faker.commerce.price({min: 1, max:1000})
    }
}
export const generateMockOrder = (customerId) => ({
    customer:customerId,
    deliveryAddress:faker.location.streetAddress(),
    priority: faker.helpers.arrayElement(Object.values(DELIVERY_PRIORITY)),
    items: Array.from({ length: faker.number.int({ min: 1, max: 4 }) },generateMockItem)
})
export const generateMockOrders = (cant, customerIds) => {
    return Array.from({ length: cant }, () => generateMockOrder(faker.helpers.arrayElement(customerIds)))
}