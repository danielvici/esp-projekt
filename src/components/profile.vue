<script setup>

import Navigationbar from "./home_components/navigationbar.vue";
import Contacts from "./home_components/contacts.vue";
import Legal from "./home_components/legal.vue";
import Profile_main from "./profile_components/profile_main.vue";
</script>

<template>
  <div id="main" class="bg-hintergrund-farbe flex">
    <div id="left" class="w-72">
      <navigationbar></navigationbar>
    </div>
    <div class="w-100p border-x border-x-grau2">
      <profile_main></profile_main>
    </div>
    <div id="right" class="w-1/4">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>