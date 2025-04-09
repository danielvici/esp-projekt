<script setup lang="ts">
import router from "../../router";

function reset_password() {
  // alert("Account deleted. You will be redirected to the login page.");
  router.push("/");
}

function handleSubmit(event: Event) {
  event.preventDefault();
  reset_password();
}
</script>

<template>
<div>
  <div> <!--HEADER-->
    <h1 class="text-weiss text-2xl p-3 items-center flex justify-center">Reset Password</h1>
  </div>
  <div>
    <form class="flex flex-col space-y-4 p-4" @submit.prevent="handleSubmit">
      <div class="flex flex-col space-y-2">
        <input type="password" name="old-password" id="old-password" placeholder="Old Password" class="m-2 w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg invalid:border-logo-farbe-rot invalid:border-2">
      </div>
      <div class="flex flex-col space-y-2">
        <input type="password" name="new-password" id="new-password" placeholder="New Passoword" class="m-2 w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg invalid:border-logo-farbe-rot invalid:border-2">
      </div>
      <div class="flex flex-col space-y-2">
        <input type="password" name="new-password-repeat" id="new-password-repeat" placeholder=" Repeat new passoword" class="mt-4 m-2 w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg invalid:border-logo-farbe-rot invalid:border-2">
      </div>
      <button type="submit" class="bg-button-farbe text-schwarz text-xl font-bold p-4 mt-8 rounded-lg">Change Password</button>
    </form>
  </div>
</div>
</template>

<style scoped>

</style>