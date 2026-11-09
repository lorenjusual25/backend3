import {Router} from 'express'
import { getMockUsers, seed } from "../controllers/mocks.controller.js";
const router = Router()
router.get('/getMockUsers', getMockUsers)
router.post('/seed', seed)
export default router