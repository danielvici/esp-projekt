<script setup>
import Legal from "./home_components/legal.vue";
import Navigationbar from "./home_components/navigationbar.vue";
import Notifi_comp from "./notifications_components/notifi_main.vue";
import Contacts from "./home_components/contacts.vue";

</script>

<template>
  <div class="text-weiss sm:flex">
    <div id="left" class="border-1 border-b-grau sm:w-72 min-w-72">
      <navigationbar></navigationbar>
    </div>
    <div class="w-100p border-x-2 border-x-grau2">
      <notifi_comp></notifi_comp>
    </div>
    <div class="sm:w-1/4">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>