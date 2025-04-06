<script setup>
import { ref, onMounted } from "vue";

let self = ref(null); // Initialisiere self mit null
let self_id = ref();

async function getSelf() {
  try {
    const response = await fetch('http://localhost:8000/api/users', { method: 'GET' });

    if (!response.ok) {
      console.error(`HTTP-Fehler! Status: ${response.status}`);
      self.value = null;
      return;
    }

    const users = await response.json();

    const foundUser = users.find(user => {
      return String(user.user_id) === self_id.value;
    });

    if (foundUser) {
      self.value = foundUser;

    } else {
      self.value = null;
    }

  } catch (error) {
    console.error('ERROR:', error);
    self.value = null;
  }
}

onMounted(() => {
  self_id.value = localStorage.getItem('self_id');
  getSelf();
  console.log("SELF ID (onMounted):", self_id.value);
});
</script>

<template>
  <div class="space-y-2 pl-2" v-if="self">
    <p class="text-2xl text-weiss pt-2 items-center flex justify-center">{{ self.displayname }}</p>
    <div>
      <a class="text-lg text-weiss">Username</a><br>
      <a class="text-grau2">{{ self.username }}</a>
    </div>
    <div>
      <a class="text-lg text-weiss">User created at</a><br>
      <a class="text-grau2">{{ self.account_created }}</a>
    </div>
    <div>
      <a class="text-lg text-weiss">Email</a><br>
      <a class="text-grau2">{{ self.user_email }}</a>
    </div>
    <div>
      <a class="text-lg text-weiss">User ID</a><br>
      <a class="text-grau2">{{ self.user_id }}</a>
    </div>
    <div>
      <a class="text-lg text-weiss">Firstname</a><br>
      <a class="text-grau2">{{ self.firstname }}</a>
    </div>
    <div>
      <a class="text-lg text-weiss">Surname</a><br>
      <a class="text-grau2">{{ self.surname }}</a>
    </div>
    <div>
      <a class="text-lg text-weiss">Bio</a><br>
      <a class="text-grau2">{{ self.bio }}</a>
    </div>
  </div>
  <div v-else class="flex justify-center items-center">
    <p class="text-2xl text-weiss pt-2 items-center flex justify-center">User data is being loaded or does not exist</p>
  </div>
</template>

<style scoped>

</style>