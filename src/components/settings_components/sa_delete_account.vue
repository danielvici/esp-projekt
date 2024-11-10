<script setup lang="ts">
import router from "../../router";

function deleteAccount() {
  // alert("Account deleted. You will be redirected to the login page.");
  router.push("/login");
}

function handleSubmit(event: Event) {
  event.preventDefault();
  deleteAccount();
}
</script>

<template>
  <div class="flex-col flex items-center justify-center">
    <div> <!-- HEADER -->
      <h1 class="text-weiß text-2xl p-4">Delete Account</h1>
    </div>
    <div>
      <form class="flex flex-col space-y-4 p-4" @submit.prevent="handleSubmit">
        <div class="flex flex-col space-y-2 items-center justify-center">
          <input type="password" name="password" id="password" placeholder="Password" required class="m-2 w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg">
        </div>
        <div>
          <input type="checkbox" name="verification" id="verification" required class="">
          <label for="verification" class="p-4">I agree that my account will be deleted permanently.</label>
        </div>
        <button type="submit" class="bg-logo-farbe-rot text-schwarz text-xl font-bold p-4 mt-8 rounded-lg">Delete Account</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>