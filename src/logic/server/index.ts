import { SearchBuild, SearchRequest, ServerBuild } from 'global'
import { _loginToServer, _logoutFromServer, _postRegisterInfoToEndpoint, _refreshTokens, _sendVerificationEmail, _verifyEmail } from './authLogic'
import { _searchForCharacters, _recalculateLikesOnServer, _getLikesByUid, _getCharactersFromServer, _rebaseCharactersToServer } from './charactersLogic'
import { _updateUserLikes, _updateUserInfo, _getUserFromServer } from './userLogic'
import { _createBuildInDB, _searchForBuilds } from './buildsLogic'

// const SERVER_URL = 'http://localhost:3000'
const SERVER_URL = 'https://interactive-apps.net'
const API_VERSION = 'v1'

// Auth
export const verifyEmail = (token: string) => _verifyEmail(SERVER_URL, API_VERSION, token)
export const sendVerificationEmail = () => _sendVerificationEmail(SERVER_URL, API_VERSION)
export const postRegisterInfoToEndpoint = (registerInfo: any) => _postRegisterInfoToEndpoint(SERVER_URL, API_VERSION, registerInfo)
export const loginToServer = (registerInfo: any) => _loginToServer(SERVER_URL, API_VERSION, registerInfo)
export const refreshTokens = () => _refreshTokens(SERVER_URL, API_VERSION)
export const logoutFromServer = (token: string) => _logoutFromServer(SERVER_URL, API_VERSION, token)

// User
export const updateUserLikes = (tried = false, info: {characterUid: number; liked: boolean}) => _updateUserLikes(SERVER_URL, API_VERSION, tried, info)
export const updateUserInfo = (tried = false, info: object) => _updateUserInfo(SERVER_URL, API_VERSION, tried, info)
export const getUserFromServer = (token: string) => _getUserFromServer(SERVER_URL, API_VERSION, token)

// Characters
export const searchForCharacters = (request: SearchRequest) => _searchForCharacters(SERVER_URL, API_VERSION, request)
export const recalculateLikesOnServer = () => _recalculateLikesOnServer(SERVER_URL, API_VERSION)
export const getLikesByUid = (uidArr: number[]) => _getLikesByUid(SERVER_URL, API_VERSION, uidArr)
export const getCharactersFromServer = () => _getCharactersFromServer(SERVER_URL, API_VERSION)
export const rebaseCharactersToServer = () => _rebaseCharactersToServer(SERVER_URL, API_VERSION)

// Builds
export const createBuildInDB = (build: ServerBuild) => _createBuildInDB(SERVER_URL, API_VERSION, build)
export const searchForBuilds = (request: SearchBuild) => _searchForBuilds(SERVER_URL, API_VERSION, request)
