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
    {#if $isLoading === true}
        <div class="Quiz__loading">
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

<style lang="scss" scoped>
    .Quiz {
        display: block;
        width: 100%;

        &__loading {
            background : #26282C;
            position : fixed;
            top : 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .center {
            text-align: center;
        }
    }
</style>
