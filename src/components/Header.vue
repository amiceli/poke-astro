<template>
    <nav class="navbar">
        <a href="#" class="navbar-brand">
            <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png"
                alt="pikachu"
            />
            {{ name }}
        </a>
        <span class="navbar-text text-monospace">v1.0</span>
        <ul class="navbar-nav d-none d-md-flex">
            <li class="nav-item active">
                <a href="/quizz" class="nav-link">
                    PokéQuizz
                </a>
            </li>
            <li class="nav-item">
                <a href="/" class="nav-link">
                    Pokédex light
                </a>
            </li>
        </ul>
        <div class=" d-md-flex ml-auto">
            <FlagsChooser />
        </div>
    </nav>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import FlagsChooser from '../useCases/changeLang/FlagsChooser.vue'

    export default defineComponent({
        components: { FlagsChooser },
        setup() {
            return { name: 'Pokastro' }
        }
    })
</script>

<style lang="scss" scoped>
    .navbar img {
        width: 50px;
        height: 50px;
    }

    .navbar {
        .d-md-flex {
            margin-right: 20px;
        }
    }
</style>