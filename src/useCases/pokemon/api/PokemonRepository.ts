import { Pokedex } from 'pokeapi-js-wrapper'
import * as pk from 'pokemon'

export type Pokemon = {
    name: string,
    sprite: string,
    order: number,
    types: string[],
    id : number,
    frName : string,
}

const pokedex = new Pokedex()

export async function getRandomPokemon(lang : string): Promise<Pokemon | null> {
    // const randomName : string = pk.random()
    const randomIndex = Math.floor(Math.random() * 151) + 1
    
    const randomName = pk.getName(randomIndex)

    return searchPokemon(randomName, lang)
}

async function getFrenchName (name : string) : Promise<string> {
    const frModule = await import('pokemon/data/fr.json')
    const enModule = await import('pokemon/data/en.json')

    // @ts-ignore
    const enIndex = enModule.default.indexOf(name)
    // @ts-ignore
    const frName = frModule.default[enIndex]

    return frName
}

export async function checkIfNameIsEngligh (name : string) : Promise<string> {
    const frModule = await import('pokemon/data/fr.json')
    const enModule = await import('pokemon/data/en.json')

    // @ts-ignore
    const enIndex = enModule.default.indexOf(name)
    // @ts-ignore
    const frIndex = frModule.default.indexOf(name)

    if (enIndex < 0 && frIndex > 0) {
        // @ts-ignore
        return enModule.default[frIndex]
    } 

    return name
}

export async function searchPokemon(name: string, lang : string): Promise<Pokemon | null> {
    try {
        const correctName = await checkIfNameIsEngligh(name)

        const json = await pokedex.getPokemonByName(correctName.toLowerCase())
        const pokemon: Pokemon = {
            id : json.id,
            name: json.name,
            sprite: json.sprites.other['official-artwork'].front_default,
            order: json.order,
            types: json.types.map((t: any) => t.type.name),
            frName : ''
        }

        if (lang === 'fr') {
            const frName = await getFrenchName(correctName)
            pokemon.frName = frName.toLowerCase()
        }

        return pokemon
    } catch (e) {
        console.debug(e)
        return null
    }
}
