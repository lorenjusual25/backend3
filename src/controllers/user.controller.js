import { userService } from "../services/user.service.js";
import { successResponse } from "../utils/apiResponse.js";
import { unlink } from "node:fs/promises";
import logger from "../config/logger.js";
export async function findAllUsers (req,res,next) {
    try {
        const users = await userService.findAll()
        successResponse(res, {message: "Lista de usuarios", payload: users})
    }
    catch (err) {
        next(err)
    }
}
export async function findUserById (req,res,next) {
    try {
        const user = await userService.findById(req.params.id)
        successResponse(res, {message: "Usuario encontrado", payload: user})
    }
    catch (err) {
        next(err)
    }
}
export async function createUser (req,res,next) {
    try {
        const user = await userService.create(req.body)
        successResponse(res, {message: "Usuario creado", payload: user})
    }
    catch (err) {
        next(err)
    }
}
export async function updateUser(req, res,next)  {
    try {
        const user = await userService.update(req.params.id, req.body)
        successResponse(res, {message: "Usuario actualizado", payload: user})
    } catch (err) {
        next(err)
    }
}
export async function deleteUser (req, res,next) {
    try {
        const user = await userService.delete(req.params.id)
        successResponse(res, {message: "Usuario eliminado", payload: user})
    } catch (err) {
        next(err)
    }
}
export async function uploadDocument (req,res,next) {
    try {
        const id = req.params.id
        const type = req.body.type
        const file = req.file
        const user = await userService.uploadDocument(id, file, type)
        logger.info("Documento subido correctamente")
        successResponse(res, {message: "Documento subido correctamente",payload: user})
    }
    catch(err) {
        if (req.file) {
            await unlink(req.file.path)
        }
        next(err)
    }
}