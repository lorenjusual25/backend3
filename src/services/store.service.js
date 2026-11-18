import { storeRepository } from '../repositories/store.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/error.js';
import { ERROR_CODES } from '../utils/errorDictionary.js';
export const storeService = {
    findAll: async () => {
        return await storeRepository.findAll()
    },
    findById: async (id) => {
        const store = await storeRepository.findById(id)
        if (!store) {
            throw new AppError(ERROR_CODES.STORE_NOT_FOUND)
        }
        return store
    },
    create: async (storeData) => {
        const {name, address, owner} = storeData
        if (!name || !address || !owner) {
            throw new AppError(ERROR_CODES.MISSING_REQUIRED_FIELDS)
        }
        const ownerExists = await userRepository.findById(owner)
        if (!ownerExists) {
            throw new AppError(ERROR_CODES.USER_NOT_FOUND)
        }
        if (ownerExists.role !== 'store') {
            throw new AppError(ERROR_CODES.INVALID_USER_ROLE)
        }
        return await storeRepository.create(storeData)
    },
    update: async (id, storeData) => {
        const store = await storeRepository.findById(id)
        if (!store) {
            throw new AppError(ERROR_CODES.STORE_NOT_FOUND)
        }
        return await storeRepository.update(id, storeData)
    },
    delete: async (id) => {
        const store = await storeRepository.findById(id)
        if (!store) {
            throw new AppError(ERROR_CODES.STORE_NOT_FOUND)
        }
        return await storeRepository.delete(id)
    }
}