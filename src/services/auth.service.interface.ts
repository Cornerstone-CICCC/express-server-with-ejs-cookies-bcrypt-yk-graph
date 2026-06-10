export interface AuthServiceInterface {
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
}
