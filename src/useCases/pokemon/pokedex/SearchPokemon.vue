<template>
    <div class="Search">
        <div class="nes-field">
            <label for="pokemon-name" class="required">Pokemon name</label>
            <input
                type="text"
                v-model="search"
                class="nes-input"
                id="pokemon-name"
                placeholder="Pikachu for example"
                @change="onChange()"
                :disabled="isSearching"
                autocomplete="off"
            >
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import { useStore } from '@nanostores/vue'
import { loadPokemon, isLoading } from './store'

export default defineComponent({
    setup(props) {
        const search = ref('')
        const isSearching = useStore(isLoading)

        const onChange = () => {
            if (search.value.length > 0) {
                const upper = (search.value).charAt(0).toUpperCase() + (search.value).slice(1)

                loadPokemon(upper)
            }
        }

        return { search, onChange, isSearching }
    }
})

</script>

<style scoped lang="scss">
    .Search {
        width: 100%;

        .nes-field {
            text-align: left;
        }
    }
</style>