import { Request, Response } from 'express'

export class ViewController {
  showHome = (_req: Request, res: Response): void => {
    res.render('index')
  }

  showLogin = (_req: Request, res: Response): void => {
    res.render('login')
  }

  showRegister = (_req: Request, res: Response): void => {
    res.render('register')
  }
}
