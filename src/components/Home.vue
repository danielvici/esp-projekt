<script setup lang="ts">
import Sidebar from "./home_components/sidebar.vue";
import NiceThings from "./home_components/interesting-hashtags.vue";
import Feed from "./home_components/feed.vue";
import Contacts from "./home_components/contacts.vue";
import Legal from "./home_components/legal.vue";
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