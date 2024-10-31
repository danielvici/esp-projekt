<script setup lang="ts">
import Sidebar from "@/components/sidebar.vue";
import NiceThings from "@/components/interesting-hashtags.vue";
import Feed from "@/components/feed.vue";
import Contacts from "@/components/contacts.vue";
import Legal from "components/legal.vue";
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