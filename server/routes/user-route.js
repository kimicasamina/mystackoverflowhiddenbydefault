import express from 'express'
const router = express.Router()
import verifyToken from '../middleware/verifyToken.js'
import userModel from '../models/user-model.js'

import { login, logout, signup, getProfile, getUser, getAllUsers } from '../controller/user-controller.js'

router.get('/', getAllUsers)
router.post('/login', login)
router.post('/signup', signup)
router.get('/logout', logout)
router.get('/getuser', verifyToken, getUser)
router.get('/profile', verifyToken, getProfile)

export default router

