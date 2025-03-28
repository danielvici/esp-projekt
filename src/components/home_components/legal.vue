<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

function gotop() {
  location.reload();
  console.log("PARAMS: "+ route.path);
  console.log("Zum Seitenanfang gescrollt");
}
</script>

<template>
  <div class="text-grau2 p-3 text-center">
    <a href="">Terms of Service</a>
    -
    <a href="">Privacy Policy</a><br>

    <a href="">Imprint</a>
    -
    <a href="https://esp-projekt.notion.site/191fb990f26c808298dad302e97fb299?pvs=105">Contact</a>
    -
    <a href="https://esp-projekt.notion.site/191fb990f26c808298dad302e97fb299?pvs=105">Support</a>
    -
    <a href="https://icons8.com"> Icons by icons8.com</a>

    <div class="sm:hidden flex justify-center pt-8"><button class="text-weiss p-1 m-2 rounded-lg py-3 px-5 bg-button-farbe transition duration-300 ease-in-out" @click="gotop">Back to Top</button></div>

  </div>
</template>

<style scoped>

</style>