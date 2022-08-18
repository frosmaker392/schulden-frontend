import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import AuthServiceProvider from '../providers/AuthServiceProvider'
import TokenServiceProvider from '../providers/TokenServiceProvider'
import { AuthResult, IAuthService } from '../services/AuthService'
import { ITokenService } from '../services/TokenService'
import useAuth from './useAuth'

const successAuthService: IAuthService = {
  async login(): Promise<AuthResult> {
    return {
      token: 'token-from-login',
    }
  },

  async register(): Promise<AuthResult> {
    return {
      token: 'token-from-register',
    }
  },

  getCurrentUser: () => Promise.resolve({ errorMessage: '' }),
}

const failingAuthService: IAuthService = {
  async login(): Promise<AuthResult> {
    return {
      errorMessage: 'login-error-message',
    }
  },

  async register(): Promise<AuthResult> {
    return {
      errorMessage: 'register-error-message',
    }
  },

  getCurrentUser: () => Promise.resolve({ errorMessage: '' }),
}

const tokenSetter = jest.fn()

const tokenService: ITokenService = {
  getToken: () => undefined,
  storeToken: jest.fn(),
  clearToken: () => undefined,
}

const TestLoginComponent: React.FC = () => {
  const { login, success, error } = useAuth()

  return (
    <>
      <button
        onClick={() =>
          login({
            email: 'test@test.com',
            password: 'Password123',
          })
        }
        data-testid='login-btn'
      />

      <p data-testid='success-msg'>{success && 'Success!'}</p>
      <p data-testid='error-msg'>{error}</p>
    </>
  )
}

const TestRegisterComponent: React.FC = () => {
  const { register, success, error } = useAuth()

  return (
    <>
      <button
        onClick={() =>
          register({
            email: 'test@test.com',
            username: 'testUser',
            password: 'Password123',
          })
        }
        data-testid='register-btn'
      />

      <p data-testid='success-msg'>{success && 'Success!'}</p>
      <p data-testid='error-msg'>{error}</p>
    </>
  )
}

describe('useAuth hook', () => {
  beforeEach(() => {
    tokenSetter.mockClear()
  })

  describe('login callback', () => {
    test('on success', async () => {
      const { getByTestId } = render(
        <AuthServiceProvider service={successAuthService}>
          <TokenServiceProvider service={tokenService}>
            <TestLoginComponent />
          </TokenServiceProvider>
        </AuthServiceProvider>,
      )

      expect(getByTestId('success-msg').textContent).toBe('')
      expect(getByTestId('error-msg').textContent).toBe('')

      fireEvent.click(getByTestId('login-btn'))

      await waitFor(() => getByTestId('error-msg'))

      expect(getByTestId('success-msg').textContent).toBe('Success!')
      expect(getByTestId('error-msg').textContent).toBe('')
    })

    test('on failure', async () => {
      const { getByTestId } = render(
        <AuthServiceProvider service={failingAuthService}>
          <TokenServiceProvider service={tokenService}>
            <TestLoginComponent />
          </TokenServiceProvider>
        </AuthServiceProvider>,
      )

      expect(getByTestId('success-msg').textContent).toBe('')
      expect(getByTestId('error-msg').textContent).toBe('')

      fireEvent.click(getByTestId('login-btn'))

      await waitFor(() => getByTestId('error-msg'))

      expect(getByTestId('success-msg').textContent).toBe('')
      expect(getByTestId('error-msg').textContent).toBe('login-error-message')
    })
  })

  describe('register callback', () => {
    test('on success', async () => {
      const { getByTestId } = render(
        <AuthServiceProvider service={successAuthService}>
          <TokenServiceProvider service={tokenService}>
            <TestRegisterComponent />
          </TokenServiceProvider>
        </AuthServiceProvider>,
      )

      expect(getByTestId('success-msg').textContent).toBe('')
      expect(getByTestId('error-msg').textContent).toBe('')

      fireEvent.click(getByTestId('register-btn'))

      await waitFor(() => getByTestId('error-msg'))

      expect(getByTestId('success-msg').textContent).toBe('Success!')
      expect(getByTestId('error-msg').textContent).toBe('')
    })

    test('on failure', async () => {
      const { getByTestId } = render(
        <AuthServiceProvider service={failingAuthService}>
          <TokenServiceProvider service={tokenService}>
            <TestRegisterComponent />
          </TokenServiceProvider>
        </AuthServiceProvider>,
      )

      expect(getByTestId('success-msg').textContent).toBe('')
      expect(getByTestId('error-msg').textContent).toBe('')

      fireEvent.click(getByTestId('register-btn'))

      await waitFor(() => getByTestId('error-msg'))

      expect(getByTestId('success-msg').textContent).toBe('')
      expect(getByTestId('error-msg').textContent).toBe('register-error-message')
    })
  })
})
