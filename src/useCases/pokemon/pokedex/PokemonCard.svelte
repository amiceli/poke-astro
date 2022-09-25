<script lang="ts">
    import { Pokemon } from '../api/PokemonRepository'
    import { lang } from '../../changeLang/store'
    import { Loader } from '../../../components/Loader'

    export let pokemon : Pokemon | null = null

    export let loading : boolean

    export let notFound : boolean
</script>

<div 
    class="nes-container is-dark with-title"
    class:is--loading={loading}
>
    <p class="title">
        {#if loading}
            loading
        {:else if pokemon === null}
            waiting
        {:else}
            <a
                href="https://veekun.com/dex/pokemon/{pokemon.name}"
                target="_blank"
            >
                { $lang === 'fr' ? pokemon.frName : pokemon.name}
            </a>
        {/if}
    </p>

    {#if loading}
        <x-loader></x-loader>
    {:else if pokemon === null}
        <span class="for--search">?</span>
    {:else}
        <div class="text-center">
            <img
                src={pokemon.sprite}
                class="img-fluid rounded-top"
                alt="..."
            />
        </div>
        <br/>
        {#each pokemon.types as type, index}
            <img 
                src={`https://veekun.com/dex/media/types/en/${type}.png`} 
                alt=""
                class="for--type"
            />
            {#if index > 0}
                &nbsp;
            {/if}
        {/each}
        <span class="nes-text is-disabled for--order">
            #{pokemon.id}
            {#if notFound}
                (not found ^^)
            {/if}
        </span>
    {/if}
</div>

<style lang="scss" scoped>
     .nes-container {
        position: relative;
        width: 500px;
        margin-left: auto;
        margin-right: auto;

        .for--search {
            font-size: 100px;
        }

        .for--order {
            display: block;
            text-align: right;
            margin-top: 20px;
        }

        .for--type {
            height: 30px;
        }
        img {
            width: 150px;
        }
    }
</style>