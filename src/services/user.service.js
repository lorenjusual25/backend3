import { userRepository } from "../repositories/user.repository.js";
import { USER_ROLES } from "../utils/constants.js";
export const userService = {
    findAll: async () => {
        const users = await userRepository.findAll()
        return users
    },
    findById: async (id) => {
        const user = await userRepository.findById(id)
        if (!user) {
            const error = new Error('Usuario no encontrado')
            error.status = 404
            throw error
        }
        return user
    },
    findByEmail:async (email) => {
        const user = await userRepository.findByEmail(email)
        if (!user) {
            const error = new Error('Email no encontrado')
            error.status = 404
            throw error
        }
        return user
    },
    create:async (user) => {
        const { firstName, lastName, email, password, role = "user" } = user
        const normalFirstName = firstName?.trim()
        const normalLastName = lastName?.trim()
        const normalEmail = email?.trim().toLowerCase()
        if(!normalFirstName || !normalLastName || !normalEmail || !password ){
            const error = new Error('Faltan campos obligatorios');
            error.status = 400;
            throw error;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(normalEmail)) {
            const error = new Error("No es un formato email correcto")
            error.status = 400
            throw error
        }
        const exists = await userRepository.findByEmail(normalEmail)
        if(exists){
            const error = new Error('Email ya existe')
            error.status = 400
            throw error
        }
        if (!Object.values(USER_ROLES).includes(role)) {
            const error = new Error('Rol invalido')
            error.status = 400
            throw error
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
        const user = await userRepository.update(id, updates)
        if (!user) {
            const error = new Error('Usuario no encontrado')
            error.status = 404
            throw error
        }
        return user
    },
    delete: async (id) => {
        const user = await userRepository.delete(id)
        if (!user) {
            const error = new Error('Usuario no encontrado')
            error.status = 404
            throw error
        }
        return user
    }
}