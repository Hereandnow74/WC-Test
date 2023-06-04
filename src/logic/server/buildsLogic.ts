import { SearchBuild, ServerBuild } from 'global'

import { useUser } from '~/store/user'

const { tokens } = useUser()

export async function _createBuildInDB(SERVER_URL: string, API_VERSION: string, build: ServerBuild): Promise<any> {
  if (!tokens.value?.access?.token) return 'You don\'t have access'
  const url = `${SERVER_URL}/${API_VERSION}/builds`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.value.access.token}`,
    },
    body: JSON.stringify(build),
  })

  if (!response.ok) {
    const errorText = await response.text()
    return errorText
  }

  return 'Success'
}

export async function _searchForBuilds(SERVER_URL: string, API_VERSION: string, request: SearchBuild): Promise<{limit: number; page: number; results: ServerBuild[]; totalPages: number; totalResults: number}> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/builds/search`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    return { limit: 0, page: 0, results: [], totalPages: 0, totalResults: 0 }
  }
  else {
    const payload = await response.json()
    return payload
  }
}

export async function _getAllYourBuilds(SERVER_URL: string, API_VERSION: string): Promise<ServerBuild[]> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/builds`
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.value.access.token}`,
    },
  })

  if (!response.ok) {
    return []
  }
  else {
    const payload = await response.json()
    console.log(payload);
    return payload
  }
}
