import { userRepository } from "../repositories/user.repository.js";
import { USER_ROLES } from "../constants/user.constants.js";
import { AppError } from "../utils/error.js";
export const userService = {
    findAll: async () => {
        const users = await userRepository.findAll()
        return users
    },
    findById: async (id) => {
        const user = await userRepository.findById(id)
        if (!user) {
            throw new AppError("Usuario no encontrado",404)
        }
        return user
    },
    findByEmail:async (email) => {
        const user = await userRepository.findByEmail(email)
        if (!user) {
            throw new AppError("Email no encontrado",404)
        }
        return user
    },
    create:async (user) => {
        const { firstName, lastName, email, password, role = "user" } = user
        const normalFirstName = firstName?.trim()
        const normalLastName = lastName?.trim()
        const normalEmail = email?.trim().toLowerCase()
        if(!normalFirstName || !normalLastName || !normalEmail || !password ){
            throw new AppError("Faltan campos obligatorios",400)
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(normalEmail)) {
            throw new AppError("No es un formato email correcto",400)
        }
        const exists = await userRepository.findByEmail(normalEmail)
        if(exists){
            throw new AppError("Email no existe",400)
        }
        if (!Object.values(USER_ROLES).includes(role)) {
            throw new AppError("Rol invalido",400)
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
            throw new AppError("Usuario no encontrado",404)
        }
        return user
    },
    delete: async (id) => {
        const user = await userRepository.delete(id)
        if (!user) {
            throw new AppError("Usuario no encontrado",404)
        }
        return user
    }
}