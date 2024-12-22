<script setup lang="ts">
import router from "../../router";
import { ref } from 'vue';

let input_username_mail = ref("");
let input_user_password = ref("");

async function login(event: Event) {
  event.preventDefault();


  const username = input_username_mail;
  const password = input_user_password;

  console.log("Username: " + username.value + ", Password: " + password.value);

  try {
    const response = await fetch('http://localhost:8000/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'login/json',
      },
      body: JSON.stringify({username: username.value, password: password.value}),
    });


    if (response["status"] == 200) {
      alert("You will be now redirected")
      router.push('/');
    } else {
      alert("Username/E-Mail or Password are wrong");
    }

    const data = await response.json();
    console.log(response);
  } catch (e) {
    console.log("An error has occurred. Please try again later.");
  }
}

</script>

<template>
  <div class="px-20 border-x border-x-grau2 pb-35p">
    <div class="text-3xl pt-32"> <!-- ÜBERSCHRIFT-->
      <p class="text-weiss text-center">Welcome to <label class="bg-schwarz p-1 rounded-lg mr-1"><span class="text-logo-farbe-lila">E</span><span class="text-logo-farbe-rot">S</span><span class="text-logo-farbe-blau">P</span></label>!</p>
      <p class="text-weiss text-center">Login or create a new Account to continue</p>
    </div>
    <div class="px-20 pt-7"><!--  FORM --->
      <form class="flex flex-col items-center" @submit.prevent="login">
        <input class="m-4 w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg" v-model="input_username_mail" type="text" placeholder="Username or E-Mail"><br>
        <input class="m-4 w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg" v-model="input_user_password" type="password" placeholder="Password"><br>
        <button class="m-4 bg-button-farbe w-full max-w-xs p-4 text-schwarz rounded-lg hover:shadow-2xl hover:shadow-grau-dunkel">Login</button>
        <p class="text-weiss"><input type="checkbox" > Remeber me</p>
      </form>
    </div>
    <div>
      <p class="text-weiss text-center">No Account? <router-link to="/register" class="text-button-farbe">Register here</router-link></p>
    </div>
  </div>
</template>

<style scoped>

</style>