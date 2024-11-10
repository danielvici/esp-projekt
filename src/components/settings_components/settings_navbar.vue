
<script setup lang="ts">
// Funktionen um die Seiten zu öffnen
// home -> app.vue
import router from "../../router";
import { ref, onMounted } from 'vue';

const componentsStatus = ref({});

async function loadComponentsStatus() {
  const response = await fetch('src/components/status.json');
  componentsStatus.value = await response.json();
}

onMounted(() => {
  loadComponentsStatus();
});

function fun_route(destination: string) {
  if (componentsStatus.value[destination] === 'wip') {
    router.push("wip");
  } else {
    switch (destination) {
      case "home":
        router.push("/");
        break;
      case "search":
        router.push("search");
        break;
      case "notifications_components":
        router.push("notifications_components");
        break;
      case "messages":
        router.push("messages");
        break;
      case "accounts":
        router.push("accounts");
        break;
      case "settings":
        router.push("settings");
        break;
      default:
        router.push("/");
        break;
    }
  }
}
</script>

<template>
  <div class="pt-4 border-b-2 border-b-grau2">
    <div class="items-center flex justify-center">
      <img src="../../assets/esp-logo_no_text.png" alt="" class="rounded-lg h-12 w-24 mx-auto" @click="fun_route('home')">
    </div>
    <div class="align-middle space-y-5 pt-3 pl-3 pb-4 font-bold text-xl">
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-lila shadow-2xl rounded-lg" @click="fun_route('home')"><img  class="pr-2" src="../../assets/icons/home.png" alt=""> Home</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-lila shadow-2xl rounded-lg" @click="fun_route('search')"><img class="pr-2" src="../../assets/icons/lupe.png" alt="">Search</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-rot shadow-2xl rounded-lg" @click="fun_route('notifications_components')"><img class="pr-2" src="../../assets/icons/glocke.png" alt="">Notifications</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-rot shadow-2xl rounded-lg" @click="fun_route('messages')"><img class="pr-2" src="../../assets/icons/mail.png" alt="">Messages</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-blau shadow-2xl rounded-lg" @click="fun_route('accounts')"><img class="pr-2" src="../../assets/icons/user.png" alt="">Profile</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-blau shadow-2xl rounded-lg" @click="fun_route('settings')"><img class="pr-2" src="../../assets/icons/zahnrad.png" alt="">Settings</label>
    </div>
  </div>
</template>

<style scoped>

</style>

