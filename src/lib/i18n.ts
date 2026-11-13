/**
 * Copy in every language the site speaks. Spanish and English are required;
 * Italian and German fall back to English wherever a string has not been
 * translated yet, so a page never shows an empty gap.
 */
export type Copy<T = string> = { es: T; en: T; it?: T; de?: T };

export function pick<T>(language: string, copy: Copy<T>): T {
  return (copy as Record<string, T | undefined>)[language] ?? copy.en;
}
