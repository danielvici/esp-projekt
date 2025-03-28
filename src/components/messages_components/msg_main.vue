<script setup lang="ts">
import {ref} from "vue";
import Popup_chat from "../home_components/popup_chat.vue";

const nachrichten = ref([
  {id: 1,
  profile_picture: "../../assets/default_pp.png", display_name: "Linux Enjoyer",username: "lunix",
    content:"Moin!",
    type:"message",date: new Date(2024,11,13).toDateString() },
  {id: 2,
    profile_picture: "../../assets/default_pp.png",
    display_name: "XBOX",username: "xbox",
    content: "Hey, was geht?",
    type:"message",date: new Date(2024,9,13).toDateString()},
  {id: 4,// Sollte im feed sein
    profile_picture: "../../assets/default_pp.png",
    display_name: "klopupser13", username: "theopampa",
    content: "ja ok können wir machen",
    type:"following",date: new Date(2025,1,15).toDateString()}
  ]);

const selectedContact = ref(null);
const showChatPopup = ref(false);

function openChat(contact) {
  selectedContact.value = contact;
  showChatPopup.value = true;
}

</script>

<template>
<div class="border-x-grau2 border-x-2">
  <div class="border-b-grau2 border-b-2">
    <h1 class="text-weiss text-3xl p-4">Messages</h1>
  </div>
  <div>
    <ul>
      <li v-for="nachricht in nachrichten" :key="nachricht.id" class="border-b-grau2 border-b-2" @click="openChat(nachricht)">
        <div class="flex p-4">
          <img src="../../assets/default_pp.png" alt="user profile picture" class="rounded-full w-16 h-16">
          <div>
            <div class="flex mb-1">
              <label class="text-lg font-bold sm:m-1 ml-1 text-weiss">{{nachricht.display_name}}</label>
              <label class="text-lg sm:m-1 ml-1 text-grau2">@{{nachricht.username}}</label>
              <label class="sm:m-2  ml-1 text-grau2">{{nachricht.date}}</label>
            </div>
            <a class="ml-1 text-weiss">{{nachricht.content}}</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <popup_chat v-if="showChatPopup" :contact="selectedContact" @close="showChatPopup = false" />
</div>
</template>

<style scoped>

</style>