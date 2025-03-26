
<script setup lang="ts">
// home -> app.vue
// PLACEHOLDER
import router from "../../router";
import { ref, onMounted, onUnmounted } from 'vue';

let self = localStorage.getItem("self_id");
const isMobile = ref(false);
const show = ref(false);


const getShowMobileElements = () => {
  const value = localStorage.getItem("mobile");
  return value === 'true';
};

const setShowMobileElements = (value) => {
  localStorage.setItem("mobile", value.toString());
};

const toggleElements = () => {
  show.value = !show.value;
  setShowMobileElements(show.value); // Zustand im localStorage speichern
};

const checkScreenWidth = () => {
  isMobile.value = window.innerWidth < 640;
};

onMounted(() => {
  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth);
});
</script>

<template>
  <div class="pt-4 border-b-2 border-b-grau2">
    <div class="items-center flex justify-center"><!-- BILD-->
      <img src="../../assets/esp-logo_no_text.png" alt="" class="rounded-lg h-12 w-24 mx-auto hover:shadow-2xl hover:shadow-grau-dunkel"  @click="router.push('/')">
    </div>
    <div class="sm:hidden text-weiss items-center flex justify-center mt-2 py-4 border-y-2 border-y-grau2 " v-if="isMobile">
      <button @click="toggleElements"> {{ show ? 'close navbar' : 'expand navbar' }} </button>
    </div>
    <div class="align-middle space-y-3 pt-4 pl-3 pb-4 pr-4 font-bold text-xl" v-if="show || !isMobile"> <!-- Icons (Bild) und Text                                  Damit der Text weiß ist muss zwei mal gedrückt werden manchmal-->
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-lila rounded-lg" @click="router.push('/')"><img class="mr-2 p-1 bg-logo-farbe-lila rounded-lg" src="../../assets/icons/home.png" alt=""> Home</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-lila rounded-lg" @click="router.push('/search')">        <img class="mr-2 p-1 bg-logo-farbe-lila rounded-lg" src="../../assets/icons/lupe.png" alt="">Search</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-rot  rounded-lg" @click="router.push('/notifications')"> <img class="mr-2 p-1 bg-logo-farbe-rot  rounded-lg" src="../../assets/icons/glocke.png" alt="">Notifications</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-rot  rounded-lg" @click="router.push('/messages')">           <img class="mr-2 p-1 bg-logo-farbe-rot  rounded-lg" src="../../assets/icons/mail.png" alt="">Messages</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-blau rounded-lg" @click="router.push(`/profile/${self}`)">           <img class="mr-2 p-1 bg-logo-farbe-blau rounded-lg" src="../../assets/icons/user.png" alt="">Profile</label>
      <label class="flex text-center text-grau2 hover:bg-logo-farbe-blau rounded-lg" @click="router.push('/settings')">      <img class="mr-2 p-1 bg-logo-farbe-blau rounded-lg" src="../../assets/icons/zahnrad.png" alt="">Settings</label>
    </div>
  </div>
</template>

<style scoped>

</style>

