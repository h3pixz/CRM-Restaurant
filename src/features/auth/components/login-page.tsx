import { useState, type FormEvent } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { signInAdmin } from '../admin-session'

function getSafeRedirect(redirect: string | undefined): string | null {
  if (!redirect) {
    return null
  }

  try {
    const url = new URL(redirect, window.location.origin)

    if (url.origin !== window.location.origin) {
      return null
    }

    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return null
  }
}

export function LoginPage() {
  const navigate = useNavigate()
  const { redirect } = useSearch({ from: '/login' })
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!signInAdmin(login.trim(), password)) {
      setError('Invalid login or password.')
      return
    }

    const target = getSafeRedirect(redirect)

    if (target) {
      window.location.assign(target)
      return
    }

    void navigate({ to: '/tables' })
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <p className="font-logo text-[19px] font-bold tracking-[0.12em] text-neutral-900 uppercase">
            Restaurant CRM
          </p>
          <CardTitle className="mt-2 text-xl">Admin panel</CardTitle>
          <CardDescription>Sign in to view tables and orders.</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-800">
              Login
              <Input
                name="login"
                autoComplete="username"
                autoFocus
                required
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                className="h-11"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-800">
              Password
              <Input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11"
              />
            </label>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" className="mt-2 h-11 w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
