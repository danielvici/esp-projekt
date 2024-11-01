
<script setup lang="ts">
// Funktionen um die Seiten zu öffnen
// home -> app.vue
import router from "../../router";

const sb_home = () => {
  console.log("home");
  router.push("/");
}
const sb_search = () => {
  console.log("Search");
}
const sb_notifications = () => {
  console.log("Notifications");
}
const sb_messages = () => {
  console.log("Messages");
}
const sb_accounts = () => {
  console.log("Accounts");
}
const sb_settings = () => {
  console.log("Settings");
}

</script>

<template>
  <div class="pt-4 border-b-2 border-b-grau2">
    <div class="items-center flex justify-center">
      <img src="../../assets/esp-logo_no_text.png" alt="" class="rounded-lg h-12 w-24 mx-auto" @click="sb_home">
    </div>
    <div class="align-middle space-y-3 pt-3 pl-3 pb-4 font-bold text-xl">
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-lila shadow-2xl rounded-lg" @click="sb_home"><img  class="pr-2" src="../../assets/icons/home.png" alt=""> Home</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-lila shadow-2xl rounded-lg" @click="sb_search"><img class="pr-2" src="../../assets/icons/lupe.png" alt="">Search</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-rot shadow-2xl rounded-lg" @click="sb_notifications"><img class="pr-2" src="../../assets/icons/glocke.png" alt="">Notifications</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-rot shadow-2xl rounded-lg" @click="sb_messages"><img class="pr-2" src="../../assets/icons/mail.png" alt="">Messages</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-blau shadow-2xl rounded-lg" @click="sb_accounts"><img class="pr-2" src="../../assets/icons/user.png" alt="">Profile</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-blau shadow-2xl rounded-lg" @click="sb_settings"><img class="pr-2" src="../../assets/icons/zahnrad.png" alt="">Settings</label>
    </div>
  </div>
</template>

<style scoped>

</style>

