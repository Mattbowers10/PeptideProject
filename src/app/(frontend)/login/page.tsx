import type { Metadata } from 'next'
import { LoginClient } from './LoginClient'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Peptide United account to access your research dashboard and full peptide profiles.',
}

export default function LoginPage() {
  return <LoginClient />
}
