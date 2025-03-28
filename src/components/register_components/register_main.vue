<script setup lang="ts">

import {ref} from "vue";
import router from "../../router";

let register_input_username = ref("");
let register_input_displayname = ref("");
let register_input_password = ref("");
let register_input_email = ref("");


async function register() {
  const username = register_input_username;
  const displayname = register_input_displayname;
  const email = register_input_email;
  const password = register_input_password;
  const std_text = "default";

  if (username.value === "" || password.value === "" || displayname.value === "" || email.value === "") {
    alert("Please fill all fields");
    return;
  }


  console.log("Username: " + username.value + ", Password: " + password.value);

  try {
    const response = await fetch('http://localhost:8000/api/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'login/json',
      },
      body: JSON.stringify({username: username.value, password: password.value, userGroup: "user", displayname: displayname.value, user_email: email.value, firstname: std_text, surname: std_text}),
    });


    if (response["status"] == 200) {
      const data = await response.json();
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username.value);
      localStorage.setItem('self_id', data["userId"]);
      console.log("SELF REG: " + data["userId"]);
      alert("Account created! You will be now redirected");
      router.push('/');
      router.go(1);
    }

    const data = await response.json();
    console.log(response);
  } catch (e) {
    console.log("An error has occurred. Please try again later.");
    console.error(e);
  }
}
</script>

<template>
  <div id="main" class="bg-hintergrund-farbe p-2 sm:border-x sm:border-x-grau2 sm:px-20">
    <div class="text-3xl pt-20px sm:pt-32"> <!-- ÜBERSCHRIFT-->
      <p class="text-weiss text-center">Welcome to <label class="bg-schwarz p-1 rounded-lg mr-1"><span class="text-logo-farbe-lila">E</span><span class="text-logo-farbe-rot">S</span><span class="text-logo-farbe-blau">P</span></label>!</p>
      <p class="text-weiss text-center pt-2">Join today!</p>
    </div>
    <div class="px-20 pt-7"> <!--  FORM --->
      <form class="flex flex-col items-center" @submit.prevent="register">
        <input class="m-4 sm:w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg" v-model="register_input_username" type="text" placeholder="Username" required><br>
        <input class="m-4 sm:w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg" v-model="register_input_displayname" type="text" placeholder="Displayname" required><br>
        <input class="m-4 sm:w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg" v-model="register_input_email" type="email" placeholder="E-Mail" required><br>
        <input class="m-4 sm:w-full max-w-xs bg-grau-dunkel p-4 text-weiss placeholder-grau2 focus:outline-none rounded-lg" v-model="register_input_password " type="password" placeholder="Password" required><br>
        <button class="m-4 bg-button-farbe sm:w-full max-w-xs p-4 text-schwarz rounded-lg">Create Account</button>
      </form>
      <p class="text-weiss w-100p text-center">Already have an account? <router-link to="/login" class="text-button-farbe">Login</router-link></p>
    </div>
  </div>
</template>

<style scoped>

</style>