<script setup>

import Quick_search from "./home_components/quick_search.vue";
import Navigationbar from "./home_components/navigationbar.vue";
import Legal from "./home_components/legal.vue";
import Search_main from "./search_components/search_main.vue";
import Contacts from "./home_components/contacts.vue";
</script>

<template>
  <div class="text-weiss flex">
    <div id="left" class="border-1 border-b-grau w-72">
      <navigationbar></navigationbar>
    </div>
    <div class="w-100p border-x-2 border-x-grau2">
      <div class="border-b-grau2 border-b-2">
        <h1 class="text-weiss text-3xl p-4">Search</h1>
      </div>
      <search_main></search_main>
    </div>
    <div class="w-1/4">
      <quick_search></quick_search>
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>