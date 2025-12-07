import express from 'express'
import { 
    register, 
    login, 
    logout, 
    updateProfile 
} from '../controller/user.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router()

// Public Routes (anyone can access)
router.post('/register', register)
router.post('/login', login)

// Protected Routes (only logged-in users)
router.get('/logout', isAuthenticated, logout)
router.post('/profile/update', isAuthenticated, updateProfile)

export default router