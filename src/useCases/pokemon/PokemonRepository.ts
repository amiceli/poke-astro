import { Pokedex } from 'pokeapi-js-wrapper'

export type Pokemon = {
    name: string,
    sprite: string,
    order : number,
    types : string[],
}

const pokedex = new Pokedex()

export async function searchPokemon(name: string): Promise<Pokemon | null> {
    try {
        const json = await pokedex.getPokemonByName(name)
        const pokemon: Pokemon = {
            name: json.name,
            sprite: json.sprites.other['official-artwork'].front_default,
            order : json.order,
            types : json.types.map((t : any) => t.type.name )
        }

        return pokemon
    } catch {
        return null
    }
}
