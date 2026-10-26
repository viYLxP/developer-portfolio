import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLanguage } from '../../i18n'
import { Icon, type IconName } from './Icon'
import { ToastContext, type ToastMessage, type ToastTone } from './toastContext'

interface Toast {
  id: number
  message: ToastMessage
  tone: ToastTone
}

const TOAST_DURATION_MS = 6000

const toneIcons: Record<ToastTone, IconName> = { success: 'check', error: 'alert', info: 'info' }

export function ToastProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage()
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(0)
  const timers = useRef(new Map<number, number>())

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
    window.clearTimeout(timers.current.get(id))
    timers.current.delete(id)
  }, [])

  const notify = useCallback(
    (message: ToastMessage, tone: ToastTone = 'info') => {
      const id = nextId.current++
      setToasts((current) => [...current.slice(-2), { id, message, tone }])
      timers.current.set(id, window.setTimeout(() => dismiss(id), TOAST_DURATION_MS))
    },
    [dismiss],
  )

  useEffect(() => {
    const activeTimers = timers.current
    return () => activeTimers.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Always rendered so screen readers register the live region before the first toast. */}
      <section className="toasts" aria-label={t.a11y.notifications}>
        <div role="status" aria-live="polite" className="toasts__list">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast toast--${toast.tone}`}>
              <Icon name={toneIcons[toast.tone]} className="toast__icon" />
              <p className="toast__message">{toast.message(t)}</p>
              <button type="button" className="icon-button toast__close" onClick={() => dismiss(toast.id)}>
                <Icon name="close" size={16} />
                <span className="visually-hidden">{t.common.dismiss}</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </ToastContext.Provider>
  )
}
