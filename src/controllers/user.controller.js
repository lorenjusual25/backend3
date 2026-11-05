import { userService } from "../services/user.service.js";
export async function findAllUsers (req,res) {
    try {
        const users = await userService.findAll()
        res.json(users)
    }
    catch (err) {
        res.status(500).send("Error del servidor")
    }
}
export async function findUserById (req,res) {
    try {
        const user = await userService.findById(req.params.id)
        res.json(user)
    }
    catch (err) {
        res.status(500).send("Error del servidor")
    }
}
export async function createUser (req,res) {
    try {
        const user = await userService.create(req.body)
        res.json(user)
    }
    catch (err) {
        res.status(500).send("Error del servidor")
    }
}
export async function updateUser(req, res)  {
    try {
        const user = await userService.update(req.params.id, req.body)
        res.json(user)
    } catch (err) {
        res.status(500).send("Error del servidor")
    }
}
export async function deleteUser (req, res) {
    try {
        const user = await userService.delete(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(500).send("Error del servidor")
    }
}