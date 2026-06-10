import { User } from '@/types'
import { UserRepositoryInterface } from './user.repository.interface'

export class UserRepository implements UserRepositoryInterface {
  constructor(private _users: User[] = []) {}

  save = (user: User): void => {
    this._users.push(user)
  }

  findByEmail = (email: string): User | undefined => {
    return this._users.find((user) => user.email === email)
  }
}
