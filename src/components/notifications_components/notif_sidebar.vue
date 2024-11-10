<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  selectedNotification: String
});

const selectedNotification = ref('');

function handleUpdateNotification(setting: string) {
  selectedNotification.value = setting;
}

</script>

<template>
<div class="flex flex-col align-middle space-y-5 pt-3 pl-3 pb-4 font-bold text-xl text-grau2">
  <label>All</label>
  <label>You Following</label>
  <label>Messages</label>
  <label>Other</label>
</div>
</template>

<style scoped>

</style>