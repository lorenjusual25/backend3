import { Router } from 'express';
import { findAllUsers,findUserById,createUser,updateUser,deleteUser } from '../controllers/user.controller.js';
const router = Router()
router.get('/',findAllUsers)
router.get('/:id',findUserById)
router.post('/',createUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
export default router