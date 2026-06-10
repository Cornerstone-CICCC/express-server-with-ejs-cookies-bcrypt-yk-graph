import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export class ViewController {
  viewHome = (req: Request, res: Response): void => {
    const token = req.cookies.token as string | undefined
    let user: string | null = null

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string }
        user = payload.email
      } catch {
        res.clearCookie('token').redirect('/login')
        return
      }
    }

    res.render('index', { title: 'Home', user })
  }

  viewLogin = (_req: Request, res: Response): void => {
    res.render('login', { title: 'Login' })
  }

  viewRegister = (_req: Request, res: Response): void => {
    res.render('register', { title: 'Register' })
  }
}
