import Order from '../models/order.model.js'
export const orderRepository = {
    create: (orderData) => {
        return Order.create(orderData)
    },
    findById: (id) => {
        return Order.findById(id).populate('customer').populate('delivery')
    },
    findAll: () => {
        return Order.find().populate('customer').populate('delivery')
    },
    findWithoutDelivery: (limit = 0) => {
        return Order.find({delivery:null}).limit(limit)
    },
    update:(id, updates) => {
        return Order.findByIdAndUpdate(id, updates, { new: true })
    },
    delete:  (id) => {
        return Order.findByIdAndDelete(id)
    },
    insertMany: (orders) => {
        return Order.insertMany(orders)
    }
}