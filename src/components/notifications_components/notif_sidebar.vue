<!---WIRD NICHT MEHR BENTUTZ ABER VIELLEICHT SPÄTER IRGENDWAN WICHTIG -->
<script setup lang="ts">
import { ref } from 'vue';
import router from "../../router";

const componentsStatus = ref({});
const selected_destination = ref('');

const props = defineProps({
  selectedNotification: String
});

const selectedNotification = ref('');

function handleUpdateNotification(setting: string) {
  selectedNotification.value = setting;
}

function fun_route(destination: string) {
  selected_destination.value = destination;
  if (componentsStatus.value[destination] === 'wip') {
    router.push("wip");
  } else {

  }
}

</script>

<template>
<div class="flex flex-col align-middle space-y-5 pt-3 pl-3 pb-4 pr-2 font-bold text-xl text-grau2">
  <p class="flex text-center text-grau2 hover:text-grau-hell2 hover:shadow-md hover:shadow-grau hover:bg-grau rounded-lg p-1 " @click="fun_route('all')" :class="{'text-weiss': selected_destination === 'all' || selected_destination === ''}">All</p>
  <p class="flex text-center text-grau2 hover:text-grau-hell2 hover:shadow-md hover:shadow-grau hover:bg-grau rounded-lg p-1" @click="fun_route('following')" :class="{'text-weiss': selected_destination === 'following'}">You Following</p>
  <p class="flex text-center text-grau2 hover:text-grau-hell2 hover:shadow-md hover:shadow-grau hover:bg-grau rounded-lg p-1" @click="fun_route('messages')" :class="{'text-weiss': selected_destination === 'messages'}">Messages</p>
  <p class="flex text-center text-grau2 hover:text-grau-hell2 hover:shadow-md hover:shadow-grau hover:bg-grau rounded-lg p-1" @click="fun_route('other')" :class="{'text-weiss': selected_destination === 'other'}">Other</p>
</div>
</template>

<style scoped>

</style>