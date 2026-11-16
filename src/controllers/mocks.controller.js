import { mockService } from "../services/mocks.service.js";
import { successResponse } from "../utils/apiResponse.js";
export async function getMockUsers(req,res,next) {
    try {
        const user = await mockService.getMockUsers(req.query.cant)
        successResponse(res, {message: "Usuarios simulados obtenidos", payload: user})
    } catch (err) {
        next(err)
    }
}
export async function seed(req,res,next) {
    try {
        const result = await mockService.seed(req.body)
        successResponse(res, {message: "Datos simulados insertados", payload: result})
    } catch (err) {
        next(err)
    }
}