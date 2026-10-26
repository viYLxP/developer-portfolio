interface MailtoOptions {
  to: string
  subject: string
  body: string
}

/** Builds a mailto: URL with an encoded subject and body. */
export function buildMailto({ to, subject, body }: MailtoOptions): string {
  const params = new URLSearchParams({ subject, body })
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`
}
