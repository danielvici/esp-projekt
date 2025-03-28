<script setup lang="ts">
import router from "../../router";


function logout() {
  console.log("Logout");
  localStorage.setItem('isLoggedIn', 'false');
  router.push("/login");
}



</script>

<template>
<div class="text-grau2 font-bold space-y-4 pl-2 pt-5 mb-4">
  <label class="flex text-center shadow-2xl rounded-lg active:text-weiss" @click="logout"><img class="pr-2" src="../../assets/icons/logout.png" alt="">Logout</label>
</div>
</template>

<style scoped>

</style>