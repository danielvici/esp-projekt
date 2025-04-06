<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const upc = ref([]);
const profile_id = ref<number | null>(null);
const userData = ref<any>(null);

onMounted(async () => {
  const pathArray = route.path.split('/');

  if (pathArray.length > 2) {
    profile_id.value = parseInt(pathArray[2], 10);
  } else {
    console.warn("No profile ID found in the route.");
  }

  if (!profile_id.value) {
    alert('No profile selected. Redirecting to feed.');
    await router.push('/');
    return;
  }
  await create_own_posts();
  await getUser();
});

async function create_own_posts() {
  try {
    const post_response = await fetch('http://localhost:8000/api/posts', {
      method: 'GET',
    });
    if (!post_response.ok) {
      throw new Error(`HTTP error! status: ${post_response.status}`);
    }
    const postsDATA = await post_response.json();

    upc.value = postsDATA.filter((post) => post.user_id === profile_id.value);

    if (upc.value.length === 0) {
      console.warn('No posts found for this user.');
      return;
    }
    //console.log("upc: "+ JSON.stringify(upc.value, null, 2));

    return upc.value;
  } catch (error) {
    console.error('Error fetching posts:', error);
    upc.value = [];
  }
}

async function addLike(post_id: string | number, user_id: number, index: number) {
  try {
    upc.value[index].likes++;
    const response = await fetch(`http://localhost:8000/api/post/${post_id}/like`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: `{"userId":${user_id}}`,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server-Fehlertext:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Fehler beim Liken des Posts:', error);
    throw error;
  }
}

function consoleLog() {
  console.log("upc: ", upc.value);
  console.log("profile_id: ", profile_id.value);
}

function gotoPost(post_id: string | number) {
  localStorage.setItem("viewedpost", post_id.toString());
  router.push(`/post/${post_id}`);
}

function copyLink(post_id: string | number) {
  const tocopy = `http://localhost:5173/post/${post_id}`;
  navigator.clipboard.writeText(tocopy);
  alert("Copied to clipboard with");
}

async function getUser() {
  try {
    const response = await fetch('http://localhost:8000/api/users/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    const user = users.find((u) => u.user_id === profile_id.value);

    if (user) {
      const followerCount = JSON.parse(user.followers).length;
      const followingCount = JSON.parse(user.following).length;

      userData.value = {
        ...user,
        followerCount,
        followingCount,
      };
      console.log("userData: ", userData.value);
      return userData;
    } else {
      console.error('Benutzer nicht gefunden.');
      userData.value = null;
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzerdaten:', error);
    userData.value = null;
  }
}

function copyUser(){
  const tocopy = `http://localhost:5173/profile/${profile_id.value}`;
  navigator.clipboard.writeText(tocopy);
  alert("Copied to clipboard");
}
</script>

<template>
  <div>
    <h2 class="align-middle p-6 text-3xl text-weiss border-b-grau2 border-b ">Profile</h2>
    <div class="mb-6" v-if="userData">
      <div class="text-weiss p-2 flex justify-center">
        <img v-if="userData.user_id != '99' " src="../../assets/default_pp.png" alt="" class="rounded-full size-36">
        <img v-else src="../../assets/danielvici_pp.png" alt="" class="rounded-full size-36">
      </div>
      <div class="text-center p-2 flex flex-col">
        <label class="text-xl font-bold m-1 text-weiss" @click="consoleLog()">{{ userData.displayname }}</label>
        <label class="text-base m-1 text-grau2">@{{ userData.username }}</label>
      </div>
      <div class="text-grau2 p2 text-center">
        <label class="text-base m-1 p-2"> Followers <a class="text-weiss">{{ userData.followerCount }}</a></label>
        <label class="text-base m-1 p-2"> Following <a class="text-weiss">{{ userData.followingCount }}</a></label>
      </div>
      <div class="flex justify-center pt-5">
        <button @click="copyUser" class="text-schwarz mx-1 px-1 rounded-lg bg-button-farbe">Share Profile</button>
      </div>
    </div>
    <div v-else class="flex-col justify-center p-5 text-center">
        <a class="text-weiss text-3xl"> USER NOT FOUND</a> <br>
        <router-link to="/" class="text-button-farbe text-3xl text-center"> Go to Feed</router-link>
    </div>
    <div>
      <h2 class="align-middle p-6 text-xl text-weiss border-y-grau2 border-y ">Posts</h2>
    </div>
    <div class="sm:overflow-y-auto sm:h-[400px] sm:scrollbar">
      <ul v-if="upc.length > 0">
        <li v-for="(postitem, indexus) in upc" :key="postitem.user_id" class="border border-grau2 p-3 flex">
          <img v-if="postitem.user_id != '99' " src="../../assets/default_pp.png" alt="" class="rounded-full w-16 h-16">
          <img v-else src="../../assets/danielvici_pp.png" alt="" class="rounded-full w-16 h-16">
          <div>
            <div>
              <label class="text-lg font-bold m-1 text-weiss">{{ userData.displayname }}</label>
              <label class="text-base m-1 text-grau2">@{{ userData.username }}</label>
            </div>
            <div class="m-2">
              <p class="text-sm m-1 text-weiss">{{ postitem.post_text }}</p>
            </div>
            <div class="sm:flex">
              <div class="flex items-center">
                <div class="flex">
                  <img src="../../assets/icons/comment.png" alt="" class="rounded-full align-middle">
                  <label class="text-sm m-1 text-weiss" v-if="postitem.comments != undefined">{{ postitem.comments }}</label>
                  <label class="text-sm m-1 text-weiss" v-else>Comments disabled or no comments</label>
                </div>

                <div class="flex items-center" @click="addLike(postitem.post_id, postitem.user_id, indexus)">
                  <img alt="" src="../../assets/icons/herz.png" class="align-middle">
                  <label class="text-sm m-1 text-weiss">{{ postitem.likes }}</label>
                </div>
              </div>
              <br class="sm:hidden">
              <div class="flex sm:items-center mx-2">
                <button @click="gotoPost(postitem.posts_uuid)" class="text-schwarz mx-1 px-1 rounded-lg bg-button-farbe">View Post</button>
                <button @click="copyLink(postitem.posts_uuid)" class="text-schwarz pl-1 mx-1 px-1 rounded-lg bg-button-farbe">Share Post</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="text-weiss text-center justify-center text-lg pt-5"> This user has not posted anything yet. </p>
    </div>
  </div>
</template>

<style scoped>

</style>