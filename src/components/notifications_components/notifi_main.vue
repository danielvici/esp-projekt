<script setup lang="ts">
console.log("SEITE WIRD AUSGEFÜHRT")
import {ref} from "vue";

const notifications = ref([
  {id: 1, // Sollte im feed sein
    profile_picture: "../../assets/default_pp.png",
    author_display_name: "Linux Enjoyer",author_username: "lunix",
    content:"I love Linux. My Favorite Linux Distro is ARCH LINUX.",
    type:"message",date: new Date(2024,11,13).toDateString() }, // 11 = Dezember, 10 = Nov, 9 = okt., 8 = sep.
  {id: 2,
    profile_picture: "../../assets/default_pp.png",
    author_display_name: "XBOX",author_username: "Xbox",
    content: "Call of Duty: Black Ops 6 is OUT NOW. Check it out: https://xbox.com",
    type:"message",date: new Date(2024,9,13).toDateString()},
  {id: 33,// Sollte im feed sein
    profile_picture: "../../assets/default_pp.png",
    author_display_name: "ESP Support",author_username: "esp_support",
    content: "You're post was against our TOS and got deleted. Additionally your account has been suspended for 30 Days." ,
    type:"support",date: new Date(2024,9,13).toDateString()},
  {id: 4,// Sollte im feed sein
    profile_picture: "../../assets/default_pp.png",
    author_display_name: "System", author_username: "esp_notifications",
    content: "GitHub posted something new. Check it out",
    type:"following",date: new Date(2024,10,2).toDateString()},
  {id: 5, // Sollte im feed sein
    profile_picture: "../../assets/danielvici_pp.png",
    author_display_name: "danielvici123", author_username: "danielvici",
    content: "I created this WebApp with VUE3 and TailwindCSS. It was a lot of fun.",
    type:"message",date: new Date(2024,1,1).toDateString()}
]);


let feed = ref([]);

// wie enum in c bzw. arduino
interface sortting_definition {
  f: boolean; // following
  m: boolean; // messages
  da: boolean; // date-asc
  dd: boolean; // date-desc
  u: boolean; // user
  sorting: string;
}
// Standard filter und sorting
const check_type = ref<sortting_definition>({
  f: true,
  m: true,
  da: false,
  dd: false,
  u: false,
  sorting: "date-asc",
});


// Für jeden eintrag in notifications durschläuft die schleife einen durschlauf
for(let i =0; i < notifications.value.length; i++) {
  console.log("Getting Notifications...");


    feed.value.push(notifications.value[i]);

}

function go_filter(){
  console.log("Filter applied");
  console.log("These Filter applied: ", JSON.stringify(check_type.value));
  feed.value = [];

  notifications.value.forEach((notification) => {
    if ((check_type.value.f == true && notification.type === "following") || (check_type.value.m == true && notification.type === "message")|| (notification.type === "support")){
      feed.value.push(notification);
    }
  })
  console.log("Feed:", feed.value);
}

</script>

<template>
<div>
  <div class="border-b-grau2 border-b-2">
    <h1 class="text-weiss text-3xl p-4">Notifications</h1>
  </div>
  <div class="text-grau2 p-5 border-b-2 "><!-- FILTER -->

    <!-- Wenn das Form submited wurde wird die Seite nicht-->
    <!-- neugeladen und die Funktion -->
    <form @submit.prevent="go_filter">
      <label class="p-2 text-xl text-weiss">Filter</label>
      <label class="m-2 accent-logo-farbe-blau">You Following<input type="checkbox" class="m-1 mr-3" v-model="check_type.f"></label>
      <label class="m-2 accent-logo-farbe-rot">Messages<input type="checkbox" class="m-1 mr-3" v-model="check_type.m"></label>
      <!--<label class="m-2 accent-logo-farbe-rot">Other<input type="checkbox" class="m-1 mr-3" v-model="check_type.o"></label>-->

      <label class="p2">Sort by <select name="sorting" id="notification_sorting" class="mr-3 bg-hintergrund-farbe text-weiss" v-model="check_type.sorting">
        <option value="date-asc">Date (asc.)</option>
        <option value="date-desc">Date (desc.)</option>
        <option value="user">User</option>
      </select></label>
      <button type="submit" class="bg-button-farbe text-schwarz p-2 rounded-lg">Filter</button>
    </form>
  </div>
  <div> <!-- MAIN NACHRICHTEN-->
    <ul v-if="feed.length > 0">
      <li v-for="(notification) in feed" :key="notifications.id" class="border-b-grau2 border-b-1 border-b p-3 flex">
        <img src="../../assets/default_pp.png" alt="user profile picture" class="rounded-full w-16 h-16">
        <div>
          <div class="flex">
            <label class="text-lg font-bold m-1 text-weiss">{{notification.author_display_name}}</label>
            <label class="m-2 text-grau2">Type: {{notification.type}}</label>
           <label class="m-2 text-grau2">Date: {{notification.date}}</label>
          </div>
          <a class="ml-1">{{notification.content}}</a>
        </div>
      </li>
    </ul>
    <a v-else>You have no Notifications!</a>
  </div>
</div>
</template>

<style scoped>

</style>