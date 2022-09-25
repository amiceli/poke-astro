<script>
    import { isLoading, pokemon, notFound, pokemon404 } from "./store";
    import { lang } from "../../changeLang/store";
    import { Loader } from '../../../components/Loader'
</script>

<div class="Show">
    <div 
        class="nes-container is-dark with-title"
        class:is--loading={$isLoading}
        class:is--wating={$pokemon === null && !$notFound}
    >
        <p class="title">

            {#if $isLoading}
                loading
            {:else if $pokemon === null && !$notFound}
                waiting
            {:else if $notFound === true}
                <a
                    href="https://veekun.com/dex/pokemon/{$pokemon404.name}"
                    target="_blank"
                >
                    { $lang === 'fr' ? $pokemon404.frName : $pokemon404.name}
                </a>
            {:else if $pokemon !== null}
                <a
                    href="https://veekun.com/dex/pokemon/{$pokemon.name}"
                    target="_blank"
                >
                    { $lang === 'fr' ? $pokemon.frName : $pokemon.name}
                </a>
            {/if}

        </p>

        {#if $isLoading}
            <x-loader></x-loader>
        {:else if $pokemon === null && !$notFound}
            <span class="for--search">?</span>
        {:else if $pokemon !== null}
            <div class="text-center">
                <img
                    src={$pokemon.sprite}
                    class="img-fluid rounded-top"
                    alt="..."
                />
            </div>
            <br/>
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
            <span class="nes-text is-disabled for--order">
                #{$pokemon.id}
            </span>
        {:else if $notFound === true}
            <img
                src={$pokemon404.sprite}
                class="img-fluid rounded-top"
                alt="..."
            />
            {#each $pokemon404.types as type, index}
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
</div>

<style lang="scss" scoped>
    .Show {
        display: inline-block;
        width: 100%;

        @mixin flexCenter () {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .for--search {
            font-size: 100px;
        }

        .nes-container {
            position: relative;
            width: 500px;
            margin-left: auto;
            margin-right: auto;

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
    }
</style>
