import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import svelte from "@astrojs/svelte";
import lit from "@astrojs/lit";

import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), svelte(), lit(), solid()]
});