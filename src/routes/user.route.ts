import { authenticate } from '@/middlewares/auth.middleware'
import { Router } from 'express'
import userController from '../controllers/user.controller'

const userRouter = Router()

userRouter.post('/signup', userController.signup)
userRouter.post('/signin', userController.signin)
userRouter.get('/me', authenticate, userController.me)
userRouter.post('/logout', userController.logout)

export default userRouter
