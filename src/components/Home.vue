<script setup lang="ts">
import Feed from "./home_components/feed.vue";
import Contacts from "./home_components/contacts.vue";
import Legal from "./home_components/legal.vue";
import Navigationbar from "./home_components/navigationbar.vue";
import Trending from "./home_components/trending.vue";
</script>


<template>
  <div id="main" class="flex md:flex-col">
    <div id="left" class="w-72 min-w-72 md:full">
      <navigationbar></navigationbar>
    </div>
    <div class="w-100p sm:w-screen">
      <feed></feed>
    </div>
    <div class="w-1/4 sm:w-screen">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>