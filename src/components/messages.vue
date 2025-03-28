<script setup>

import Contacts from "./home_components/contacts.vue";
import Feed from "./home_components/feed.vue";
import Legal from "./home_components/legal.vue";
import Navigationbar from "./home_components/navigationbar.vue";
import Msg_main from "./messages_components/msg_main.vue";
</script>

<template>
  <div id="main" class=" sm:flex">
    <div id="left" class="sm:w-72 min-w-72">
      <navigationbar></navigationbar>
    </div>
    <div class="w-100p">
      <msg_main></msg_main>
    </div>
    <div class="sm:w-1/4">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>

</style>