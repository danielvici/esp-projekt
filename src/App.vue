<script setup lang="ts">
import Sidebar from "../src/components/sidebar.vue";
import NiceThings from "../src/components/interesting-hashtags.vue";
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