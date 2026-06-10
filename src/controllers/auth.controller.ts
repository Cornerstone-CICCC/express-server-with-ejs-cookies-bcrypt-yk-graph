import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { AuthServiceInterface } from '@/services/auth.service.interface'

export class AuthController {
  constructor(private readonly authService: AuthServiceInterface) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email: string; password: string }
    await this.authService.register(email, password)
    res.redirect('/login')
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email: string; password: string }
    const isLogin = await this.authService.login(email, password)

    if (isLogin) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '60s' })
      res.cookie('token', token, { httpOnly: true })
      res.redirect('/')
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  }

  logout = (_req: Request, res: Response): void => {
    res.clearCookie('token')
    res.redirect('/login')
  }
}
