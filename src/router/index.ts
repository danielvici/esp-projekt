import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    }
]

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

export default router;

/*
<script setup lang="ts">
import Sidebar from "../src/components/navigationbar.vue";
import NiceThings from "../src/components/trending.vue";
import Feed from "../src/components/feed.vue";
import Contacts from "../src/components/contacts.vue";
import Legal from "../src/components/legal.vue";
</script>


<template>
  <div id="main" class="bg-weiss flex p-2">
    <Sidebar></Sidebar>
    <nice-things></nice-things>
    <feed></feed>
    <div class="w-1/4">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>
 */