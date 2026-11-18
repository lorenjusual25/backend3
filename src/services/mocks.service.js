import { generateMockUsers } from "../mocks/user.mock.js";
import { generateMockOrders } from "../mocks/order.mock.js";
import { generateMockDeliveries } from "../mocks/delivery.mock.js";
import { generateMockStores } from "../mocks/store.mock.js";
import { DEFAULT_MOCK_ITEMS, MAX_MOCK_ITEMS} from "../constants/mocks.constants.js";   
import { AppError } from "../utils/error.js";
import { userRepository } from "../repositories/user.repository.js";
import { orderRepository } from "../repositories/order.repository.js";
import { USER_ROLES } from "../constants/user.constants.js";
import { deliveryRepository } from "../repositories/delivery.repository.js";
import { storeRepository } from "../repositories/store.repository.js";
import { DELIVERY_STATUS } from "../constants/delivery.constants.js";
import { ORDER_STATUS } from "../constants/order.constants.js";
import { calculateShippingCost } from "./order.service.js";
import { ERROR_CODES } from "../utils/errorDictionary.js";
const orderStatusByDelivery = {
    [DELIVERY_STATUS.PENDING]: ORDER_STATUS.CREATED,
    [DELIVERY_STATUS.ASSIGNED]: ORDER_STATUS.ASSIGNED,
    [DELIVERY_STATUS.IN_TRANSIT]: ORDER_STATUS.IN_TRANSIT,
    [DELIVERY_STATUS.DELIVERED]: ORDER_STATUS.DELIVERED,
    [DELIVERY_STATUS.CANCELED]: ORDER_STATUS.CANCELED
}
function validateMockCant(cant = DEFAULT_MOCK_ITEMS) {
    if (!Number.isInteger(Number(cant)) || Number(cant) <= 0) {
        throw new AppError(ERROR_CODES.INVALID_MOCK_QUANTITY)
    }
    if (Number(cant) > MAX_MOCK_ITEMS) {
        throw new AppError(ERROR_CODES.MAX_MOCK_REACHED)
    }
    return Number(cant)
}
export const mockService = {
    getMockUsers: (cant = DEFAULT_MOCK_ITEMS) => {
        validateMockCant(cant)
        return generateMockUsers(cant)
    },
    getMockOrders: (cant = DEFAULT_MOCK_ITEMS, customerIds) => {
        validateMockCant(cant)
        return generateMockOrders(cant,customerIds)
    },
    getMockDeliveries: (orders, driverIds) => {
        validateMockCant(orders.length)
        return generateMockDeliveries(orders,driverIds)
    },
    seed: async(params = {}) => {
        const { users = 0, orders = 0, deliveries = 0, stores = 0 } = params
        const result = {
            users:0,
            orders:0,
            deliveries:0,
            stores:0
        }
        if (users > 0) {
            const createdUsers = await userRepository.insertMany(generateMockUsers(validateMockCant(users)))
            result.users = createdUsers.length
        }
        if (orders > 0) {
            const customers = await userRepository.findByRole(USER_ROLES.CUSTOMER)
            if (customers.length === 0) {
                throw new AppError(ERROR_CODES.MOCK_NOT_ENOUGH_CLIENTS)
            }
            const mocks = generateMockOrders(validateMockCant(orders),customers.map(c => c._id))
            const ordersToInsert = mocks.map(order => {
                const declaredValue = order.declaredValue || order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
                const shippingCost = calculateShippingCost(declaredValue, order.priority)
                return {
                    ...order,
                    declaredValue,
                    shippingCost,
                    total: declaredValue + shippingCost
                }
            })
            const createdOrders = await orderRepository.insertMany(ordersToInsert)
            result.orders = createdOrders.length
        }
        if (deliveries > 0) {
            const cant = validateMockCant(deliveries)
            const drivers = await userRepository.findByRole(USER_ROLES.DRIVER)
            if (drivers.length === 0) {
                throw new AppError(ERROR_CODES.MOCK_NOT_ENOUGH_DRIVERS)
            }
            const orders = await orderRepository.findWithoutDelivery(cant)
            if (orders.length < cant) {
                throw new AppError(ERROR_CODES.MOCK_NOT_ENOUGH_ORDERS)
            }
            const driverIds = drivers.map(driver => driver._id)
            const mocks = generateMockDeliveries(orders, driverIds)
            const createdDeliveries = await deliveryRepository.insertMany(mocks)
            for (const delivery of createdDeliveries) {
                await orderRepository.update(delivery.order, {
                    delivery: delivery._id,
                    status: orderStatusByDelivery[delivery.status]
                })
            }
            result.deliveries = createdDeliveries.length
        }
        if (stores > 0) {
            const cant = validateMockCant(stores)
            const owners = await userRepository.findByRole(USER_ROLES.STORE)
            if (owners.length === 0) {
                throw new AppError(ERROR_CODES.MOCK_NOT_ENOUGH_STORE_OWNERS)
            }
            const ownerIds = owners.map(owner => owner._id)
            const mocks = generateMockStores(cant, ownerIds)
            const createdStores = await storeRepository.insertMany(mocks)
            result.stores = createdStores.length
        }
        return {
            users: result.users,
            orders: result.orders,
            deliveries: result.deliveries,
            stores: result.stores
        }
    }
}