<script setup lang="ts">
import router from "../../router";
import { ref } from 'vue';

async function login() {

  const username = ref('testuser');
  const password = ref('testpassword');


    const response = await fetch('http://localhost:8000/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({ username: username.value, password: password.value }),
      });
  /*
  if (!response.ok) {
    throw new Error(`Fehler beim Login: ${response.status} - ${response.statusText}`);
  }
   */

  const data = await response.json();
  // Handle successful login (e.g., store user data in Vuex)
  console.log(response);
  /*
  console.log('Erfolgreich eingeloggt:', data);

  console.error('Fehler beim Login:', error);

   */
    // Handle login error (e.g., display an error message to the user)


  alert("Logged in. You will be redirected to the login page.");
  router.push('/');
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