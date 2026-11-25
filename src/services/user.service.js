import { userRepository } from "../repositories/user.repository.js";
import { USER_ROLES } from "../constants/user.constants.js";
import { AppError } from "../utils/error.js";
import { ERROR_CODES } from "../utils/errorDictionary.js";
import { DOCUMENT_TYPES } from "../constants/document.constants.js";
import logger from "../config/logger.js";
export const userService = {
    findAll: async ({skip, filter = {}, limit = 10}) => {
        const users = await userRepository.findPaginate({skip, filter, limit})
        return users
    },
    findById: async (id) => {
        const user = await userRepository.findById(id)
        if (!user) {
            throw new AppError(ERROR_CODES.USER_NOT_FOUND)
        }
        return user
    },
    findByEmail:async (email) => {
        const user = await userRepository.findByEmail(email)
        if (!user) {
            throw new AppError(ERROR_CODES.USER_NOT_FOUND)
        }
        return user
    },
    create:async (user) => {
        const { firstName, lastName, email, password, role = "customer" } = user
        const normalFirstName = firstName?.trim()
        const normalLastName = lastName?.trim()
        const normalEmail = email?.trim().toLowerCase()
        if(!normalFirstName || !normalLastName || !normalEmail || !password ){
            throw new AppError(ERROR_CODES.MISSING_REQUIRED_FIELDS)
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(normalEmail)) {
            throw new AppError(ERROR_CODES.INVALID_EMAIL_FORMAT)
        }
        const exists = await userRepository.findByEmail(normalEmail)
        if(exists){
            throw new AppError(ERROR_CODES.EMAIL_EXISTS)
        }
        if (!Object.values(USER_ROLES).includes(role)) {
            throw new AppError(ERROR_CODES.INVALID_USER_ROLE)
        }
        return userRepository.create({
            firstName:normalFirstName,
            lastName:normalLastName,
            email:normalEmail,
            password,
            role
        })
    },
    update: async (id, updates) => {
        if (updates.role && !Object.values(USER_ROLES).includes(updates.role)) {
            throw new AppError(ERROR_CODES.INVALID_USER_ROLE)
        }
        const user = await userRepository.update(id, updates)
        if (!user) {
            throw new AppError(ERROR_CODES.USER_NOT_FOUND)
        }
        return user
    },
    delete: async (id) => {
        const user = await userRepository.delete(id)
        if (!user) {
            throw new AppError(ERROR_CODES.USER_NOT_FOUND)
        }
        return user
    },
    uploadDocument: async (id, file, type) => {
        const user = await userRepository.findById(id)
        if (!user) {
            throw new AppError(ERROR_CODES.USER_NOT_FOUND)
        }
        if(!file) {
            throw new AppError(ERROR_CODES.FILE_REQUIRED)
        }
        if(!Object.values(DOCUMENT_TYPES).includes(type)) {
            throw new AppError(ERROR_CODES.INVALID_DOCUMENT_TYPE)
        }
        logger.info("El documento paso todas las validaciones")
        const document = {
            originalName: file.originalname,
            fileName: file.filename,
            path: file.path,
            mimeType: file.mimetype,
            size: file.size,
            type
        }
        const documents = [...user.documents, document]
        const updatedUser = await userRepository.update(id, { documents })
        return updatedUser
    }
}