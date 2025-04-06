<script setup lang="ts">
import {ref, onMounted} from "vue";
import router from "../../router";

const allItems = ref<any[]>([]);
const feed = ref<any[]>([]);
const feed2 = ref<any[]>([]);

interface search_filter {
  u: boolean;
  p: boolean;
}
const search_filter_status = ref<search_filter>({
  u: true,
  p: true,
});
let searched = false;

const usr_search = ref<string | undefined>(undefined);

async function get_posts_user() {
  try {
    const post_response = await fetch('http://localhost:8000/api/posts');
    const postsDATA = await post_response.json();

    const user_response = await fetch('http://localhost:8000/api/users');
    const usersDATA = await user_response.json();

    usersDATA.forEach(user => {
      allItems.value.push({...user, id: user.user_id, type: 'user'});
    });

    postsDATA.forEach(post => {
      const author = usersDATA.find(user => user.user_id === post.user_id);
      const postWithAuthorInfo = {
        ...post,
        type: 'post',
        username: author ? author.username : 'unknown',
        displayname: author ? author.displayname : 'unknown',
      };
      allItems.value.push(postWithAuthorInfo);
    });

    feed.value = [...allItems.value];
    feed2.value = [...allItems.value];

    //console.log("Data Loaded:", allItems.value);
  } catch (error) {
    console.error("Error:", error);
  }
}

onMounted(async () => {
  get_posts_user();
});

function go_fs(){
  searched = true;
  feed.value = [];
  feed2.value = [];

  const combinedFilteredItems = allItems.value
      .filter(item => (search_filter_status.value.u == true && item.type === "user") ||
          (search_filter_status.value.p == true && item.type === "post"))
      .map(item => {
        if (item.type === 'post') {
          const user = allItems.value.find(u => u.id === item.user_id && u.type === 'user');
          return {
            ...item,
            username: user ? user.username : 'unknown',
            displayname: user ? user.displayname : 'unknown',
          };
        }
        return item;
      });

  feed2.value = combinedFilteredItems;

  const searchTerm = usr_search.value ? usr_search.value.toLowerCase() : '';
  if (!searchTerm) {
    feed.value = [...feed2.value];
    return;
  }

  feed.value = feed2.value.filter(item => {
    switch (item.type) {
      case "user":
        return (item.displayname && item.displayname.toLowerCase().includes(searchTerm)) || (item.username && item.username.toLowerCase().includes(searchTerm));
      case "post":
        return (item.post_text && item.post_text.toLowerCase().includes(searchTerm)) || (item.username && item.username.toLowerCase().includes(searchTerm) || item.displayname && item.displayname.toLowerCase().includes(searchTerm));
      default:
        return false;
    }
  });
}

