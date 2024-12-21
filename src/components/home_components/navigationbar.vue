
<script setup lang="ts">
// home -> app.vue
// PLACEHOLDER
import router from "../../router";
import { ref, onMounted } from 'vue';

const componentsStatus = ref({});
const selected_destination = ref('');

async function loadComponentsStatus() {
  const response = await fetch('src/components/status.json');
  componentsStatus.value = await response.json();
}

onMounted(() => {
  loadComponentsStatus();
});

function fun_route(destination: string) {
  selected_destination.value = destination;
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
      case "notifications":
        router.push("notifications");
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
  <div class="pt-4 border-b-2 border-b-grau2 border-r-1 border-r-grau2">
    <div class="items-center flex justify-center"><!-- BILD-->
      <img src="../../assets/esp-logo_no_text.png" alt="" class="rounded-lg h-12 w-24 mx-auto" @click="fun_route('home')">
    </div>
    <div class="align-middle space-y-3 pt-4 pl-3 pb-4 pr-4 font-bold text-xl"> <!-- Icons (Bild) und Text                                  Damit der Text weiß ist muss zwei mal gedrückt werden manchmal-->
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-lila rounded-lg" @click="fun_route('home')"          :class="{'text-weiss': selected_destination === 'home' || selected_destination === ''}"><img class="mr-2 p-1 bg-logo-farbe-lila rounded-lg" src="../../assets/icons/home.png" alt=""> Home</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-lila rounded-lg" @click="fun_route('search')"        :class="{'text-weiss': selected_destination === 'search'}">                             <img class="mr-2 p-1 bg-logo-farbe-lila rounded-lg" src="../../assets/icons/lupe.png" alt="">Search</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-rot  rounded-lg" @click="fun_route('notifications')" :class="{'text-weiss': selected_destination === 'notifications'}">                      <img class="mr-2 p-1 bg-logo-farbe-rot  rounded-lg" src="../../assets/icons/glocke.png" alt="">Notifications</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-rot  rounded-lg" @click="fun_route('messages')"      :class="{'text-weiss': selected_destination === 'messages'}">                           <img class="mr-2 p-1 bg-logo-farbe-rot  rounded-lg" src="../../assets/icons/mail.png" alt="">Messages</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-blau rounded-lg" @click="fun_route('accounts')"      :class="{'text-weiss': selected_destination === 'accounts'}">                           <img class="mr-2 p-1 bg-logo-farbe-blau rounded-lg" src="../../assets/icons/user.png" alt="">Profile</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-blau rounded-lg" @click="fun_route('settings')"      :class="{'text-weiss': selected_destination === 'settings'}">                           <img class="mr-2 p-1 bg-logo-farbe-blau rounded-lg" src="../../assets/icons/zahnrad.png" alt="">Settings</label>
    </div>
  </div>
</template>

<style scoped>

</style>

