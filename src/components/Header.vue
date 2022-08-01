<template>
    <nav class="navbar">
        <a
            href="#"
            class="navbar-brand"
        >
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png"
                alt="pikachu"
            >
            {{ name }}
        </a>
        <span class="navbar-text text-monospace">v1.0</span>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    setup() {
        return { name: 'Pokastro' }
    }
})
</script>

<style lang="css" scoped>
.navbar img {
    width: 50px;
    height: 50px;
}
</style>