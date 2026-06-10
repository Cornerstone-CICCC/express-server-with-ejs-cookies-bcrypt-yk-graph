import { Router } from 'express'

import { ViewController } from '@/controllers/views.controller'

export const createViewsRouter = (viewController: ViewController): Router => {
  const router = Router()

  router.get('/', viewController.viewHome)
  router.get('/login', viewController.viewLogin)
  router.get('/register', viewController.viewRegister)

  return router
}