async function addLike(post_id: string | number, user_id: number, index: number) {
  try {
    feed.value[index].likes++;
    const response = await fetch(`http://localhost:8000/api/post/${post_id}/like`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
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

function gotoPost(post_id: string ) {
  localStorage.setItem("viewedpost", post_id);
  router.push(`/post/${post_id}`);
  console.log("goto post: " + post_id);
}

function copyLink(post_id: string | number) {
  const tocopy = `http://localhost:5173/post/${post_id}`;
  navigator.clipboard.writeText(tocopy);
  alert("Copied to clipboard");
}

function gotoProfile(user_id: string | number) {
  router.push(`/profile/${user_id}`);
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div class="w-1/2">
        <form @submit.prevent="go_fs" class="flex flex-col">
          <input type="text" placeholder="Search..." class="w-full m-2 mt-6 p-4 bg-grau-dunkel focus:outline-none rounded-xl placeholder:text-center text-center" v-model="usr_search">
          <div class="flex justify-center text-grau2">
            <label class="m-2 accent-button-farbe"><input type="checkbox" class="mr-1" v-model="search_filter_status.u">User</label>
            <label class="m-2 accent-button-farbe"><input type="checkbox" class="mr-1" v-model="search_filter_status.p">Post</label>
          </div>
          <button class="text-schwarz pl-1 mx-1 px-1 rounded-lg bg-button-farbe w-1/2 place-self-center">Filter /Search </button>
        </form>
      </div>
    </div>

    <div>
      <div>
        <a class="text-2xl flex justify-center mt-4 pt-2 p-3 border-b-grau2 border-b">Result(s):</a>
      </div>
      <div v-if="feed.length > 0 && searched == true" class="sm:overflow-y-auto sm:h-[650px] sm:scrollbar">
        <div v-for="(bing, i) in feed" :key="bing.id">
          <div v-if="bing.type === 'user'" class="pt-2 p-3 border-b-grau2 border-b">
            <div class="flex">
              <img v-if="bing.user_id != '99' " src="../../assets/default_pp.png" alt="" class="rounded-full w-16 h-16">
              <img v-else src="../../assets/danielvici_pp.png" alt="" class="rounded-full w-16 h-16">
              <div class="">
                <a class="text-lg m-1">{{ bing.displayname }}</a>
                <a class="text-base m-1 text-grau2">@{{ bing.username }}</a>
                <div>
                  <a class=" text-sm m-3 text-weiss" v-if="bing.bio">{{ bing.bio }}</a>
                  <a class=" text-sm m-3 text-grau2 italic" v-else>User has no bio.</a>
                </div>
                <button @click="gotoProfile(bing.user_id)" class="text-schwarz  pl-1 mx-1 px-1 rounded-lg bg-button-farbe"> Go to Profile</button>
              </div>
            </div>
          </div>
          <div v-else-if="bing.type === 'post'" class="flex p-3 border-b-grau2 border-b "> <!-- POSTS -->
            <img v-if="bing.user_id != '99' " src="../../assets/default_pp.png" alt="" class="rounded-full w-16 h-16">
            <img v-else src="../../assets/danielvici_pp.png" alt="" class="rounded-full w-16 h-16">
            <div>
              <div>
                <label class="text-lg m-1 text-weiss">{{ bing.displayname }}</label>
                <label class="text-base m-1 text-grau2">@{{ bing.username }}</label>
              </div>
              <div class="m-2">
                <p class="text-sm m-1 text-weiss">{{ bing.post_text }}</p>
              </div>
              <div class="sm:flex pt-2">
                <div class="flex">
                  <div class="flex">
                    <img src="../../assets/icons/comment.png" alt="" class="rounded-full align-middle">
                    <label class="text-sm m-1 text-weiss" v-if="bing.comments != undefined">{{ bing.comments }}</label>
                    <label class="text-sm m-1 text-weiss" v-else>Comments disabled</label>
                  </div>

                  <div class="flex items-center" @click="addLike(bing.posts_uuid, bing.user_id, i)">
                    <img alt="" src="../../assets/icons/herz.png" class="align-middle">
                    <label class="text-sm m-1 text-weiss">{{ bing.likes }}</label>
                  </div>
                </div>
                <br class="sm:hidden">
                <div class="flex sm:tems-center mx-2"> <!-- View Post -->
                  <button @click="gotoPost(bing.posts_uuid)" class="text-schwarz mx-1 px-1 rounded-lg bg-button-farbe">View Post</button>
                  <button @click="copyLink(bing.posts_uuid)" class="text-schwarz  pl-1 mx-1 px-1 rounded-lg bg-button-farbe">Share Post</button>
                  <button @click="gotoProfile(bing.user_id)" class="text-schwarz  pl-1 mx-1 px-1 rounded-lg bg-button-farbe"> Go to Profile</button>
                </div><!-- ENDE -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="searched == false" class="flex justify-center">
        <a class="text-2xl text-logo-farbe-rot p-10 text-center">To see results you have to search</a>
      </div>
      <div v-else class="flex justify-center">
        <a class="text-xl text-logo-farbe-rot p-10 text-center">No Results Found</a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>