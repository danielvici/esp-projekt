<script setup>

import Navigationbar from "./home_components/navigationbar.vue";
import Contacts from "./home_components/contacts.vue";
import Legal from "./home_components/legal.vue";
import Profile_main from "./profile_components/profile_main.vue";
</script>

<template>
  <div id="main" class="bg-hintergrund-farbe sm:flex overflow-visible scrollbar sm:overflow-y-auto sm:h-full sm:scrollbar">
    <div id="left" class="sm:w-72 min-w-72">
      <navigationbar></navigationbar>
    </div>
    <div class="sm:w-100p w-screen sm:border-x sm:border-x-grau2">
      <profile_main></profile_main>
    </div>
    <div id="right" class="sm:w-1/4 w-screen">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>