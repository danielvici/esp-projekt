/// <reference lib="deno.ns" />
import './assets/main.css';
import { createApp } from 'vue';
// @ts-ignore: 
import App from '../src/App.vue';
// @ts-ignore: 
import router from "./router/index.ts";

const app = createApp(App);
app.use(router);
app.mount('#app');