import { createMockClient } from 'mock-apollo-client'

import { AuthSuccess, Error } from '../typeDefs'
import AuthService, { LOGIN, LoginForm, REGISTER, RegisterForm } from './AuthService'

const loginForm: LoginForm = {
  email: 'test@test.com',
  password: 'password',
}

const registerForm: RegisterForm = {
  email: 'test@test.com',
  username: 'testUser',
  password: 'password',
}

const successResponse: AuthSuccess = {
  token: 'mock-token',
}

const errorResponse: Error = {
  errorMessage: 'mock-error-message',
}

const loginHandler = jest.fn().mockImplementation(({ email, password }: LoginForm) => {
  return Promise.resolve({
    data: {
      login:
        email === loginForm.email && password === loginForm.password
          ? successResponse
          : errorResponse,
    },
  })
})
const registerHandler = jest.fn().mockImplementation(({ email, password }: RegisterForm) => {
  return Promise.resolve({
    data: {
      register: email && password ? successResponse : errorResponse,
    },
  })
})

let authService: AuthService
describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    const client = createMockClient()
    client.setRequestHandler(LOGIN, loginHandler)
    client.setRequestHandler(REGISTER, registerHandler)

    authService = new AuthService(client)
  })

  describe('login', () => {
    test('success returns AuthSuccess', async () => {
      const response = await authService.login(loginForm)

      expect(loginHandler).toBeCalledTimes(1)
      expect(loginHandler).toBeCalledWith(loginForm)
      expect(response).toEqual(successResponse)
    })

    test('failure returns Error', async () => {
      const response = await authService.login({ ...loginForm, email: 'error@test.com' })

      expect(response).toEqual(errorResponse)
    })
  })

  describe('register', () => {
    test('success returns AuthSuccess', async () => {
      const response = await authService.register(registerForm)

      expect(registerHandler).toBeCalledTimes(1)
      expect(registerHandler).toBeCalledWith(registerForm)
      expect(response).toEqual(successResponse)
    })

    test('failure returns Error', async () => {
      const response = await authService.register({ ...registerForm, email: '' })

      expect(response).toEqual(errorResponse)
    })
  })
})
