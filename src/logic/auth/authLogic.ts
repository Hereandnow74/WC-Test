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
}

function storeType<T>(name: string, value: T) {
  return useStorage<T>(name, value)
}

export const tokens = storeType<Tokens>('tokens', {})
export const user = storeType<User>('user', {})

export async function verifyEmail(token: string): Promise<number> {
  try {
    const apiURL = new URL('http://localhost:3000/v1/auth/verify-email')
    apiURL.searchParams.set('token', token)
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const statusCode = await response.status
    console.log(statusCode)
    return statusCode
  }
  catch (error) {
    console.error(error)
    return 1
  }
}

export async function sendVerificationEmail(): Promise<any> {
  const url = 'http://localhost:3000/v1/auth/send-verification-email'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.value.access.token}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    return errorText
  }

  return 'Success'
}

export async function postRegisterInfoToEndpoint(registerInfo: any): Promise<string> {
  const apiUrl = 'http://localhost:3000/v1/auth/register'
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerInfo),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.log(`Failed to register: ${errorText}`)
    return JSON.parse(errorText).message
  }
  else {
    console.log(response)
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    console.log(jsonPayload, 'Payload')
    tokens.value = jsonPayload.tokens
    user.value = jsonPayload.user
    const status = await sendVerificationEmail()
    return status
  }
  // return 'Success'
}

export async function getUserFromServer(id: string): Promise<void> {
  try {
    const apiURL = new URL(`http://localhost:3000/v1/users/${id}`)
    // apiURL.searchParams.set('userId', id)
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.value.access.token}`,
      },
    })
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    if (jsonPayload.id)
      user.value = jsonPayload
  }
  catch (error) {
    console.error(error)
  }
}
