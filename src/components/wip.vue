<script setup>
import Navigationbar from "./home_components/navigationbar.vue";
import Feed from "./home_components/feed.vue";
import Contacts from "./home_components/contacts.vue";
import Legal from "./home_components/legal.vue";
import Trending from "./home_components/trending.vue";
import QuickSearch from "./home_components/quick_search.vue";
</script>

<template>
  <div id="main" class="bg-hintergrund-farbe flex">
    <div id="left" class="w-72">
      <navigationbar></navigationbar>
    </div>
  </div>
</template>

<style scoped>

</style>