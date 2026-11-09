import Delivery from '../models/delivery.model.js'
export const deliveryRepository = {
    create: (deliveryData) => {
        return Delivery.create(deliveryData)
    },
    findById: (id) => {
        return Delivery.findById(id).populate('order').populate('driver','firstName lastName email')
    },
    findAll: () => {
        return Delivery.find().populate('order').populate('driver','firstName lastName email')
    },
    update:(id, updates) => {
        return Delivery.findByIdAndUpdate(id, updates, { new: true })
    },
    delete: (id) => {
        return Delivery.findByIdAndDelete(id)
    },
    insertMany: (deliveries) => {
        return Delivery.insertMany(deliveries)
    }
}