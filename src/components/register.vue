<script setup>
import Legal from "./home_components/legal.vue";
import Register_main from "./register_components/register_main.vue";
import router from "../router";

function route_home() {
  router.push("/");
}
</script>

<template>
  <div id="main" class="bg-hintergrund-farbe flex p-2 justify-between">
    <div class="pt-5">
      <img src="../assets/esp-logo_no_text.png" alt="" class="rounded-lg h-12 w-24 hover:shadow-2xl hover:shadow-grau-dunkel" @click="route_home">
    </div>
    <register_main class="inset-0"></register_main>
    <div class="inset-y-0 right-0 max-w-36">
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>