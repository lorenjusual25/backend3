import { Router } from "express";
import { findAllProducts,findProductsWithStock,findProductById,createProduct,updateProduct,deleteProduct } from "../controllers/product.controller.js";
const router = Router()
router.get('/',findAllProducts)
router.get('/stock',findProductsWithStock)
router.get('/:id',findProductById)
router.post('/',createProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)
export default router