<script setup lang="ts">
import router from "../../router";

function login() {
  // alert("Account deleted. You will be redirected to the login page.");
  router.push("/");
}

function handleSubmit(event: Event) {
  event.preventDefault();
  login();
}
</script>

<template>
  <div class="px-20 border-x border-x-grau2 pb-35p">
    <div class="text-3xl pt-32"> <!-- ÜBERSCHRIFT-->
      <p class="text-weiss text-center">Welcome to <span class="text-button-farbe">ESP</span>!</p>
      <p class="text-weiss text-center">Login or create a new Account to continue</p>
    </div>
    <div class="px-20 pt-7"><!--  FORM --->
      <form class="flex flex-col items-center" @submit.prevent="handleSubmit">
        <input class="m-4 w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg" type="text" placeholder="Username or E-Mail"><br>
        <input class="m-4 w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg" type="password" placeholder="Password"><br>
        <button class="m-4 bg-grau-dunkel w-full max-w-xs p-4 text-weiss rounded-lg">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>