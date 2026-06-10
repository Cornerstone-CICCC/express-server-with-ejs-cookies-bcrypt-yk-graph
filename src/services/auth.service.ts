import bcrypt from 'bcrypt'

import { UserRepositoryInterface } from '@/repositories/user.repository.interface'
import { AuthServiceInterface } from './auth.service.interface'

export class AuthService implements AuthServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  register = async (email: string, password: string): Promise<void> => {
    const hashedPassword = await bcrypt.hash(password, 10)
    this.userRepository.save({ email, password: hashedPassword })
  }

  login = async (email: string, password: string): Promise<boolean> => {
    const existingUser = this.userRepository.findByEmail(email)
    if (!existingUser) return false
    return await bcrypt.compare(password, existingUser.password)
  }
}
