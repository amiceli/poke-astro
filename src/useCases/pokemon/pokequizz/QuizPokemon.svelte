<script>
    import { isLoading, loadRandomPokemon } from "./store";
    import SearchPokemon from "./SearchPokemon.svelte";
    import PreviewPokemon from "./PreviewPokemon.svelte";
    import { onMount } from "svelte";
    import { Loader } from '../../../components/Loader'

    onMount(() => {
        loadRandomPokemon()
    });
</script>

<div class="Quiz">
    <div class="nes-container is-dark with-title is-centered">
        <p class="title">
            {#if $isLoading === true}
                loading
            {:else}
                Pokéquiz
            {/if}
        </p>
        {#if $isLoading === true}
            <div class="text-center">
                <x-loader></x-loader>
            </div>
        {:else}
            <div class="Quiz__wrap">
                <div>
                    <SearchPokemon />
                </div>
                <div class="center">
                    <PreviewPokemon />
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss" scoped>
    .Quiz {
        display: block;
        width: 100%;

        .center {
            text-align: center;
        }
    }
</style>
