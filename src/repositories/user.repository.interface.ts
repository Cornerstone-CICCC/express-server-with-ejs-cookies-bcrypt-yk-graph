import { User } from '@/types'

export interface UserRepositoryInterface {
  save: (user: User) => void
  findByEmail: (email: string) => User | undefined
}
