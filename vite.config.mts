//@ts-ignore
import { defineConfig } from 'npm:vite'
//@ts-ignore
import deno from 'npm:@deno/vite-plugin'
//@ts-ignore
import vue from 'npm:@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno(), vue()],
})
