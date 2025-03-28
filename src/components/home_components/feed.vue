<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "../../router";
  // PLACEHOLDER
const upc = ref([]); // user post computed
let post_create_text = "";
let self_id ;

onMounted(async () => {
  self_id = localStorage.getItem("self_id");
  await createFeed();
});

async function createFeed() {
  try {
    // posts und user holen und schauen ob sie richtig sidn
    const post_response = await fetch('http://localhost:8000/api/posts', { method: 'GET' });
    const postsDATA = await post_response.json();

    const user_response = await fetch('http://localhost:8000/api/users', { method: 'GET' });
    const usersDATA = await user_response.json();

    if(post_response.status === 404 || user_response.status === 404) {
      console.error("ERRROR");
      await router.push('/');
      return;
    }

    // posts und user kombinieren
    const combinedPosts = postsDATA.map(post => {
      const user = usersDATA.find(user => user.user_id === post.user_id);

      return {
        post_id: post.posts_uuid,
        post_text: post.post_text,
        likes: post.likes,
        comments: post.comments,
        displayname: user ? user.displayname : 'Unknown',
        username: user ? user.username : 'unknown_user',
        user_id: post.user_id,
      };
    });

    //upc.value = combinedPosts;

    upc.value = combinedPosts.sort((a, b) => b.post_id - a.post_id);;

  } catch (e) {
    console.error("An error has occurred. Please try again later.");
    console.error(e);
  }
  console.log(upc.value);
}

async function addLike(post_id: string | number, user_id: number, index: number) {
  try {
    console.log("UPC: ", upc.value);
    console.log("post_id: ", post_id);
    upc.value[index].likes++;
    const response = await fetch(`http://localhost:8000/api/post/${post_id}/like`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: `{"userId":${user_id}}`,
    });

    console.log('Antwort-Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server-Fehlertext:', errorText);
      //upc.value[index].likes--;
      throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Fehler beim Liken des Posts:', error);
    throw error;
  }
}

function gotoPost(post_id: string | number) {
  localStorage.setItem("viewedpost", post_id.toString());
  router.push(`/post/${post_id}`);
}

function copyLink(post_id: string | number) {
  const tocopy = `http://localhost:5173/post/${post_id}`;
  navigator.clipboard.writeText(tocopy);
  alert("Copied to clipboard");
}

async function post_create(post_text: string) {
  if (post_text === "") {
    alert("Please write something before posting.");
    return;
  }
  console.log(self_id);
  console.log(post_text);
  const response = await fetch(`http://localhost:8000/api/post/create`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: `{"userId":${self_id},"postText":"${post_create_text}","postType":"text"}`});
  const data = await response.json();

  if (response.ok) {
    console.log(response.text);
    await createFeed();
  }
  console.log(data);

  console.log(post_text);
}

function gotoProfile(user_id: string | number) {
  router.push(`/profile/${user_id}`);
}

</script>

<template>
  <div class="sm:border-x sm:border-x-grau2"> <!-- MAIN -->
    <div> <!-- FEED HEADER -->
      <h2 class="align-middle p-6 text-3xl text-weiss border-b-grau2 border-b-2 ">Feed</h2>
      <!-- POSTING-->
      <div class="flex border-2 border-b-grau2">
        <img src="../../assets/danielvici_pp.png" alt="" class="p-2 rounded-full w-16 h-16">
        <form class="w-full pr-5">
          <!-- post_publish ist richtig aber wird falsch angezeigt. File Input geht nicht-->
          <textarea v-model="post_create_text" name="post_text" class="bg-hintergrund-farbe rounded-lg m-2 p-1 focus:outline-none text-grau2 w-full resize-none" rows="3" placeholder="Write something..."></textarea>
          <div class="">
            <button id="post_publish" name="post_publishss" class="text-weiss p-1 m-2 rounded-lg py-3 px-5 bg-button-farbe" @click.prevent="post_create(post_create_text)" type="button">Post</button>
          </div>
        </form>
      </div>
    </div>

    <div class="sm:overflow-y-auto sm:h-[650px] sm:scrollbar"> <!-- CONTENT -->
      <ul>
        <li v-for="(postitem, indexus) in upc" :key="upc" class="border-2 border-b-grau2 p-3 flex">
          <!-- POST -->
          <img src="../../assets/default_pp.png" alt="" class="rounded-full w-16 h-16">
          <div>
            <div> <!-- POST HEADER -->
              <label class="text-lg font-bold m-1 text-weiss">{{postitem.displayname}}</label>
              <label class="text-base m-1 text-grau2">@{{ postitem.username }}</label>
            </div>
            <div class="m-2"> <!-- POST CONTENT -->
              <p class="text-sm m-1 text-weiss">{{ postitem.post_text }}</p>
            </div>
            <div class="sm:flex"><!-- POST FOOTER -->
              <div class="flex">
                <div class="flex"> <!-- Comments -->
                  <img src="../../assets/icons/comment.png" alt="" class="rounded-full align-middle">
                  <label class="text-sm m-1 text-weiss" v-if="postitem.comments != undefined">{{ postitem.comments }}</label>
                  <label class="text-sm m-1 text-weiss" v-else>Comments disabled</label>
                </div>

                <div class="flex items-center" @click="addLike(postitem.post_id, postitem.user_id, indexus)"> <!-- Likes -->
                  <img alt="" src="../../assets/icons/herz.png" class="align-middle">
                  <label class="text-sm m-1 text-weiss">{{ postitem.likes }}</label>
                </div>
              </div>
              <br class="sm:hidden">
              <div class="flex sm:tems-center mx-2"> <!-- View Post -->
                <button @click="gotoPost(postitem.post_id)" class="text-schwarz mx-1 px-1 rounded-lg bg-button-farbe">View Post</button>
                <button @click="copyLink(postitem.post_id)" class="text-schwarz  pl-1 mx-1 px-1 rounded-lg bg-button-farbe">Share Post</button>
                <button @click="gotoProfile(postitem.user_id)" class="text-schwarz  pl-1 mx-1 px-1 rounded-lg bg-button-farbe"> Go to Profile</button>
              </div><!-- ENDE -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
