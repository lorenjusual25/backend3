import { Product } from "../models/product.model.js";
import { PRODUCT_STATUS } from "../constants/index.js";
export const productRepository = {
    findAll: () => {
        return Product.find()
    },
    findById: (id) => {
        return Product.findById(id)
    },
    findOnlyStock: () => {
        return Product.find({status:PRODUCT_STATUS.AVAILABLE,stock:{$gt:0}})
    },
    findByCode: (code) => {
        return Product.findOne({code})
    },
    create: (prod) => {
        return Product.create(prod)
    },
    update: (id,updates) => {
        return Product.findByIdAndUpdate(id,updates,{new:true,runValidators:true})
    },
    delete: (id) => {
        return Product.findByIdAndDelete(id)
    }
}