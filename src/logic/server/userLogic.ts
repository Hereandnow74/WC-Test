import { _refreshTokens } from './authLogic'

import { useUser } from '~/store/user'

const { user, tokens } = useUser()

export async function _updateUserLikes(SERVER_URL: string, API_VERSION: string, tried = false, info: {characterUid: number; liked: boolean}): Promise<string> {
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
        _refreshTokens(SERVER_URL, API_VERSION).then(() => _updateUserLikes(SERVER_URL, API_VERSION, true, info))
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

export async function _updateUserInfo(SERVER_URL: string, API_VERSION: string, tried = false, info: object): Promise<string> {
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
        _refreshTokens(SERVER_URL, API_VERSION).then(() => _updateUserInfo(SERVER_URL, API_VERSION, true, info))
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

export async function _getUserFromServer(SERVER_URL: string, API_VERSION: string, id: string, tried = false): Promise<void> {
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
    if (!response.ok) {
      const errorText = await response.text()
      if (!tried)
        _refreshTokens(SERVER_URL, API_VERSION).then(() => _getUserFromServer(SERVER_URL, API_VERSION, id, true))
      return JSON.parse(errorText).message
    }
    else {
      const payload = await response.text()
      const jsonPayload = JSON.parse(payload)
      if (jsonPayload.id)
        user.value = jsonPayload
    }
  }
  catch (error) {
    console.error(error)
  }
}
