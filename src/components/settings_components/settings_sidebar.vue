<script setup lang="ts">
import { defineEmits } from 'vue';
import { ref } from 'vue';


const emit = defineEmits(['updateSetting']);
const selectedSetting = ref('');

function updateSetting(setting: string) {
  selectedSetting.value = setting;
  emit('updateSetting', setting);
  console.log(`Setting selected (SS): ${setting}`);
}
</script>

<template>
  <div class="text-grau2 font-bold space-y-4 pl-2 pt-5">
    <label class="flex text-center shadow-2xl rounded-lg" :class="{'text-weiss': selectedSetting === 'setting_account' || selectedSetting === ''}" @click="updateSetting('setting_account')"><img class="pr-2" src="../../assets/icons/user.png" alt="">Account</label>
    <label class="flex text-center shadow-2xl rounded-lg" :class="{'text-weiss': selectedSetting === 'setting_privacy'}" @click="updateSetting('setting_privacy')"><img class="pr-2" src="../../assets/icons/shield.png" alt="">Privacy and Saftey</label>
    <label class="flex text-center shadow-2xl rounded-lg" :class="{'text-weiss': selectedSetting === 'setting_message'}" @click="updateSetting('setting_messages')"><img class="pr-2" src="../../assets/icons/mail.png" alt="">Messages</label>
    <label class="flex text-center shadow-2xl rounded-lg" :class="{'text-weiss': selectedSetting === 'setting_other'}" @click="updateSetting('setting_other')"><img class="pr-2" src="../../assets/icons/other.png" alt="">Other</label>
  </div>
</template>

<style scoped>
</style>