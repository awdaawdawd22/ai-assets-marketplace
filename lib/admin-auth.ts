'use client'

const ADMIN_AUTH_KEY = 'ai-assets-admin-auth'
const ADMIN_PASSWORD = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_ADMIN_PASSWORD) || 'admin123'

export function isAdminAuthenticated() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(ADMIN_AUTH_KEY) === 'true'
}

export function loginAdmin(password: string) {
  if (password === ADMIN_PASSWORD) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ADMIN_AUTH_KEY, 'true')
    }
    return true
  }

  return false
}

export function logoutAdmin() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(ADMIN_AUTH_KEY)
}
