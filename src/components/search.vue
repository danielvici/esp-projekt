<script setup>


import Navigationbar from "./home_components/navigationbar.vue";
import Legal from "./home_components/legal.vue";
import Search_main from "./search_components/search_main.vue";
import Contacts from "./home_components/contacts.vue";
</script>

<template>
  <div class="text-weiss sm:flex">
    <div id="left" class="sm:w-72 sm:min-w-72 border-1 border-b-grau">
      <navigationbar></navigationbar>
    </div>
    <div class="sm:w-100p w-screen border-x-2 border-x-grau2">
      <div class="border-b-grau2 border-b-2">
        <h1 class="text-weiss text-3xl p-4">Search</h1>
      </div>
      <search_main></search_main>
    </div>
    <div class="sm:w-1/4">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>