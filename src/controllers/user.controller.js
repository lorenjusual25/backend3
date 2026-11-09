import { userService } from "../services/user.service.js";
export async function findAllUsers (req,res,next) {
    try {
        const users = await userService.findAll()
        res.json({ status: 'ok', payload:users })
    }
    catch (err) {
        next(err)
    }
}
export async function findUserById (req,res,next) {
    try {
        const user = await userService.findById(req.params.id)
        res.json({ status: 'ok', payload: user })
    }
    catch (err) {
        next(err)
    }
}
export async function createUser (req,res,next) {
    try {
        const user = await userService.create(req.body)
        res.json({ status: 'ok', payload: user })
    }
    catch (err) {
        next(err)
    }
}
export async function updateUser(req, res,next)  {
    try {
        const user = await userService.update(req.params.id, req.body)
        res.json({ status: 'ok', payload: user })
    } catch (err) {
        next(err)
    }
}
export async function deleteUser (req, res,next) {
    try {
        const user = await userService.delete(req.params.id)
        res.json({ status: 'ok', payload: user })
    } catch (err) {
        next(err)
    }
}