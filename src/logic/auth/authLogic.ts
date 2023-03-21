import { DBCharacter } from 'global'
import { useStore } from '~/store/store'
import { useUser } from '~/store/user'

const { user, tokens } = useUser()

// const SERVER_URL = 'http://localhost:3000'
const SERVER_URL = 'https://interactive-apps.net'
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
  const { favorites } = useStore()
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
    if (!favorites.value || favorites.value.length === 0)
      favorites.value = user.value.likedCharacters
    return 'Success'
  }
  // return 'Success'
}

// TODO: Logout when 401 is returned
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
      return jsonPayload
    }
  }
  return ['No Token']
}

export async function getLikesByUid(uidArr: number[]): Promise<{}> {
  const uniqUids = Array.from(new Set(uidArr))
  const apiUrl = `${SERVER_URL}/${API_VERSION}/characters/likes`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uniqUids),
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

export async function updateUserInfo(tried = false, info: object): Promise<string> {
  if (tokens.value?.access?.token) {
    const apiUrl = `${SERVER_URL}/${API_VERSION}/users/${user.value.id}`
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.value.access.token}`,
      },
      body: JSON.stringify(info),
    })

    if (!response.ok) {
      const errorText = await response.text()
      if (!tried)
        refreshTokens().then(x => updateUserInfo(true, info))
      return JSON.parse(errorText).message
    }
    else {
      const payload = await response.text()
      const jsonPayload = JSON.parse(payload)
      if (jsonPayload.id)
        user.value = jsonPayload
      return 'Successfully updated your user info.'
    }
  }
  return 'Don\'t have access, you need to login.'
}

export async function updateUserLikes(tried = false, info: {characterUid: number; liked: boolean}): Promise<string> {
  if (tokens.value?.access?.token) {
    const apiUrl = `${SERVER_URL}/${API_VERSION}/users/${user.value.id}/likes`
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.value.access.token}`,
      },
      body: JSON.stringify(info),
    })

    if (!response.ok) {
      const errorText = await response.text()
      if (!tried)
        refreshTokens().then(x => updateUserInfo(true, info))
      return JSON.parse(errorText).message
    }
    else {
      const payload = await response.text()
      const jsonPayload = JSON.parse(payload)
      if (jsonPayload.length)
        user.value.likedCharacters = jsonPayload
      return 'Successfully updated your likes.'
    }
  }
  return 'Don\'t have access, you need to login.'
}

export async function recalculateLikesOnServer(): Promise<void> {
  if (tokens.value?.access?.token) {
    const apiUrl = `${SERVER_URL}/${API_VERSION}/characters/recalculateFields`
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.value.access.token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.log(JSON.parse(errorText).message)
    }
    else {
      const payload = await response.text()
      console.log(payload)
    }
  }
}

interface SearchRequest {
  tier?: {
    minTier: number
    maxTier: number
  }
  tags?: {
    tag: string
    include: boolean
  }[]
  hasNsfw?: boolean
  newerThan?: Date
  sortBy?: string // Example: likes:desc or likes:asc
  limit?: number
  page?: number
}

export async function searchForCharacters(request: SearchRequest): Promise<DBCharacter[]> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/characters/search`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.log(JSON.parse(errorText).message)
    return []
  }
  else {
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    return jsonPayload
  }
}
