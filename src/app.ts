import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { join } from 'path'

import { ViewController } from '@/controllers/views.controller'
import { createViewsRouter } from '@/routes/views.router'

dotenv.config()
const PORT = process.env.PORT as string

const app = express()

app
  .set('view engine', 'ejs')
  .set('views', join(__dirname, '../views'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true })
})

const viewController = new ViewController()
const viewsRouter = createViewsRouter(viewController)

app.use('/', viewsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
