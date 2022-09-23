<template>
    <div class="Search">
        <div class="form-group">
            <label
                for="pokemon-name"
                class="required"
            >Pokemon name</label>
            <input
                type="text"
                v-model="search"
                class="form-control"
                id="pokemon-name"
                placeholder="Pikachu for example"
                @change="onChange()"
                :disabled="isSearching"
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
                loadPokemon(search.value)
            }
        }

        return { search, onChange, isSearching }
    }
})

</script>

<style scoped>
.Search {
    width: 100%;
}
</style>