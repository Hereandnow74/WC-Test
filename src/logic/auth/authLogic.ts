import { useStore } from '~/store/store'
import { useUser } from '~/store/user'

const { user, tokens } = useUser()

// const SERVER_URL = 'http://localhost:3000'
const SERVER_URL = 'http://216.250.116.9:3000'
const API_VERSION = 'v1'

export async function verifyEmail(token: string): Promise<number> {
  try {
    const apiURL = new URL(`${SERVER_URL}/${API_VERSION}/auth/verify-email`)
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
  const url = `${SERVER_URL}/${API_VERSION}/auth/send-verification-email`
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
  const apiUrl = `${SERVER_URL}/${API_VERSION}/auth/register`
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
    // const status = await sendVerificationEmail()
    return 'Email verification doesn\'t work yet'
  }
  // return 'Success'
}

export async function loginToServer(registerInfo: any): Promise<string> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/auth/login`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerInfo),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.log(`Failed to login: ${errorText}`)
    return JSON.parse(errorText).message
  }
  else {
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    tokens.value = jsonPayload.tokens
    user.value = jsonPayload.user
    const status = await sendVerificationEmail()
    return status
  }
  // return 'Success'
}

export async function refreshTokens(): Promise<string> {
  if (tokens.value?.refresh?.token) {
    const apiUrl = `${SERVER_URL}/${API_VERSION}/auth/refresh-tokens`
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: tokens.value.refresh.token }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return JSON.parse(errorText).message
    }
    else {
      const payload = await response.text()
      const jsonPayload = JSON.parse(payload)
      tokens.value = jsonPayload
      return 'Success'
    }
  }
  return 'No Token'
}

export async function logoutFromServer(token: string): Promise<string> {
  if (token) {
    const apiUrl = `${SERVER_URL}/${API_VERSION}/auth/logout`
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: tokens.value.refresh.token }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return JSON.parse(errorText).message
    }
    else {
      return 'Success'
    }
  }
  return 'No Token'
}

export async function getUserFromServer(id: string): Promise<void> {
  try {
    const apiURL = new URL(`${SERVER_URL}/${API_VERSION}/users/${id}`)
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

export async function rebaseCharactersToServer(): Promise<any> {
  if (!tokens.value?.access?.token) return 'You don\'t have access'
  const url = `${SERVER_URL}/${API_VERSION}/characters/rebase`
  const dbUrls = ['https://waifu-catalog.neocities.org/json/characters.json', 'https://waifu-catalog.neocities.org/json/userCharacters.json']
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.value.access.token}`,
    },
    body: JSON.stringify(dbUrls),
  })

  if (!response.ok) {
    const errorText = await response.text()
    return errorText
  }

  return 'Success'
}

export async function getCharactersFromServer(): Promise<any[]> {
  if (tokens.value?.refresh?.token) {
    const apiUrl = `${SERVER_URL}/${API_VERSION}/characters/`
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([7369]),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return JSON.parse(errorText).message
    }
    else {
      const payload = await response.text()
      const jsonPayload = JSON.parse(payload)
      console.log(jsonPayload)
      return 'Success'
    }
  }
  return 'No Token'
}

export async function getLikesByUid(uidArr: number[]): Promise<{}> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/characters/likes`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uidArr),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.log(JSON.parse(errorText).message)
    return {}
  }
  else {
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    return jsonPayload
  }
}

export async function updateLikesForUser(): Promise<void> {
  if (tokens.value?.access?.token) {
    const { favorites } = useStore()
    const apiUrl = `${SERVER_URL}/${API_VERSION}/users/${user.value.id}`
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.value.access.token}`,
      },
      body: JSON.stringify({ likedCharacters: favorites.value }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return JSON.parse(errorText).message
    }
    else {
      const payload = await response.text()
      const jsonPayload = JSON.parse(payload)
      if (jsonPayload.id)
        user.value = jsonPayload
    }
  }
}
