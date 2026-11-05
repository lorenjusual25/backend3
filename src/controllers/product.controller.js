import { productService } from "../services/product.service.js"
export async function findAllProducts (req,res) {
    try {
        const products = await productService.findAll()
        res.json(products)
    }
    catch (err) {
        res.status(500).send("Error del servidor")
    }
}
export async function findProductById (req,res) {
    try {
        const product = await productService.findById(req.params.id)
        res.json(product)
    }
    catch (err) {
        res.status(500).send("Error del servidor")
    }
}
export async function findProductsWithStock (req,res) {
    try {
        const products = await productService.findOnlyStocks()
        res.json(products)
    }
    catch (err) {
        res.status(500).send("Error del servidor")
    }
}
export async function createProduct (req,res) {
    try {
        const product = await productService.create(req.body)
        res.json(product)
    }
    catch (err) {
        res.status(500).send("Error del servidor")
    }
}
export async function updateProduct (req,res) {
    try {
        const product = await productService.update(req.params.id,req.body)
        res.json(product)
    }
    catch (err) {
        res.status(500).send("Error del servidor")
    }
}
export async function deleteProduct (req,res) {
    try {
        const product = await productService.delete(req.params.id)
        res.json(product)
    }
    catch(err) {
        res.status(500).send("Error del servidor")
    }
}