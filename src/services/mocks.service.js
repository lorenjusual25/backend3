import { generateMockUsers } from "../mocks/user.mock.js";
import { generateMockOrders } from "../mocks/order.mock.js";
import { generateMockDeliveries } from "../mocks/delivery.mock.js";
import { DEFAULT_MOCK_ITEMS, MAX_MOCK_ITEMS} from "../constants/mocks.constants.js";   
import { AppError } from "../utils/error.js";
import { userRepository } from "../repositories/user.repository.js";
import { orderRepository } from "../repositories/order.repository.js";
import { USER_ROLES } from "../constants/user.constants.js";
import { deliveryRepository } from "../repositories/delivery.repository.js";
import { DELIVERY_STATUS } from "../constants/delivery.constants.js";
import { ORDER_STATUS } from "../constants/order.constants.js";
const orderStatusByDelivery = {
    [DELIVERY_STATUS.PENDING]: ORDER_STATUS.CREATED,
    [DELIVERY_STATUS.ASSIGNED]: ORDER_STATUS.ASSIGNED,
    [DELIVERY_STATUS.IN_TRANSIT]: ORDER_STATUS.IN_TRANSIT,
    [DELIVERY_STATUS.DELIVERED]: ORDER_STATUS.DELIVERED,
    [DELIVERY_STATUS.CANCELED]: ORDER_STATUS.CANCELED
}
function validateMockCant(cant = DEFAULT_MOCK_ITEMS) {
    if (!Number.isInteger(Number(cant)) || Number(cant) <= 0) {
        throw new AppError("Cantidad de mocks invalida", 400)
    }
    if (Number(cant) > MAX_MOCK_ITEMS) {
        throw new AppError("Maximo de mocks alcanzado", 400)
    }
    return Number(cant)
}
export const mockService = {
    getMockUsers: (cant = DEFAULT_MOCK_ITEMS) => {
        return generateMockUsers(cant)
    },
    getMockOrders: (cant = DEFAULT_MOCK_ITEMS, customerIds) => {
        return generateMockOrders(cant,customerIds)
    },
    getMockDeliveries: (orders, driverIds) => {
        return generateMockDeliveries(orders,driverIds)
    },
    seed: async(params = {}) => {
        const { users = 0, orders = 0, deliveries = 0 } = params
        const result = {
            users:0,
            orders:0,
            deliveries:0
        }
        if (users > 0) {
            const createdUsers = await userRepository.insertMany(generateMockUsers(validateMockCant(users)))
            result.users = createdUsers.length
        }
        if (orders > 0) {
            const customers = await userRepository.findByRole(USER_ROLES.CUSTOMER)
            if (customers.length === 0) {
                throw new AppError("No hay clientes para crear ordenes",400)
            }
            const createdOrders = await orderRepository.insertMany(generateMockOrders(validateMockCant(orders),customers.map(c => c._id)))
            result.orders = createdOrders.length
        }
        if (deliveries > 0) {
            const cant = validateMockCant(deliveries)
            const drivers = await userRepository.findByRole(USER_ROLES.DRIVER)
            if (drivers.length === 0) {
                throw new AppError("No hay conductores para crear deliveries", 400)
            }
            const orders = await orderRepository.findWithoutDelivery(cant)
            if (orders.length < cant) {
                throw new AppError("No hay suficientes pedidos sin entrega", 400)
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
        return {
            users: result.users,
            orders: result.orders,
            deliveries: result.deliveries
        }
    }
}