<script lang="ts">
    import { onMount } from "svelte";
    import { 
        validatePokemon, tries, found, notFound, pokemon, loadRandomPokemon
    } from "./store";
    import { lang } from '../../changeLang/store'

    type InputItem = { value : string, correct : boolean, letter : string}

    let inputs : InputItem[] = []

    export let node : HTMLElement

    const reload = () => {
        loadRandomPokemon()
        inputs = []
    }

    const validateInputs = () => {
        inputs = inputs.map((item : InputItem) => {
            return {
                letter : item.letter,
                value : item.value,
                correct : item.letter === item.value,
            }
        })

        validatePokemon(inputs.map((item : InputItem) => item.value).join(''))

        inputs = inputs.map((item : InputItem) => {
            return {
                letter : item.letter,
                value : item.correct ? item.value : '',
                correct : item.correct,
            }
        })

        if(notFound.get()) {
            inputs = inputs.map((item : InputItem) => {
                return {
                    letter : item.letter,
                    value : item.letter,
                    correct : item.correct,
                }
            })
        }
    }

    const selectNextInput = (position : number) => {
        const inputEl = node.querySelectorAll('input').item(position + 1)

        if (inputEl) {
            if (inputEl.disabled) {
                selectNextInput(position + 1)
            } else {
                inputEl.focus()
            }
        }
    }

    onMount(() => {
        const pokemonName = lang.get() === 'fr' ? pokemon.get().frName : pokemon.get().name
        
        inputs = pokemonName.split('').map((letter : string) => {
            return {
                letter,
                value : '',
                correct : false,
            }
        })
    })
</script>

<div class="Search" bind:this={node}>
    <div class="Search__inputs">
        {#each inputs as item, index}
            <input
                autocomplete="off"
                type="text"
                id="pokemon-letter"
                bind:value={item.value}
                on:input={(event) => { selectNextInput(index) }}
                maxlength="1"
                disabled={item.correct || $tries === 5 || ($found || $notFound)}
                class="{(item.correct === false && $notFound) ? 'is--small is--error' : 'is--small'}"
            />
        {/each}
    </div>
    <br />
    <div class="text-center">
        {#if !($found || $notFound)}
            <button 
                class="btn" 
                type="button"
                disabled={inputs.some( ({value}) => value === '' )}
                on:click={() => { validateInputs() }}
            >Validate</button>
        {:else}
            <button 
                class="btn btn-primary" 
                type="button"
                on:click={() => { reload() }}
            >
                Rejouer
            </button>
        {/if}   
    </div>
</div>

<style scoped lang="scss">
    .Search {
        width: 100%;
        margin-top: 40px;

        &__inputs {
            text-align: center;

            input.is--small {
                width: 50px;
                height: 50px;
                font-size: 20px;
                background : #121417;
                box-shadow: none;
                color : white;
                text-align: center;
                border: 10px solid;
                border-image-slice: 1;
                border-width: 1px;
                border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
                margin-left: 10px;
                margin-right: 10px;
                text-transform: uppercase;

                &:disabled {
                    border-image-source: linear-gradient(to left, #00C853, #B2FF59);
                    color : #00C853;
                }

                &.is--error {
                    border-image-source : linear-gradient(to right, darkred, #C80000);
                    color : orange;
                }
            }
        }

        div.text-center {
            margin-top: 20px;
            margin-bottom: 40px;
        }
    }
</style>
