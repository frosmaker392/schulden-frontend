import { MockStorage } from '../utils/TestUtils'
import TokenService from './TokenService'

let storage: Storage
let tokenService: TokenService
describe('TokenService', () => {
  beforeEach(() => {
    storage = new MockStorage()
    tokenService = new TokenService(storage)
  })

  test('get- and storeToken', () => {
    expect(tokenService.getToken()).toBeUndefined()

    tokenService.storeToken('exampleToken')
    expect(storage.getItem(tokenService.tokenStoreKey)).toBe('exampleToken')
    expect(tokenService.getToken()).toBe('exampleToken')

    // Overwrites previous token
    tokenService.storeToken('anotherToken')
    expect(tokenService.getToken()).toBe('anotherToken')
  })

  test('clearToken', () => {
    tokenService.storeToken('exampleToken')
    tokenService.clearToken()

    expect(storage.getItem(tokenService.tokenStoreKey)).toBeNull()
    expect(tokenService.getToken()).toBeUndefined()
  })
})
