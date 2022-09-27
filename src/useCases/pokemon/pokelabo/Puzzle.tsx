import { lang } from '../../changeLang/store'
import { getRandomPokemon } from '../api/PokemonRepository'
import { createSignal, onMount } from "solid-js";
import './Puzzle.scss'

export default function Puzzle() {
    const [pokemon, setPokemon] = createSignal(null)
    const [started, setStart] = createSignal(false)
    const [success, setSuccess] = createSignal(false)
    const [inputValue, setValue] = createSignal('')
    const [coverRemoved, setCoverRemoved] = createSignal(0)
    
    let el: HTMLElement;
    let internal : number

    const pieces = Array.from(Array(25).keys()).map((value: number) => {
        return { index: value }
    })

    const getStyle = (piece: any): string => {
        const gridSize = 5
        const percentage = 100 / (gridSize - 1)

        const xpos = (percentage * (piece.index % gridSize)) + '%';
        const ypos = (percentage * Math.floor(piece.index / gridSize)) + '%';

        const style = {
            'background-image': `url(${pokemon().sprite})`,
            'background-size': '400px',
            'background-position': xpos + ' ' + ypos
        }

        const styleString = (
            Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';')
        )

        return styleString
    }

    const removeCover = () => {
        const index = Math.round(Math.random() * 24)
        const children = el.querySelector('.Puzzle__wrapper').children[index]

        const cover = children.querySelector('.for--cover')
        
        if (cover) {
            children.removeChild(cover)
            setCoverRemoved(coverRemoved() + 1)
        } else if (coverRemoved() < 25) {
            removeCover()
        } else {
            console.debug('clear', coverRemoved())
            clearInterval(internal)
        }
    }

    const start = () => {
        setStart(true)

        internal = setInterval(() => {
            removeCover()
        }, 1000)
    }

    const handleChange = (e : Event) => {
        const value = (e.target as HTMLInputElement).value
        const { name, frName} = pokemon()

        if (value === name || value === frName) {
            setSuccess(true)
            clearInterval(internal)
        } else {
            setValue('')
        }
    }

    onMount(() => {
        getRandomPokemon(lang.get()).then((pokemon) => {
            setPokemon(pokemon)
        })
    })

    return (
        <div ref={el}>
            {
                pokemon() === null
                    ? 'null'
                    : (
                        <div>
                            <div class="nes-field">
                                <label for="pokemon-name" class="required">Pokemon name</label>
                                <input
                                    type="text"
                                    value={inputValue()}
                                    class="nes-input"
                                    id="pokemon-name"
                                    placeholder="Pikachu for example"
                                    onChange={handleChange}
                                    autocomplete="off"
                                    disabled={coverRemoved() === 25 || !started() || success()}
                                />
                            </div>
                            <br />
                            {
                                success() && <div style="margin-bottom : 20px">
                                    You finished in {coverRemoved()} tries !
                                </div>
                            }
                            {
                                (coverRemoved() === 25) && <div style="margin-bottom : 20px">
                                    You lose, it was {pokemon().name}
                                </div>
                            }
                            <div class="Puzzle nes-container is-rounded is-dark">
                                <div className="Puzzle__start">
                                    {started() === false && <button 
                                        type="button" 
                                        class="nes-btn"
                                        on:click={() => { start() }}
                                    >
                                        start puzzle
                                    </button>}
                                </div>
                                <div className="Puzzle__wrapper">
                                    {pieces.map(piece => (
                                        <div style={getStyle(piece)}>
                                            <div className="for--cover"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}