<template>
    <div class="dropdown">
        <button
            class="btn"
            data-toggle="dropdown"
            type="button"
            id="dropdown-toggle-btn-1"
            aria-haspopup="false"
            aria-expanded="false"
        >
            Choose a lang
        </button>
        <div
            class="dropdown-menu"
            aria-labelledby="dropdown-toggle-btn-1"
        >
            <span class="dropdown-item" data-toggle="dropdown">
                <span class="fi fi-fr"></span> &nbsp;
                French
            </span>
            <span class="dropdown-item">
                <span class="fi fi-gb"></span> &nbsp;
                English
            </span>
            <span class="dropdown-item">
                <span class="fi fi-es"></span> &nbsp;
                Spanish
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({

})
</script>