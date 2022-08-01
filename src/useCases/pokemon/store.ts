import { atom, map } from 'nanostores'
import { Pokemon, searchPokemon } from './PokemonRepository'

export const isLoading = atom(false)

export const notFound = atom(false)

export const pokemon = atom<Pokemon | null>(null)

export async function loadPokemon(name: string) {
    isLoading.set(true)

    const foundPokemon = await searchPokemon(name)
    if (foundPokemon) {
        pokemon.set(foundPokemon)
        notFound.set(false)
    } else {
        notFound.set(true)
        pokemon.set(null)
    }

    isLoading.set(false)
}
