<script setup>

import Contacts from "./home_components/contacts.vue";
import Feed from "./home_components/feed.vue";
import Legal from "./home_components/legal.vue";
import Navigationbar from "./home_components/navigationbar.vue";
import Msg_main from "./messages_components/msg_main.vue";
</script>

<template>
  <div id="main" class=" flex">
    <div id="left" class="w-72">
      <navigationbar></navigationbar>
    </div>
    <div class="w-100p">
      <msg_main></msg_main>
    </div>
    <div class="w-1/4">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>