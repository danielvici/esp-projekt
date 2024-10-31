
<script setup lang="ts">
// Funktionen um die Seiten zu öffnen
// home -> app.vue
const sb_home = () => {
  console.log("home");
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
  <div class="pt-4 pl-1">
    <img src="@/assets/esp-logo_no_text.png" alt="" class="rounded-lg h-12 w-24">
    <div class="align-middle space-y-3 pt-3 pl-3">
      <img src="@/assets/icons/home-black.png" alt="" class="hover:bg-logo-farbe-lila shadow-2xl rounded-lg" v-on:click="sb_home">
      <img src="@/assets/icons/lupe.png" alt="" class="hover:bg-logo-farbe-lila shadow-2xl rounded-lg" v-on:click="sb_search">
      <img src="@/assets/icons/glocke.png" alt="" class="hover:bg-logo-farbe-rot shadow-2xl rounded-lg" v-on:click="sb_notifications">
      <img src="@/assets/icons/mail.png" alt="" class="hover:bg-logo-farbe-rot shadow-2xl rounded-lg" v-on:click="sb_messages">
      <img src="@/assets/icons/user.png" alt="" class="hover:bg-logo-farbe-blau shadow-2xl rounded-lg"  v-on:click="sb_accounts">
      <img src="@/assets/icons/zahnrad.png" alt="" class="hover:bg-logo-farbe-blau shadow-2xl rounded-lg" v-on:click="sb_settings">
    </div>
  </div>
</template>

<style scoped>

</style>