<script setup lang="ts">
import {defineProps, ref} from 'vue';
import Sa_accountInformation_comp from "./sa_account-information_comp.vue";
import Sa_reset_password from "./sa_reset_password.vue";
import Sa_delete_account from "./sa_delete_account.vue";

const props2 = defineProps({
  selectedAccountSetting: String
});

console.log(`Setting got (SAM): ${props2.selectedAccountSetting}`);
</script>

<template>
  <div class="border-l-2 border-l-grau2"> <!-- MAIN DIV -->
    <div v-if="props2.selectedAccountSetting === 'sa_account-information'">
      <sa_account-information_comp></sa_account-information_comp>
    </div>
    <div v-else-if="props2.selectedAccountSetting === 'sa_reset-password'">
      <sa_reset_password></sa_reset_password>
    </div>
    <div v-else-if="props2.selectedAccountSetting === 'sa_delete-account'">
      <sa_delete_account></sa_delete_account>
    </div>
    <div v-else>
      <sa_account-information_comp></sa_account-information_comp>
    </div>
  </div>
</template>

<style scoped>
</style>