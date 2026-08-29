import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getIdFromToken, getRoleFromToken } from './jwtDecode'

describe('jwtDecode utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('getIdFromToken', () => {
    it('should return null when no token exists', () => {
      expect(getIdFromToken()).toBeNull()
    })

    it('should return id from valid token', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJyb2xlIjoiU1RVREVOVCJ9.test'
      localStorage.setItem('authToken', token)

      expect(getIdFromToken()).toBe(123)
    })

    it('should handle invalid token gracefully', () => {
      localStorage.setItem('authToken', 'invalid-token')

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const result = getIdFromToken()

      expect(result).toBeNull()
      consoleSpy.mockRestore()
    })
  })

  describe('getRoleFromToken', () => {
    it('should return null when no token exists', () => {
      expect(getRoleFromToken()).toBeNull()
    })

    it('should return role from valid token', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJyb2xlIjoiU1RVREVOVCJ9.test'
      localStorage.setItem('authToken', token)

      expect(getRoleFromToken()).toBe('STUDENT')
    })
  })
})
