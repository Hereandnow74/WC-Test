import { _refreshTokens } from './authLogic'

import { useUser } from '~/store/user'

const { tokens } = useUser()

export async function _likeOrDislikeMission(SERVER_URL: string, API_VERSION: string, tried = false, info: {uid: string; like: boolean; dislike: boolean; userId: string}): Promise<{uid: string; likes: number; dislikes: number; likesUsers: string[]; dislikesUsers: string[]} | string> {
  if (tokens.value?.access?.token) {
    const apiUrl = `${SERVER_URL}/${API_VERSION}/missions/likeMission`
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.value.access.token}`,
      },
      body: JSON.stringify(info),
    })

    if (!response.ok) {
      const errorText = await response.text()
      if (!tried)
        _refreshTokens(SERVER_URL, API_VERSION).then(() => _likeOrDislikeMission(SERVER_URL, API_VERSION, true, info))
      return JSON.parse(errorText).message
    }
    else {
      const payload = await response.text()
      const jsonPayload = JSON.parse(payload)
      if (jsonPayload)
        return jsonPayload

      return 'Empty response from server.'
    }
  }
  return 'Don\'t have access, you need to login.'
}

export async function _getMissions(SERVER_URL: string, API_VERSION: string, uids: string[]): Promise<{uid: string; likes: number; dislikes: number; likesUsers: string[]; dislikesUsers: string[]}[] | string> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/missions/getMissions`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uids),
  })

  if (!response.ok) {
    const errorText = await response.text()
    return JSON.parse(errorText).message
  }
  else {
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    if (jsonPayload.length)
      return jsonPayload

    return 'Empty response from server.'
  }
}

export async function _searchMissions(SERVER_URL: string, API_VERSION: string, request: SearchRequest): Promise<Missions[] | string> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/missions/searchMissions`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const errorText = await response.text()
    return JSON.parse(errorText).message
  }
  else {
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    if (jsonPayload.length)
      return jsonPayload

    return 'Empty response from server.'
  }
}
