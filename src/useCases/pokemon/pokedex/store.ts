import { atom, map } from 'nanostores'
import { Pokemon, searchPokemon } from '../api/PokemonRepository'
import { lang } from '../../changeLang/store'

export const isLoading = atom(false)

export const notFound = atom(false)

export const pokemon = atom<Pokemon | null>(null)

export const pokemon404 = atom<Pokemon>(
    await searchPokemon('luxio', 'en')
)

export async function loadPokemon(name: string) {
    isLoading.set(true)
    pokemon.set(null)

    const foundPokemon = await searchPokemon(name, lang.get())

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
