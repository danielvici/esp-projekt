<script setup>
import Legal from "./home_components/legal.vue";
import Register_main from "./register_components/register_main.vue";
import router from "../router";

function route_home() {
  router.push("/");
}
</script>

<template>
  <div id="main" class="bg-hintergrund-farbe sm:flex p-2 sm:justify-between overflow-auto h-screen scrollbar">
    <div class="pt-5">
      <img src="../assets/esp-logo_no_text.png" alt="" class="rounded-lg h-12 w-24 hover:shadow-2xl hover:shadow-grau-dunkel" @click="route_home">
    </div>
    <register_main class="sm:inset-0"></register_main>
    <div class="sm:inset-y-0 sm:right-0 sw:max-w-36 text-center">
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>