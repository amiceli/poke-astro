<script>
    import { isLoading, pokemon, notFound, pokemon404 } from "./store";
    import PokemonCard from './PokemonCard.svelte'
</script>

<div class="Show text-center">
    <PokemonCard 
            pokemon={$notFound ? $pokemon404 : $pokemon}
            loading={$isLoading}
            notFound={$notFound}
        />
</div>

<style lang="scss" scoped>
    .Show {
        display: inline-block;
        width: 100%;
    }
</style>
