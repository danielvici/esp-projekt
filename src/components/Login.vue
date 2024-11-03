<script setup>

import Legal from "./home_components/legal.vue";
import Login_comp from "./login_components/login_comp.vue";
</script>

<template>
  <div id="main" class="bg-hintergrund-farbe flex p-2 ">
    <div class="items-center pr-96 pl-2 pt-5">
      <img src="../assets/esp-logo_no_text.png" alt="" class="rounded-lg h-12 w-24 mx-auto">
    </div>
      <login_comp></login_comp>
    <div class="p-5 ">
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>