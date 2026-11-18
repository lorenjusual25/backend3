import { Router } from 'express'
import { findAllStores, findStoreById, createStore, updateStore, deleteStore } from '../controllers/store.controller.js'
const router = Router()
router.get('/', findAllStores)
router.get('/:id', findStoreById)
router.post('/', createStore)
router.put('/:id', updateStore)
router.delete('/:id', deleteStore)
export default router