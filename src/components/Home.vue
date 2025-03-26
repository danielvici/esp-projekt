<script setup lang="ts">
import Feed from "./home_components/feed.vue";
import Contacts from "./home_components/contacts.vue";
import Legal from "./home_components/legal.vue";
import Navigationbar from "./home_components/navigationbar.vue";
import Trending from "./home_components/trending.vue";
</script>


<template>
  <div id="main" class="sm:flex overflow-y-auto h-screen scrollbar">
    <div id="left" class="sm:w-72 min-w-72">
      <navigationbar></navigationbar>
    </div>
    <div class="sm:w-100p w-screen">
      <feed></feed>
    </div>
    <div class="sm:w-1/4 w-screen">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>