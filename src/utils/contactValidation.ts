import { contactLimits } from '../config/profile'
import type { Dictionary } from '../i18n'

export type ProjectType = keyof Dictionary['contact']['form']['projectTypes']

export interface ContactFormValues {
  name: string
  email: string
  projectType: ProjectType | ''
  message: string
}

export type ContactField = keyof ContactFormValues

/**
 * Errors are stored as dictionary keys plus values, not as text, so an
 * error that is already on screen is re-translated when the language changes.
 */
export interface ValidationError {
  key: keyof Dictionary['contact']['validation']
  values?: Record<string, number>
}

export type ContactErrors = Partial<Record<ContactField, ValidationError>>

export const emptyContactForm: ContactFormValues = { name: '', email: '', projectType: '', message: '' }

// Pragmatic check: something@something.tld, no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateField(field: ContactField, values: ContactFormValues): ValidationError | undefined {
  const value = values[field].trim()
  switch (field) {
    case 'name':
      if (!value) return { key: 'nameRequired' }
      if (value.length < contactLimits.nameMin) return { key: 'nameTooShort', values: { min: contactLimits.nameMin } }
      return undefined
    case 'email':
      if (!value) return { key: 'emailRequired' }
      if (!EMAIL_PATTERN.test(value)) return { key: 'emailInvalid' }
      return undefined
    case 'projectType':
      return value ? undefined : { key: 'projectTypeRequired' }
    case 'message':
      if (!value) return { key: 'messageRequired' }
      if (value.length < contactLimits.messageMin)
        return { key: 'messageTooShort', values: { min: contactLimits.messageMin } }
      if (value.length > contactLimits.messageMax)
        return { key: 'messageTooLong', values: { max: contactLimits.messageMax } }
      return undefined
  }
}

export function validateContactForm(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {}
  for (const field of Object.keys(values) as ContactField[]) {
    const error = validateField(field, values)
    if (error) errors[field] = error
  }
  return errors
}
