import { User } from "../../profile/interfaces/user.interface"

export interface AuthResponse {
    user: User
    token: string
  }