import mongoose, { Schema } from "mongoose";
import { ORDER_STATUS } from "../constants/order.constants.js";
import { DELIVERY_PRIORITY } from "../constants/delivery.constants.js";
const orderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del item es obligatorio']
    },
    quantity: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        min: [1, 'La cantidad mínima es 1']
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    }
}, 
{ 
    _id: false 
})
const orderSchema = new mongoose.Schema({
    customer: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'El cliente es obligatorio']
    },
    delivery: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Delivery',
        default:null
    },
    items: {
        type: [orderItemSchema],
        validate: {
            validator: (items) => items.length > 0,
            message: 'El pedido debe tener al menos un item'
        }
    },
    deliveryAddress: {
        type: String,
        required: [true, 'La dirección de entrega es obligatoria']
    },
    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.CREATED
    },
    priority: {
        type: String,
        enum: Object.values(DELIVERY_PRIORITY),
        default: DELIVERY_PRIORITY.NORMAL
    },
    total: {
        type:Number,
        default:0
    },
    shippingCost: {
        type:Number,
        default:0
    },
    declaredValue: {
        type: Number,
        default: 0
    }
})
const Order = mongoose.model("Order",orderSchema)
export default Order