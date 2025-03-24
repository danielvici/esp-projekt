<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "../../router";
  // PLACEHOLDER
const upc = ref([]); // user post computed
let post_nr = "";
let current_user = "";
let pust_create_text = "";

/*

 */
async function createFeed() {
  try {
    // posts und user holen und schauen ob sie richtig sidn
    const post_response = await fetch('http://localhost:8000/api/posts', { method: 'GET' });
    const postsDATA = await post_response.json();

    const user_response = await fetch('http://localhost:8000/api/users', { method: 'GET' });
    const usersDATA = await user_response.json();

    // posts und user kombinieren
    const combinedPosts = postsDATA.map(post => {
      const user = usersDATA.find(user => user.user_id === post.user_id);

      return {
        post_id: post.posts_uuid,
        post_text: post.post_text,
        likes: post.likes,
        comments: post.comments,
        displayname: user ? user.displayname : 'Unknown',
        username: user ? user.username : 'unknown_user'
      };
    });

    //upc.value = combinedPosts;

    upc.value = combinedPosts.sort(() => Math.random() - 0.5);

  } catch (e) {
    console.error("An error has occurred. Please try again later.");
    console.error(e);
  }
  console.log(upc.value);
}


onMounted(async () => {
  await createFeed();

});



  async function addLike(index: number) {
    post_nr = index.toString()
    const response = await fetch(`http://localhost:8000/api/post/${post_nr}/like`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
    });
    if (!response.ok) {
      alert('Failed to like post');
    } else{
      console.log("New Like Amount: ", upc.value[index].likes);
    }
  }
  function post_create_func(text:string) {


    console.log("Post: ", text);
    if (text === undefined || text === "") {
      console.log("Post is empty");
      alert("Post is empty");
      return;
    } else {
      console.log("Post is not empty");
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
</script>

<template>
  <div class="border-x border-x-grau2"> <!-- MAIN -->
    <div> <!-- FEED HEADER -->
      <h2 class="align-middle p-6 text-3xl text-weiss border-b-grau2 border-b ">Feed</h2>
      <!-- POSTING-->
      <div class="flex border-2 border-b-grau2">
        <img src="../../assets/danielvici_pp.png" alt="" class="p-2 rounded-full w-16 h-16">
        <form>
          <!-- post_publish ist richtig aber wird falsch angezeigt. File Input geht nicht-->
          <textarea v-model="pust_create_text" name="post_text" class="bg-hintergrund-farbe rounded-lg m-2 p-1 focus:outline-none text-grau2 w-200p resize-none" rows="3" placeholder="Write something..."></textarea>
          <div class="">
            <input class="text-weiss" type="file" accept=".png, .jpg, .jpeg">
            <button id="post_publish" name="post_publishss" class="text-weiss p-1 m-2 rounded-lg py-3 px-5 bg-button-farbe" @click.prevent="post_create_func(pust_create_text)" type="button">Post</button>
          </div>
        </form>
      </div>
    </div>

    <div class="overflow-y-auto h-screen scrollbar"> <!-- CONTENT -->
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
            <div class="flex"> <!-- POST FOOTER -->
              <div class="flex"> <!-- Comments -->
                <img src="../../assets/icons/comment.png" alt="" class="rounded-full align-middle">
                <label class="text-sm m-1 text-weiss" v-if="postitem.comments != undefined">{{ postitem.comments }}</label>
                <label class="text-sm m-1 text-weiss" v-else>Comments disabled</label>
              </div>

              <div class="flex items-center" @click="addLike(indexus)"> <!-- Likes -->
                <img alt="" src="../../assets/icons/herz.png" class="align-middle">
                <label class="text-sm m-1 text-weiss">{{ postitem.likes }}</label>
              </div>

              <div class="flex items-center mx-2"> <!-- View Post -->
                <button @click="gotoPost(postitem.post_id)" class="text-schwarz mx-1 px-1 rounded-lg bg-button-farbe">View Post</button>
                <button @click="copyLink(postitem.post_id)" class="text-schwarz  pl-1 mx-1 px-1 rounded-lg bg-button-farbe">Share Post</button>
              </div><!-- ENDE -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
