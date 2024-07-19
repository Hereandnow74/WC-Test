import { useGlobalSettings } from '~/store/settings'
import { useUser } from '~/store/user'

const { user, tokens } = useUser()

export async function _verifyEmail(SERVER_URL: string, API_VERSION: string, token: string): Promise<number> {
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
    return statusCode
  }
  catch (error) {
    console.error(error)
    return 1
  }
}

export async function _sendVerificationEmail(SERVER_URL: string, API_VERSION: string): Promise<any> {
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

export async function _postRegisterInfoToEndpoint(SERVER_URL: string, API_VERSION: string, registerInfo: any): Promise<string> {
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
    return JSON.parse(errorText).message
  }
  else {
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    // console.log(jsonPayload, 'Payload')
    tokens.value = jsonPayload.tokens
    user.value = jsonPayload.user
    // const status = await sendVerificationEmail()
    return 'Email verification doesn\'t work yet'
  }
  // return 'Success'
}

export async function _loginToServer(SERVER_URL: string, API_VERSION: string, registerInfo: any): Promise<string> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/auth/login`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerInfo),
  })

  if (!response.ok) {
    if (response.status === 429)
      return 'Too many requests'
    const errorText = await response.text()
    // console.log(`Failed to login: ${errorText}`)
    return JSON.parse(errorText).message
  }
  else {
    const payload = await response.text()
    const jsonPayload = JSON.parse(payload)
    tokens.value = jsonPayload.tokens
    user.value = jsonPayload.user
    return 'Success'
  }
  // return 'Success'
}

export async function _refreshTokens(SERVER_URL: string, API_VERSION: string): Promise<string> {
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
      if (response.status === 401) {
        user.value = {}
        tokens.value = {}
        return 'Unauthorized'
      }
      const errorText = await response.text()
      try {
        return JSON.parse(errorText).message
      }
      catch {
        return errorText
      }
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

export async function _logoutFromServer(SERVER_URL: string, API_VERSION: string, token: string): Promise<string> {
  user.value = {}
  tokens.value = {}
  try {
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
  catch (error) {
    console.error(error)
    return 'Error'
  }
}

export async function _resetPassword(SERVER_URL: string, API_VERSION: string, password: string, token: string): Promise<string> {
  if (token) {
    const apiURL = new URL(`${SERVER_URL}/${API_VERSION}/auth/reset-password`)
    apiURL.searchParams.set('token', token)
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return JSON.parse(errorText).message
    }
    else {
      return 'Password was reset successfully'
    }
  }
  return 'No Token'
}

export async function _sendResetToken(SERVER_URL: string, API_VERSION: string, email: string): Promise<string> {
  const apiUrl = `${SERVER_URL}/${API_VERSION}/auth/forgot-password`
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    return JSON.parse(errorText).message
  }
  else {
    return 'Reset password token was send to your email'
  }
}
