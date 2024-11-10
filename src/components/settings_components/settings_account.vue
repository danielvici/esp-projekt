<script setup lang="ts">
import {defineEmits, ref} from 'vue';

const emit = defineEmits(['updateAccountSetting']);
const selectedSetting = ref('');

function updateAccountSetting(setting: string) {
  emit('updateAccountSetting', setting);
  selectedSetting.value = setting;
  console.log(`Setting selected (SA): ${setting}`);
}
</script>

<template>
  <div class="border-x border-x-grau2 "> <!-- MAIN DIV -->
    <div class="flex flex-col text-xl pl-4 pt-5 pr-4 space-y-5 text-grau2"> <!-- BODY -->
      <label @click="updateAccountSetting('sa_account-information')" :class="{'text-weiss': selectedSetting === 'sa_account-information' || selectedSetting === ''}">Account Information</label>
      <label @click="updateAccountSetting('sa_reset-password')" :class="{'text-weiss': selectedSetting === 'sa_reset-password'}">Reset Password</label>
      <label @click="updateAccountSetting('sa_delete-account')" :class="{'text-weiss': selectedSetting === 'sa_delete-account'}">Delete Account</label>
    </div>
  </div>
</template>

<style scoped>
</style>