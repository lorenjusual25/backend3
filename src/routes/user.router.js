import { Router } from 'express';
import { findAllUsers,findUserById,createUser,updateUser,deleteUser,uploadDocument } from '../controllers/user.controller.js';
import upload from '../middlewares/upload.middleware.js';
const router = Router()
router.get('/',findAllUsers)
router.get('/:id',findUserById)
router.post('/',createUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.post('/:id/documents', upload.single('document'), uploadDocument)
export default router