import { atom, map } from 'nanostores'

export const lang = atom('en')

export async function changeLang(newLang: string) {
    lang.set(newLang)
    localStorage.setItem('pokequiz.lang', newLang)
}

export function initLang () {
    lang.set(localStorage.getItem('pokequiz.lang') || 'en')
}
