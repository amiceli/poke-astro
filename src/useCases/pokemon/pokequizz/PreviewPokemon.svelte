<script lang="ts">
    import { pokemon, tries, found, notFound } from "./store";
</script>

<div class="PreviewPokemon">
    {#if $pokemon !== null}
        <img 
            src={$pokemon.sprite} 
            class="img-fluid rounded-top" 
            alt="..." 
            style="--opacity: {($found || $notFound) ? 0 : (( 5 - $tries) * 5) + 'px'}"
        />
        <br />
        <br />
        <div>
            {#if $tries > 2 || $found}
                {#each $pokemon.types as type, index}
                    <img
                        src={`https://veekun.com/dex/media/types/en/${type}.png`}
                        alt=""
                        class="for--type"
                    />
                    {#if index > 0}
                        &nbsp;
                    {/if}
                {/each}
            {/if}
        </div>    
    {/if} 
</div>

<style scoped lang="scss">
    .PreviewPokemon {
        display: inline-block;

        img {
            vertical-align: middle;

            &:not(.for--type) {
                filter: blur(var(--opacity));
                width: 300px;
            }

            &.for--type {
                height: 50px;
            }
        }
    }
</style>
