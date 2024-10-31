import { defineConfig } from 'vite';
import deno from 'npm:@deno/vite-plugin';
import vue from 'npm:@vitejs/plugin-vue';

// Vite configuration
export default defineConfig({
  plugins: [deno(), vue()],
});