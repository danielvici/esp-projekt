<script setup lang="ts">
import { ref } from 'vue';
import Settings_account from "./settings_account.vue";
import Settings_account_main from "./settings_account_main.vue";
import Sps_main from "./sps_main.vue";
import So_main from "./so_main.vue";

const props = defineProps({
  selectedSetting: String
});

const selectedAccountSetting = ref('');

function handleUpdateAccountSetting(setting: string) {
  selectedAccountSetting.value = setting;
}

console.log(`Setting got (SM): ${props.selectedSetting}`);
</script>

<template>
  <div class="text-weiss">
    <div v-if="props.selectedSetting === 'setting_account'"> <!-- ACCOUNT SETTINGS-->
      <div class="border-r-grau2 border-r-1 border-b-grau2 border-b-2"> <!-- HEADER - ACCOUNT SETTINGS-->
        <h1 class="text-weiss text-3xl p-4">Account</h1>
      </div>
      <div class="flex flex-row content-center justify-center autofill:"> <!-- BODY - ACCOUNT SETTINGS-->
        <settings_account class="basis-1/2" @updateAccountSetting="handleUpdateAccountSetting"></settings_account>
        <settings_account_main class="basis-1/2" :selectedAccountSetting="selectedAccountSetting"></settings_account_main>
      </div>
    </div>




    <div v-else-if="props.selectedSetting === 'setting_privacy'"> <!-- PRIVACY AND SAFTEY-->
      <div class="border-r-grau2 border-r-2 border-b-grau2 border-b-2"> <!-- HEADER PRIVACY-->
        <h1 class="text-weiss text-3xl p-4">Privacy and Saftey</h1>
      </div>
      <div> <!-- BODY - ACCOUNT SETTINGS-->
        <sps_main></sps_main>
      </div>
    </div>




    <div v-else-if="props.selectedSetting === 'setting_messages'"> <!-- MESSAGES-->
      <label>MOIN2</label>
    </div>

    <div v-else-if="props.selectedSetting === 'setting_other'"> <!-- OTHER -->
      <div class="border-r-grau2 border-r-1 border-b-grau2 border-b-2"> <!-- HEADER - ACCOUNT SETTINGS-->
        <h1 class="text-weiss text-3xl p-4">Other</h1>
      </div>
      <so_main></so_main>
    </div>


    <div v-else-if="props.selectedSetting === undefined"> <!-- IF NOTHING SELECTED-->
      <label>Select a Setting in the Sidebar</label>
    </div>

    <div v-else-if="props.selectedSetting === ''"> <!-- IF NOTHING SELECTED-->
      <div class="border-r-grau2 border-r-1 border-b-grau2 border-b-2"> <!-- HEADER - ACCOUNT SETTINGS-->
        <h1 class="text-weiss text-3xl p-4">Account</h1>
      </div>
      <div class="flex flex-row content-center justify-center"> <!-- BODY - ACCOUNT SETTINGS-->
        <settings_account class="basis-1/2" @updateAccountSetting="handleUpdateAccountSetting"></settings_account>
        <settings_account_main class="basis-1/2" :selectedAccountSetting="selectedAccountSetting"></settings_account_main>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>