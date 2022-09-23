<script lang="ts">
    import { pokemon, tries, found, notFound } from "./store";

    const getPokemonTypesURL = () : string [] => {
        if (pokemon.get()) {
            return [...new Set(pokemon.get().types)].map((type : string) => {
                const typeName = type.charAt(0).toUpperCase() + type.slice(1)
                console.debug(typeName)

                return `https://duiker101.github.io/pokemon-type-svg-icons/icons/${type}.svg`
            })
        }

        return []
    }
</script>

<div class="PreviewPokemon">
    {#if $pokemon !== null}
        <img 
            src={$pokemon.sprite} 
            class="img-fluid rounded-top" 
            alt="..." 
            style="--opacity: {($found || $notFound) ? 0 : (( 5 - $tries) * 5) + 'px'}"
        />
        {#if $tries > 2}
            {#each getPokemonTypesURL() as src}
                <img {src} alt="" class="is--small" />
            {/each}
        {/if}    
    {/if} 
</div>

<style scoped lang="scss">
    .PreviewPokemon {
        display: inline-block;

        img {
            vertical-align: middle;

            &:not(.is-small) {
                filter: blur(var(--opacity));
            }

            &.is--small {
                width: 50px;

                &:last-of-type {
                    margin-left: 20px;
                }
            }
        }
    }
</style>
