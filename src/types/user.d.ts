interface IUser {
  id?: string
  username?: string
  email?: string
  phone?: number
  role?: 'Basic' | 'Advanced' | 'VIP' | 'Admin'
  password?: string
  passwordConfirm?: string
  cid?: string[]
  statId?: string[]
  weeklyActivityId?: string[]
  statByDailyId?: string[]
}
