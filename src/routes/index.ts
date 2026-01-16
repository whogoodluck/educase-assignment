import { Router } from 'express'

import userRouter from './user.route'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ message: 'hello world' })
})

router.get('/health', (_req, res) => {
  res.json({ message: 'ok' })
})

router.use('/auth', userRouter)

export default router
