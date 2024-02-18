interface IUser {
  id?: string
  username?: string
  email?: string
  phone?: number
  role?: 'Basic' | 'Advanced' | 'VIP' | 'Admin'
  password?: string
  passwordConfirm?: string
  account?: AccountsType
  statId?: string[]
  weeklyActivityId?: string[]
  monthlyStatId?: string[]
}
