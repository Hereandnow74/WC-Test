import { DBCharacter, SearchRequest } from 'global'

import { useUser } from '~/store/user'

const { tokens } = useUser()

export async function _searchForCharacters(SERVER_URL: string, API_VERSION: string, request: SearchRequest): Promise<{limit: number; page: number; results: DBCharacter[]; totalPages: number; totalResults: number}> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/characters/search`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    // const errorText = await response.text()
    // console.log(JSON.parse(errorText).message)
    return { limit: 0, page: 0, results: [], totalPages: 0, totalResults: 0 }
  }
  else {
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    return jsonPayload
  }
}

export async function _getRandomCharacters(SERVER_URL: string, API_VERSION: string, request: SearchRequest): Promise<DBCharacter[]> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/characters/random`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    // const errorText = await response.text()
    // console.log(JSON.parse(errorText).message)
    return []
  }
  else {
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    return jsonPayload
  }
}

export async function _recalculateLikesOnServer(SERVER_URL: string, API_VERSION: string): Promise<string> {
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
      //   console.log(JSON.parse(errorText).message)
      return `Recalucalation failed: ${JSON.parse(errorText).message}`
    }
    else {
    //   const payload = await response.text()
    //   console.log(payload)
      return 'Success'
    }
  }
  return 'No Token'
}

export async function _getLikesByUid(SERVER_URL: string, API_VERSION: string, uidArr: number[]): Promise<Record<number, number>> {
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
    // const errorText = await response.text()
    // console.log(JSON.parse(errorText).message)
    return {}
  }
  else {
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    return jsonPayload
  }
}

export async function _getCharactersFromServer(SERVER_URL: string, API_VERSION: string): Promise<any[]> {
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
      // console.log(jsonPayload)
      return jsonPayload
    }
  }
  return ['No Token']
}

export async function _rebaseCharactersToServer(SERVER_URL: string, API_VERSION: string): Promise<any> {
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
