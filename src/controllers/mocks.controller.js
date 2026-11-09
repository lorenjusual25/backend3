import { mockService } from "../services/mocks.service.js";
export function getMockUsers(req,res,next) {
    try {
        const user = mockService.getMockUsers(req.query.cant)
        res.json({ status: 'ok', payload: user })
    } catch (err) {
        next(err)
    }
}
export async function seed(req,res,next) {
    try {
        const result = await mockService.seed(req.body)
        res.json({ status: 'ok', payload: result })
    } catch (err) {
        next(err)
    }
}