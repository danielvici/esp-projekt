<script setup>

import Legal from "./home_components/legal.vue";
import Login_comp from "./login_components/login_comp.vue";
import router from "../router";

function route_home() {
  router.push("/");
}

</script>

<template>
  <div id="main" class="bg-hintergrund-farbe sm:flex sm:p-2 sm:justify-between ">
    <div class="pt-5 pl-2">
      <img src="../assets/esp-logo_no_text.png" alt="" class=" rounded-lg h-12 w-24 hover:shadow-2xl hover:shadow-grau-dunkel" @click="route_home">
    </div>
    <login_comp class="inset-0"></login_comp>
    <div class="md:inset-y-0 sm:right-0  sm:max-w-36 text-center">
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>