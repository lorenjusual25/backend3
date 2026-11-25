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
        return Order.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
    },
    delete:  (id) => {
        return Order.findByIdAndDelete(id)
    },
    insertMany: (orders) => {
        return Order.insertMany(orders)
    },
    addProof: (id, proof) => {
        return Order.findByIdAndUpdate(
            id,
            { $push: { proofs: proof } },
            { new: true }
        )
    },
    findPaginate: async ({skip, filter = {}, limit = 10}) => {
        return Order.find(filter)
        .populate('customer', "firstName lastName")
        .populate('delivery', "firstName lastName")
        .skip(skip)
        .limit(limit)
    }
}