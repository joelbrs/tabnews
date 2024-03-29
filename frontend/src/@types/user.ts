export interface User {
  id: string
  username: string
  email: string
  description?: string
  createdAt: Date
  notify: boolean
  tabcoins: number
}
