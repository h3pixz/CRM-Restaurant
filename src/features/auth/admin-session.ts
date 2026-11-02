const ADMIN_LOGIN = 'admin'
const ADMIN_PASSWORD = 'admin'
const ADMIN_SESSION_KEY = 'crm-admin-session'
const ADMIN_SESSION_VALUE = 'authenticated'

function getSessionStorage(): Storage | null {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export function isAdminAuthenticated(): boolean {
  return getSessionStorage()?.getItem(ADMIN_SESSION_KEY) === ADMIN_SESSION_VALUE
}

export function signInAdmin(login: string, password: string): boolean {
  if (login !== ADMIN_LOGIN || password !== ADMIN_PASSWORD) {
    return false
  }

  const storage = getSessionStorage()

  if (!storage) {
    return false
  }

  storage.setItem(ADMIN_SESSION_KEY, ADMIN_SESSION_VALUE)
  return true
}
