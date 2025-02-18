<script setup lang="ts">
import { ref } from 'vue';
import Popup_chat from "./popup_chat.vue";

const contacts = [
  { display_name: "Linux Enjoyer", username: "lunix" },
  { display_name: "XBOX", username: "xbox" },
  { display_name: "JETBrains", username: "jetbrains" },
];

const selectedContact = ref(null);
const showChatPopup = ref(false);

function openChat(contact) {
  selectedContact.value = contact;
  showChatPopup.value = true;
}
</script>

<template>
  <div class="p-2 border-b-2 border-b-grau2"> <!--MAIN-->
    <div> <!--HEADER-->
      <h2 class="align-middle m-2 text-xl p-1 pb-4 text-weiss">Contacts</h2>
    </div>
    <div> <!--CONTENT-->
      <ul class="space-y-1">
        <li v-for="(contact) in contacts" :key="contact.username" @click="openChat(contact)" class="flex rounded-lg p-2 cursor-pointer">
          <!--CONTACT-->
          <img src="../../assets/default_pp.png" alt="" class="w-12 h-12 mr-2"> <!--PROFILBILD-->
          <div class="">
            <label class="font-bold m-1 text-weiss">{{ contact.display_name }}</label><br> <!-- display name-->
            <p class="text-base m-1 text-grau2 underline-offset-3">@{{ contact.username }}</p> <!-- username-->
          </div>
        </li>
      </ul>
    </div>
    <popup_chat v-if="showChatPopup" :contact="selectedContact" @close="showChatPopup = false" />
  </div>
</template>

<style scoped>
</style>