import { atom, map } from 'nanostores'
import { Pokemon, getRandomPokemon } from '../api/PokemonRepository'
import { lang } from '../../changeLang/store'

export const isLoading = atom(true)

export const notFound = atom(false)

export const found = atom(false)

export const pokemon = atom<Pokemon | null>(null)

export const tries = atom(0)

export function validatePokemon(name : string) {
    if (tries.get() === 4) {
        notFound.set(true)
        return
    }

    const correctName = lang.get() === 'fr' ? pokemon.get()?.frName : pokemon.get()?.name

    if (correctName === name) {
        found.set(true)
    }  else {
        tries.set(tries.get() + 1)
    }
}

export async function loadRandomPokemon() {
    isLoading.set(true)
    tries.set(0)
    notFound.set(false)
    found.set(false)
    pokemon.set(null)

    const foundPokemon = await getRandomPokemon(lang.get())

    if (foundPokemon) {
        pokemon.set(foundPokemon)
        notFound.set(false)
    } else {
        notFound.set(true)
        pokemon.set(null)
    }
    
    setTimeout(() => {
        isLoading.set(false)
    }, 1000)
}
