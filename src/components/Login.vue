<script setup>

import Legal from "./home_components/legal.vue";
import Sidebar from "./home_components/navigationbar.vue";
import Contacts from "./home_components/contacts.vue";
</script>

<template>
  <div id="main" class="bg-weiss flex p-2">
    <Sidebar></Sidebar>
    <p class="text-4xl m-60">WIP</p>
    <div class="w-1/4">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>