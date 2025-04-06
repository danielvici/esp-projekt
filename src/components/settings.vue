<script setup lang="ts">
import { ref } from 'vue';
import Legal from "./home_components/legal.vue";
import Settings_sidebar from "./settings_components/settings_sidebar.vue";
import Settings_main from "./settings_components/settings_main.vue";
import Navigationbar from "./home_components/navigationbar.vue";
import Contacts from "./home_components/contacts.vue";

const selectedSetting = ref('');

// Aktualisieren der ausgewählten Einstellung
function handleUpdateSetting(setting: string) {
  selectedSetting.value = setting;
  console.log(`Setting got (S): ${setting}`);
}
</script>

<template>
  <div id="main" class="bg-hintergrund-farbe sm:flex">
    <div id="left" class="sm:w-72 min-w-72">
      <navigationbar></navigationbar>
      <settings_sidebar @updateSetting="handleUpdateSetting"></settings_sidebar>
    </div>
    <div class="w-100p sm:border-x-grau2 sm:border-x-2 my-2">
      <settings_main :selectedSetting="selectedSetting"></settings_main>
    </div>
    <div class="sm:w-1/4">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>
</style>