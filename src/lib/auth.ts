import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { User } from '@/payload-types'

/**
 * Read the current authenticated user from the Payload session cookie.
 * Safe to call from any server component or server action.
 * Returns null if the user is not logged in or the token is invalid.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value
    if (!token) return null

    const payload = await getPayload({ config })
    const { user } = await payload.auth({
      headers: new Headers({ Authorization: `JWT ${token}` }),
    })
    return (user as User) ?? null
  } catch {
    return null
  }
}

