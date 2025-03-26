<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const upc = ref([]);
let self_id ;
let profile_id = ref();

onMounted(async () => {
  console.log("PARAMS: "+ route.path);
  const pathArray = route.path.split('/');
  console.log(pathArray);

  if (pathArray.length > 2) {
    profile_id.value = pathArray[2];
    console.log("profile_id 0: ", profile_id.value);

  }

  if (!profile_id) {
    alert('No profile selected. Redirecting to feed.');
    await router.push('/');
    return;
  }
  await create_own_posts();
});

async function create_own_posts() {
  try {
    // posts und user holen und schauen ob sie richtig sidn
    const post_response = await fetch('http://localhost:8000/api/posts', { method: 'GET' });
    if (!post_response.ok) {
      throw new Error(`HTTP error! status: ${post_response.status}`);
    }
    const postsDATA = await post_response.json();

    const user_response = await fetch('http://localhost:8000/api/users', { method: 'GET' });
    if (!user_response.ok) {
      throw new Error(`HTTP error! status: ${user_response.status}`);
    }
    const usersDATA = await user_response.json();

    // posts und user kombinieren
    const combinedPosts = postsDATA.filter(post => post.user_id === profile_id).map(post => {
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
    console.log("upc: " + upc.value);
    console.log("combinedPosts: " + combinedPosts);

    //upc.value = combinedPosts;

    upc.value = combinedPosts.sort((a, b) => b.post_id - a.post_id);;

    console.log("upc 2: " + upc.value);
    console.log("combinedPosts 2: " + combinedPosts);
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

</script>

<template>
<div><!-- MAIN -->
    <div> <!-- FEED HEADER -->
      <h2 class="align-middle p-6 text-3xl text-weiss border-b-grau2 border-b ">Profile</h2>
    </div>
  <div>
    <div class="text-weiss p-4"> <!-- PROFILE-->
      <div class="flex justify-center">
        <img src="../../assets/danielvici_pp.png" alt="" class="size-48 rounded-full"/>
      </div>
      <div class="text-center p-5 flex flex-col">
        <label class="text-xl font-bold m-1 text-weiss">danielvici123</label>
        <label class="text-base m-1 text-grau2">@danielvici</label>
      </div>
      <div class="text-grau2 p2 text-center">
        <label class="text-base m-1 p-2"> Followers <a class="text-weiss">151</a></label>
        <label class="text-base m-1 p-2"> Following <a class="text-weiss">2625</a></label>
      </div>
    </div>
  </div>

  <div> <!-- POSTS -->
    <div>
      <h2 class="align-middle  mt-4 p-6 text-2xl text-weiss border-y-grau2 border-y ">Posts (x)</h2>
    </div>
    <ul>
      <li v-for="(postitem, indexus) in upc" :key="postitem.user_id" class="border-2 border-b-grau2 p-3 flex">
        <!-- POST -->
        <img src="../../assets/danielvici_pp.png" alt="" class="rounded-full w-16 h-16">
        <div>
          <div> <!-- POST HEADER -->
            <label class="text-lg font-bold m-1 text-weiss">{{postitem.author_display_name}}</label>
            <label class="text-base m-1 text-grau2">@{{ postitem.author_username }}</label>
          </div>
          <div class="m-2"> <!-- POST CONTENT -->
            <p class="text-sm m-1 text-weiss">{{ postitem.content }}</p>
          </div>
          <div class="flex"> <!-- POST FOOTER -->
            <div class="flex"> <!-- Comments -->
              <img src="../../assets/icons/comment.png" alt="" class="rounded-full align-middle">
              <label class="text-sm m-1 text-weiss" v-if="postitem.comments_count != undefined">{{ postitem.comments_count }}</label>
              <label class="text-sm m-1 text-weiss" v-else>Comments disabled</label>
            </div>

            <div class="flex items-center" @click="addLike(postitem.post_id, postitem.user_id, indexus)"> <!-- Likes -->
              <img alt="" src="../../assets/icons/herz.png" class="align-middle">
              <label class="text-sm m-1 text-weiss">{{ postitem.likes }}</label>
            </div>

            <div class="flex items-center mx-2"> <!-- View Post -->
              <router-link :to="{ name: 'PostDetail', params: { id: postitem.id } }" class="text-weiss">View Post</router-link>
            </div><!-- ENDE -->
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<style scoped>

</style>
