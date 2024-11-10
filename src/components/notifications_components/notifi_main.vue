<script setup lang="ts">
import {ref} from "vue";

const selectedNotification = ref('');

// Aktualisieren der ausgewählten Einstellung
function handleUpdateNotification(setting: string) {
  selectedNotification.value = setting;
  console.log(`Setting got (NA): ${setting}`);
}
</script>

<template>
<div>
  <div>
    MOIN1
  </div>
</div>
</template>

<style scoped>

</style>