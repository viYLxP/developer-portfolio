import { createContext, useContext } from 'react'
import type { Dictionary } from '../../i18n'

export type ToastTone = 'success' | 'error' | 'info'

/**
 * A toast stores a function of the dictionary rather than a string, so a
 * visible toast is re-translated when the language changes.
 */
export type ToastMessage = (t: Dictionary) => string

export interface ToastContextValue {
  notify: (message: ToastMessage, tone?: ToastTone) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside <ToastProvider>')
  return context
}
