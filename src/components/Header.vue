<template>
    <nav class="Header">
        <a href="#">
            <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png"
                alt="pikachu" 
            />
            <span class="nes-text is-success">{{ name }}</span>
        </a>
        <span class="nes-text is-disabled">v1.0</span>
        <div class="Header__links">
            <a 
                href="/quizz" 
                class="nav-link"
            >
                <span class="nes-text is-primary">PokéQuizz</span>
            </a>
            <a href="/" class="nav-link">
                <span class="nes-text is-primary">Pokédex light</span>
            </a>
            <a href="/labo" class="nav-link">
                <span class="nes-text is-primary">PokéLabo</span>
            </a>
        </div>
        <div class="Header__flags">
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
.Header {
    width: 100%;
    border-bottom: 4px solid #D3D3D3;
    height: 70px;
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    box-sizing: border-box;

    &__links {
        display: flex;

        a {
            padding-right: 10px;
            text-decoration-color: #209cee;
        }
    }

    a {
        display: flex;
        align-items: center;
        color: white;

        img {
            height: 60px;
        }
    }

    a+span {
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
    }

    ul {
        a {
            color: red;
        }
    }
}
</style>