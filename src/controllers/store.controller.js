import { storeService } from '../services/store.service.js';
import { successResponse } from '../utils/apiResponse.js';
export async function findAllStores(req, res, next) {
    try {
        const stores = await storeService.findAll()
        successResponse(res, {message: 'Lista de tiendas', payload: stores})
    } catch (error) {
        next(error)
    }
}
export async function findStoreById(req, res, next) {
    try {
        const store = await storeService.findById(req.params.id)
        successResponse(res, {message: 'Tienda encontrada', payload: store})
    } catch (error) {
        next(error)
    }
}
export async function createStore(req, res, next) {
    try {
        const store = await storeService.create(req.body)
        successResponse(res, {message: 'Tienda creada', payload: store})
    } catch (error) {
        next(error)
    }
}
export async function updateStore(req, res, next) {
    try {
        const store = await storeService.update(req.params.id, req.body)
        successResponse(res, {message: 'Tienda actualizada', payload: store})
    } catch (error) {
        next(error)
    }
}
export async function deleteStore(req, res, next) {
    try {
        const store = await storeService.delete(req.params.id)
        successResponse(res, {message: 'Tienda eliminada', payload: store})
    } catch (error) {
        next(error)
    }
}