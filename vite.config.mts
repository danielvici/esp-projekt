import { defineConfig } from 'npm:vite';
import deno from 'npm:@deno/vite-plugin';
import vue from 'npm:@vitejs/plugin-vue';
import "npm:vue-router@4";

export default defineConfig({
  plugins: [deno(), vue()],
});
