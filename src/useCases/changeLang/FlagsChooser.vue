<template>
    <div class="FlagChooser">
        <span 
            class="FlagChooser__flag" 
            :class="$lang === 'fr' ? 'is--selected' : ''"
            @click="changeLang('fr')"
        >
            <span class="fi fi-fr"></span>
        </span>
        &nbsp;
        <span 
            class="FlagChooser__flag" 
            :class="$lang === 'en' ? 'is--selected' : ''"
            @click="changeLang('en')"
        >
            <span class="fi fi-gb"></span>
        </span>
    </div>
</template>

<script lang="ts" setup>
    import { useStore } from '@nanostores/vue'
    import { lang, changeLang, initLang } from './store'

    initLang()

    const $lang = useStore(lang)
</script>

<style lang="scss" scoped>
    .FlagChooser {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding-right: 30px;

        &__flag {
            padding: 10px;
            cursor: pointer;

            &.is--selected {
                border: 1px rgba(255, 255, 255, 0.2) solid;
                border-radius : 4px;
            }
        }
    }
</style>