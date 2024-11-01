<script setup lang="ts">
import Feed from "./home_components/feed.vue";
import Contacts from "./home_components/contacts.vue";
import Legal from "./home_components/legal.vue";
import Navigationbar from "./home_components/navigationbar.vue";
import Trending from "./home_components/trending.vue";
</script>


<template>
  <div id="main" class="bg-hintergrund-farbe flex">
    <div id="left" class="border border-b-grau w-72">
      <navigationbar></navigationbar>
      <trending></trending>
    </div>
    <div class="w-100p">
      <feed></feed>
    </div>
    <div class="w-1/4">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>