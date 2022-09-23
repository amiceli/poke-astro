<script>
    import { isLoading, pokemon, notFound } from "./store";
</script>

<div class="Show">
    <div class="w-400 mw-full">
        <div class="card p-0">
            {#if $pokemon === null}
                <div class="is--tac">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1024px-Pok%C3%A9_Ball_icon.svg.png"
                        class="img-fluid rounded-top"
                        alt="..."
                    />
                </div>
            {:else}
                <div class="is--tac">
                    <img
                        src={$pokemon.sprite}
                        class="img-fluid rounded-top"
                        alt="..."
                    />
                </div>
            {/if}

            <div class="content">
                <h2 class="content-title">
                    {#if $isLoading}
                        loading...
                    {:else if $pokemon === null && $notFound === true}
                        Pokémon Not found !
                    {:else if $pokemon === null && $notFound === false}
                        <div class="is--tac">Start to search</div>
                    {:else}
                        {$pokemon.name}
                    {/if}
                </h2>
                {#if $isLoading === false && $pokemon !== null}
                    <p class="text-muted">
                        Order : {$pokemon.order} <br />
                        Types : {$pokemon.types} <br />
                    </p>
                    <div class="text-right">
                        <a
                            href="https://veekun.com/dex/pokemon/{$pokemon.name}"
                            class="btn"
                        >
                            Read more
                        </a>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .Show {
        display: inline-block;
    }
    .Show h2 {
        margin: 0;
    }
    .Show .is--tac {
        text-align: center;
        padding-top: 10px;
    }
    .Show img {
        height: 100px;
        margin: auto;
    }
</style>
