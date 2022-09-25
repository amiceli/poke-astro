<script>
    import { isLoading, pokemon, notFound, pokemon404 } from "./store";
    import { lang } from "../../changeLang/store";
    import { Loader } from '../../../components/Loader'
</script>

<div class="Show">
    <div 
        class="Show__card"
        class:is--loading={$isLoading}
        class:is--wating={$pokemon === null && !$notFound}
    >
        {#if $isLoading}
            <x-loader></x-loader>
        {:else if $pokemon === null && !$notFound}
            ?
        {:else if $pokemon !== null}
            <div class="Show__card__pokemon">
                <div class="text-center">
                    <img
                        src={$pokemon.sprite}
                        class="img-fluid rounded-top"
                        alt="..."
                    />
                    <br />
                    {#if $lang === 'fr'}
                        <h3>{$pokemon.frName}</h3>
                    {:else}
                        {$pokemon.name}
                    {/if}
                    {#each $pokemon.types as type, index}
                        {type} 
                        {#if index > 0}
                            &nbsp;
                        {/if}
                    {/each}
                </div>
            </div>
            <div class="for--order">
                #{$pokemon.order}
            </div>
        {:else if $notFound === true}
            <div class="Show__card__pokemon">
                <div class="text-center">
                    <img
                        src={$pokemon404.sprite}
                        class="img-fluid rounded-top"
                        alt="..."
                    />
                    <br />
                    {#if $lang === 'fr'}
                        <h3>{$pokemon404.frName}</h3>
                    {:else}
                        {$pokemon404.name}
                    {/if}
                    {#each $pokemon404.types as type, index}
                        {type} 
                        {#if index > 0}
                            &nbsp;
                        {/if}
                    {/each}
                </div>
            </div>
            <div class="for--order">
                #{$pokemon404.id} (not found ^^)
            </div>
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

        &__card {
            width: 300px;
            height: 400px;
            border : 1px white solid;
            margin-left: auto;
            margin-right: auto;
            padding: 20px;
            position: relative;

            &__pokemon {
                img {
                    width: 150px;
                }
            }

            .for--order {
                position: absolute;
                right: 10px;
                bottom: 10px;
                font-size: 20px;
            }

            &.is--loading {
                @include flexCenter();
            }

            &.is--wating {
                @include flexCenter();

                font-size: 100px;
            }
        }
    }
</style>
