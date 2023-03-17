interface Tokens {
  access: {
    expires: string
    token: string
  }
  refresh: {
    expires: string
    token: string
  }
}

interface User {
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  role: string
  likedCharacters: number[]
}

function storeType<T>(name: string, value: T) {
  return useStorage<T>(name, value)
}

const tokens = storeType<Tokens>('tokens', {})
const user = storeType<User>('user', {})

export function useUser() {
  return {
    tokens,
    user,
  }
}
