type EmailPayload = {
  to: string
  subject: string
  html: string
  from?: string
  replyTo?: string
}

const FROM_ADDRESS = process.env.EMAIL_FROM ?? 'Peptide United <research@peptideunited.com>'

export async function sendEmail(payload: EmailPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // No-op in development / test mode — just log
    console.log(`[email] Would send to ${payload.to}: "${payload.subject}" (RESEND_API_KEY not set)`)
    return { ok: true }
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: payload.from ?? FROM_ADDRESS,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  } catch (err) {
    console.error('[email] Send failed:', err)
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
