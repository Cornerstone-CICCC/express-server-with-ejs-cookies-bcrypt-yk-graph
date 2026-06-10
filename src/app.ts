import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import ejsLayouts from 'express-ejs-layouts'
import { join } from 'path'

import { AuthController } from '@/controllers/auth.controller'
import { UserRepository } from '@/repositories/user.repository'
import { createAuthRouter } from '@/routes/auth.router'
import { AuthService } from '@/services/auth.service'

import { ViewController } from '@/controllers/views.controller'
import { createViewsRouter } from '@/routes/views.router'

dotenv.config()
const PORT = process.env.PORT as string

const app = express()

app
  .set('view engine', 'ejs')
  .set('views', join(__dirname, '../views'))
  .use(cookieParser())
  .use(ejsLayouts)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true })
})

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const authController = new AuthController(authService)
const authRouter = createAuthRouter(authController)

const viewController = new ViewController()
const viewsRouter = createViewsRouter(viewController)

app.use('/', viewsRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
