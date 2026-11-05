import { productRepository } from "../repositories/product.repository.js";
import { PRODUCT_STATUS } from "../constants/index.js";
export const productService = {
    findAll: async () => {
        return await productRepository.findAll()
    },
    findById: async (id) => {
        const prod = await productRepository.findById(id)
        if (!prod) {
            const error = new Error('Producto no encontrado')
            error.status = 404
            throw error
        }
        return prod
    },
    findOnlyStocks: async () => {
        return await productRepository.findOnlyStock()
    },
    create: async (prod) => {
        const {title,description,code,price,stock,category} = prod
        const normalTitle = title?.trim()
        const normalCategory = category?.trim()
        const normalCode = code?.trim()
        if (!normalTitle || !normalCode || typeof price !== 'number') {
            const error = new Error("Faltan campos obligatorios")
            error.status = 400
            throw error
        }
        if (await productRepository.findByCode(normalCode)) {
            const error = new Error("El código ya existe")
            error.status = 400
            throw error
        }
        return productRepository.create({
            title:normalTitle,
            description,
            code:normalCode,
            price,
            stock,
            category:normalCategory,
            status:stock<=0?PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE
        })
    },
    update: async (id,updates) => {
        if (updates.stock !== undefined) {
            updates.status = updates.stock <= 0? PRODUCT_STATUS.OUT_OF_STOCK : PRODUCT_STATUS.AVAILABLE
        }
        const prod = await productRepository.update(id,updates)
        if (!prod) {
            const error = new Error('Producto no encontrado')
            error.status = 404
            throw error
        }
        return prod
    },
    delete: async (id) => {
        const prod = await productRepository.delete(id)
        if (!prod) {
            const error = new Error('Producto no encontrado')
            error.status = 404
            throw error
        }
        return prod
    }
}