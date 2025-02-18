<script setup lang="ts">
import { defineProps, defineEmits, onMounted, watch } from 'vue';

let current_contact = null;
let self = "danielvici123";

const nachrichten = [
  { username: "lunix", message: "Moin", msg_id: 1, chat_id: 16423 },
  { username: "xbox", message: "Hey, was geht?", msg_id: 2, chat_id: 29874 },
  { username: "danielvici123", message: "Alles gut, und bei dir?", msg_id: 3, chat_id: 29874 },
  { username: "jetbrains", message: "Hat jemand Erfahrung mit IntelliJ?", msg_id: 4, chat_id: 41235 },
  { username: "danielvici123", message: "Ja, was brauchst du?", msg_id: 5, chat_id: 41235 },
  { username: "jetbrains", message: "Wie kann ich Plugins effizient verwalten?", msg_id: 6, chat_id: 41235 }
];

let geladeneNachrichten = [];
const props = defineProps({
  contact: Object
});

const emit = defineEmits(['close']);

function closeChat() {
  emit('close');
}

function openCHAT() {
  geladeneNachrichten = [];
  console.log("Chat geöffnet");
  current_contact = props.contact;
  console.log(current_contact);

  nachrichten.forEach((nachricht) => {
    if (nachricht.username == current_contact.username) {
      geladeneNachrichten.push(nachricht);
    }
  });
  console.log(geladeneNachrichten);
}

onMounted(() => {
  openCHAT();
});

watch(() => props.contact, () => {
  openCHAT();
});
</script>

<template>
  <div class="fixed bottom-0 right-0 m-4 p-4 bg-schwarz text-weiss rounded-lg shadow-lg w-80">
    <div class="flex justify-between items-center bborder-b-2 border-b-grau2">
      <div class="flex">
        <h3 class="text-lg font-bold">{{ contact.display_name }}</h3>
        <a class="px-2">@{{ contact.username }}</a>
      </div>
      <button @click="closeChat" class="text-logo-farbe-rot">X</button>
    </div>
    <div class="mt-2">
      <ul class="space-y-2">
        <li v-for="(msg) in geladeneNachrichten" :key="msg.msg_id">
          <div class="space-x-2">
            <a class="font-bold">{{contact.display_name}}</a>
          </div>
          <div>
            <p>{{ msg.message }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>