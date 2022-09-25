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
                class="nes-input is-dark"
                id="pokemon-letter"
                bind:value={item.value}
                on:input={(event) => { selectNextInput(index) }}
                maxlength="1"
                disabled={item.correct || $tries === 5 || ($found || $notFound)}
                class:is--small={true}
                class:is-error={item.correct === false && $notFound}
                class:is-success={item.correct || $tries === 5 || ($found || $notFound)}
            />
        {/each}
    </div>
    <div class="Search__hearts">
        <i 
            class="nes-icon is-large heart"
            class:is-empty={$tries >= 5 || $notFound}
        ></i>
        <i 
            class="nes-icon is-large heart"
            class:is-empty={$tries >= 4}
        ></i>
        <i 
            class="nes-icon is-large heart"
            class:is-empty={$tries >= 3}
        ></i>
        <i 
            class="nes-icon is-large heart"
            class:is-empty={$tries >= 2}
        ></i>
        <i 
            class="nes-icon is-large heart"
            class:is-empty={$tries >= 1}
        ></i>
    </div>
    <div class="text-center">
        {#if !($found || $notFound)}
            <button 
                type="button" 
                class="nes-btn"
                disabled={inputs.some( ({value}) => value === '' )}
                on:click={() => { validateInputs() }}
                class:is-disabled={inputs.some( ({value}) => value === '' )}
            >
                Validate
            </button>
        {:else}
            <button 
                type="button" 
                class="nes-btn is-primary"
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

        &__hearts {
            margin-top: 20px;
            i {
                font-size: 15px;
            }
        }
        &__inputs {
            text-align: center;

            input.is--small {
                padding: 0;
                width: 50px;
                height: 50px;
                font-size: 20px;
                background-color:#212529;
                box-shadow: none;
                color : white;
                text-align: center;
                margin-left: 10px;
                margin-right: 10px;
                text-transform: uppercase;
            }
        }

        div.text-center {
            margin-top: 20px;
            margin-bottom: 40px;
        }
    }
</style>
