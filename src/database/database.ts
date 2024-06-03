import { User } from '../App'

export const key = 'users'

export const createUser = (user: User): User => {
  const data = readDatabase()

  if (data.users.find((existingUser) => existingUser.email === user.email))
    throw new Error('User already exists')

  data.users.push(user)
  localStorage.setItem(key, JSON.stringify(data))

  return user
}

export const loginUser = (email: string, password: string): User | null => {
  const data = readDatabase()

  const user = data.users.find(
    (user) => user.email === email && user.password === password,
  )
  if (user) return user

  return null
}

const readDatabase = (): { users: User[] } => {
  const data = localStorage.getItem(key)

  if (data === null) return { users: [] }

  return JSON.parse(data) as { users: User[] }
}

export const clearDatabase = () => {
  localStorage.setItem(key, JSON.stringify({ users: [] }))
}
