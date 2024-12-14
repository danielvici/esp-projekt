<script setup>
import Legal from "./home_components/legal.vue";
import Navigationbar from "./home_components/navigationbar.vue";
import Notifi_comp from "./notifications_components/notifi_main.vue";
import Notif_sidebar from "./notifications_components/notif_sidebar.vue";
import Quick_search from "./home_components/quick_search.vue";

</script>

<template>
  <div class="text-weiss flex">
    <div id="left" class="border-1 border-b-grau w-72">
      <navigationbar></navigationbar>
    </div>
    <div class="w-100p border-x-2 border-x-grau2">
      <div class="border-b-grau2 border-b-2">
        <h1 class="text-weiss text-3xl p-4">Notifications</h1>
      </div>
      <notifi_comp></notifi_comp>
    </div>
    <div class="w-1/4">
      <quick_search></quick_search>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>