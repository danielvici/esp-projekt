<script setup lang="ts">
import {defineProps, defineEmits, onMounted, watch, ref} from 'vue';
import { nextTick } from 'vue';

let current_contact = null;
let self = "danielvici123";

const nachrichten = [
  { display_name: "Linux Enjoyer", username: "lunix", message: "Moin", msg_id: 1, chat_id: 16423 },
  { display_name: "XBOX",username: "xbox", message: "Hey, was geht?", msg_id: 2, chat_id: 29874 },
  { display_name: "danielvici223", username: "danielvici123", message: "Alles gut, und bei dir?", msg_id: 3, chat_id: 29874 },
  { display_name: "JETBrains",username: "jetbrains", message: "Hat jemand Erfahrung mit IntelliJ?", msg_id: 4, chat_id: 41235 },
  { display_name: "danielvici223",username: "danielvici123", message: "Ja, was brauchst du?", msg_id: 5, chat_id: 41235 },
  { display_name: "JETBrains",username: "jetbrains", message: "Wie kann ich Plugins effizient verwalten?", msg_id: 6, chat_id: 41235 },
  { display_name: "klopupser13", username: "theopampa", message: "ja ok können wir machen", msg_id: 7, chat_id: 41245 },
  { display_name: "danielvici223",username: "danielvici123", message: "willst du fornite", msg_id: 7, chat_id: 41245 },
];

let geladeneNachrichten = ref([]);
const send_message = ref("");
const props = defineProps({
  contact: Object
});

const emit = defineEmits(['close']);

function closeChat() {
  emit('close');
}

function openCHAT() {
  geladeneNachrichten.value = [];
  console.log("Chat geöffnet");

  // conact ist null dann abruch
  if(!props.contact) return;

  // contact ist der aktuelle kontakt
  current_contact = props.contact ? { ...props.contact } : null;
  console.log(current_contact);

  /*nachrichten.forEach((nachricht) => {
    if ((nachricht.username == current_contact.username || nachricht.username == self) && nachricht.chat_id == current_contact.chat_id) {
      geladeneNachrichten.value.push(nachricht);
    }
  });
  */
  geladeneNachrichten.value = nachrichten.filter((nachricht) => {
    console.log(`Nachricht von ${nachricht.username} mit Chat-ID ${nachricht.chat_id}`);
    return (
        (nachricht.username === current_contact.username || nachricht.username === self) &&
        nachricht.chat_id == current_contact.chat_id
    );
  });
  console.log("Nach dem Filtern:", geladeneNachrichten.value);



  console.log(geladeneNachrichten);
}

function sendMessage(event){
  event.preventDefault();
  // API nachricht senden
  console.log("Nachricht gesendet")
}

onMounted(() => {
  openCHAT();
  console.log("Current Contact:", current_contact);

});

watch(() => props.contact, () => {
  openCHAT();
  console.log("Current Contact:", current_contact);

});
</script>

<template>
  <div class="fixed bottom-0 right-0 m-3 p-4 bg-schwarz text-weiss rounded-lg shadow-lg w-80">
    <div class="flex justify-between items-center bborder-b-2 border-b-grau2">
      <div class="flex">
        <h3 class="text-lg font-bold">{{ contact.display_name }}</h3>
        <a class="px-2">@{{ contact.username }}</a>
      </div>
      <button @click="closeChat"><img src="../../assets/icons/x-klein.png" alt=""></button>
    </div>
    <div class="mt-2">
      <ul class="space-y-2">
        <li v-for="(msg) in geladeneNachrichten" :key="msg.msg_id || msg.id">
          <div class="space-x-2">
            <a class="font-bold">{{ msg.display_name }}</a>
          </div>
          <div>
            <p>{{ msg.message }}</p>
          </div>
        </li>
      </ul>
      <div>
        <form class="flex mt-4" @submit="sendMessage">
          <label><input v-model="send_message" class="bg-schwarz outline-none border-b-2 mt-2 py-2 px-1" placeholder="Message"></label>
          <button type="submit"><img src="../../assets/icons/send.png" alt="senden" class="ml-4 mt-1"></button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>