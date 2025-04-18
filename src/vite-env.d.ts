/// <reference types="vite/client" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

declare module '*.vue' {
  //@ts-ignore
  import type { DefineComponent } from 'npm:vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

