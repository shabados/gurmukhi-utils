export function toUnicode(text: string): string

export function toAscii(text: string): string

export function toEnglish(text: string): string

export function toHindi(text: string): string

export function toShahmukhi(text: string): string

export function firstLetters(text: string): string

export function isGurmukhi(text: string, exhaustive?: boolean): boolean

export function stripAccents(text: string): string

interface StripVishraamsOptions {
  heavy?: boolean;
  medium?: boolean;
  light?: boolean;
}

export function stripVishraams(text: string, options?: StripVishraamsOptions): string

export function stripEndings(text: string): string

export function countSyllables(text: string): number

export function toSyllabicSymbols(text: string): string
