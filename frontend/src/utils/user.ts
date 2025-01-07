import { get } from '@/http.ts'
import type { User } from '@/types/chat.ts'

export function getUser() {
  return get<User>('/users/me')
}

export function isLogin() {
  return localStorage.getItem('access_token') !== undefined
}
