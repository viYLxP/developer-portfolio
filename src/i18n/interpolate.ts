export type InterpolationValues = Record<string, string | number>

/** Replaces `{name}` tokens in a translated string. Unknown tokens are kept. */
export function interpolate(template: string, values: InterpolationValues): string {
  return template.replace(/\{(\w+)\}/g, (token, key: string) =>
    Object.hasOwn(values, key) ? String(values[key]) : token,
  )
}
