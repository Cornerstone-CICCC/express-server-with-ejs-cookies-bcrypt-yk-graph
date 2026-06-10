import { Router } from 'express'

import { AuthController } from '@/controllers/auth.controller'

export const createAuthRouter = (authController: AuthController): Router => {
  const router = Router()

  router.post('/register', authController.register)
  router.post('/login', authController.login)
  router.post('/logout', authController.logout)

  return router
}
