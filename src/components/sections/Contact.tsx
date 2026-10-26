import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { contactLimits, profile } from '../../config/profile'
import { useLanguage } from '../../i18n'
import {
  emptyContactForm,
  validateContactForm,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactFormValues,
  type ProjectType,
  type ValidationError,
} from '../../utils/contactValidation'
import { buildMailto } from '../../utils/mailto'
import { ExternalLink } from '../ui/ExternalLink'
import { Icon, type IconName } from '../ui/Icon'
import { Section } from '../ui/Section'
import { useToast } from '../ui/toastContext'
import { Card } from '../ui/Card'

const PROJECT_TYPES: ProjectType[] = ['website', 'webApp', 'localization', 'other']
const FIELD_ORDER: ContactField[] = ['name', 'email', 'projectType', 'message']

export function Contact() {
  const { t, format, formatNumber } = useLanguage()
  const { notify } = useToast()
  const formId = useId()
  const fieldRefs = useRef<Partial<Record<ContactField, HTMLElement | null>>>({})

  // Form state lives here, not in the language context, so switching
  // language re-renders the labels but never touches what was typed.
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [showSummary, setShowSummary] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const errorText = (error: ValidationError) => {
    const values = Object.fromEntries(Object.entries(error.values ?? {}).map(([key, n]) => [key, formatNumber(n)]))
    return format(t.contact.validation[error.key], values)
  }
  const ids = (field: ContactField) => ({ input: `${formId}-${field}`, error: `${formId}-${field}-error` })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as ContactField
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    // Re-validate as the user types only once the field has been visited.
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateField(field, next) }))
  }

  const handleBlur = (field: ContactField) => {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors((current) => ({ ...current, [field]: validateField(field, values) }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, projectType: true, message: true })

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      setShowSummary(true)
      fieldRefs.current[firstInvalid]?.focus()
      return
    }
    setShowSummary(false)

    if (!profile.email) {
      notify((dict) => dict.contact.notifications.emailNotConfigured, 'error')
      return
    }

    setSubmitting(true)
    const projectTypeLabel = values.projectType ? t.contact.form.projectTypes[values.projectType] : ''
    const mailto = buildMailto({
      to: profile.email,
      subject: `${projectTypeLabel} – ${values.name.trim()}`,
      body: `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`,
    })
    window.location.href = mailto
    notify((dict) => dict.contact.notifications.emailOpened, 'success')
    // There is no request to wait for; re-enable the button after the
    // email app has had a moment to open.
    window.setTimeout(() => setSubmitting(false), 1500)
  }

  const copyEmail = async () => {
    if (!profile.email) return
    try {
      await navigator.clipboard.writeText(profile.email)
      notify((dict) => dict.contact.notifications.emailCopied, 'success')
    } catch {
      notify((dict) => dict.contact.notifications.copyFailed, 'error')
    }
  }

  const fieldProps = (field: ContactField) => {
    const error = touched[field] ? errors[field] : undefined
    return {
      id: ids(field).input,
      name: field,
      value: values[field],
      onChange: handleChange,
      onBlur: () => handleBlur(field),
      required: true,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? ids(field).error : undefined,
      ref: (element: HTMLElement | null) => {
        fieldRefs.current[field] = element
      },
    }
  }

  const fieldError = (field: ContactField) => {
    const error = touched[field] ? errors[field] : undefined
    return error ? (
      <p id={ids(field).error} className="field__error">
        <Icon name="alert" size={16} />
        {errorText(error)}
      </p>
    ) : null
  }

  const label = (field: ContactField, text: string) => (
    <label htmlFor={ids(field).input} className="field__label">
      {text}
      <span className="field__required" aria-hidden="true">
        *
      </span>
      <span className="visually-hidden"> ({t.contact.form.required})</span>
    </label>
  )

  const channels: { icon: IconName; label: string; value: string | null; href: string | null }[] = [
    { icon: 'mail', label: t.contact.channels.email, value: profile.email, href: profile.email && `mailto:${profile.email}` },
    { icon: 'phone', label: t.contact.channels.phone, value: profile.phone, href: profile.phone && `tel:${profile.phone}` },
    { icon: 'linkedin', label: t.contact.channels.linkedin, value: profile.linkedinUrl, href: profile.linkedinUrl },
    { icon: 'github', label: t.contact.channels.github, value: profile.githubUrl, href: profile.githubUrl },
  ]

  const messageLength = values.message.length
  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle}>
      <div className="contact__grid">
        <ul className="contact__channels" aria-label={t.contact.channelsLabel}>
          {channels.map((channel) => (
            <li key={channel.label}>
              <Card className="channel">
                <span className="card__icon">
                  <Icon name={channel.icon} />
                </span>
                <div className="channel__body">
                  <p className="channel__label">{channel.label}</p>
                  {channel.value && channel.href ? (
                    channel.href.startsWith('http') ? (
                      <ExternalLink href={channel.href} className="channel__value" dir="ltr">
                        {channel.value.replace(/^https?:\/\//, '')}
                      </ExternalLink>
                    ) : (
                      <a href={channel.href} className="channel__value" dir="ltr">
                        {channel.value}
                      </a>
                    )
                  ) : (
                    <p className="channel__value channel__value--missing">{t.common.notConfigured}</p>
                  )}
                </div>
                {channel.icon === 'mail' && profile.email && (
                  <button type="button" className="icon-button" onClick={copyEmail}>
                    <Icon name="copy" size={18} />
                    <span className="visually-hidden">{t.contact.copyEmail}</span>
                  </button>
                )}
              </Card>
            </li>
          ))}
        </ul>

        <form className="card contact-form" noValidate onSubmit={handleSubmit} aria-labelledby={`${formId}-title`}>
          <h3 id={`${formId}-title`} className="card__title">
            {t.contact.form.title}
          </h3>

          {showSummary && errorCount > 0 && (
            <p className="form-summary" role="alert">
              <Icon name="alert" size={18} />
              {t.contact.validation.summary}
            </p>
          )}

          <div className="form-row">
            <div className="field">
              {label('name', t.contact.form.name)}
              <input type="text" autoComplete="name" placeholder={t.contact.form.namePlaceholder} {...fieldProps('name')} />
              {fieldError('name')}
            </div>
            <div className="field">
              {label('email', t.contact.form.email)}
              {/* Email addresses are always left-to-right, even in Arabic. */}
              <input
                type="email"
                autoComplete="email"
                inputMode="email"
                dir="ltr"
                className="input--ltr"
                placeholder={t.contact.form.emailPlaceholder}
                {...fieldProps('email')}
              />
              {fieldError('email')}
            </div>
          </div>

          <div className="field">
            {label('projectType', t.contact.form.projectType)}
            <select {...fieldProps('projectType')}>
              <option value="" disabled>
                {t.contact.form.projectTypePlaceholder}
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {t.contact.form.projectTypes[type]}
                </option>
              ))}
            </select>
            {fieldError('projectType')}
          </div>

          <div className="field">
            {label('message', t.contact.form.message)}
            <textarea rows={6} placeholder={t.contact.form.messagePlaceholder} {...fieldProps('message')} />
            <div className="field__meta">
              {fieldError('message')}
              <p
                className={`field__count${messageLength > contactLimits.messageMax ? ' field__count--over' : ''}`}>
                {format(t.contact.form.characterCount, {
                  count: formatNumber(messageLength),
                  max: formatNumber(contactLimits.messageMax),
                })}
              </p>
            </div>
          </div>

          <p className="form-note">
            <Icon name="info" size={16} />
            {t.contact.form.howItWorks}
          </p>

          <button type="submit" className="button button--primary button--block" disabled={submitting} aria-busy={submitting}>
            {submitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                {t.contact.form.submitting}
              </>
            ) : (
              <>
                {t.contact.form.submit}
                <Icon name="arrowForward" size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </Section>
  )
}
