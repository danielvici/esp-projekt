<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const profile = ref(null);


const post = ref([
  {id: 541242,
    profile_picture: "../../assets/danielvici_pp.png",
    author_display_name: "danielvici123", author_username: "danielvici",
    content: "I created this WebApp with VUE3 and TailwindCSS. It was a lot of fun.",
    comments_count: undefined, likes: 532844},
  {id: 145,
    profile_picture: "../../assets/danielvici_pp.png",
    author_display_name: "danielvici123", author_username: "danielvici",
    content: "I like Animes. I use Anilist to track them.",
    comments_count: undefined, likes: 5325466844},
  {id: 246,
    profile_picture: "../../assets/danielvici_pp.png",
    author_display_name: "danielvici123", author_username: "danielvici",
    content: "sfsafhffgf",
    comments_count: undefined, likes: 5},

])

onMounted(async () => {
  const countPosts = post.value.length;
});
//Wird bearbeitet wenn API dazu da ist.
/*
function fetchProfile(userId) {
  return fetch(`/api/profile/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
}

onMounted(async () => {
  const userId = route.params.id;
  try {
    const data = await fetchProfile(userId);
    profile.value = data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
});
router.beforeEach((to, from, next) => {
  if ((from.name === 'Feed' || from.name === 'Settings') && to.name === 'Profile') {
    // Set profile to 'danielvici123'
    fetchProfile('danielvici123')
        .then(data => {
          profile.value = data;
          next();
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
          next();
        });
  } else {
    next();
  }
});
*/

function addLike(index: number) {
  post.value[index].likes += 1;
  console.log("New Like Amount: ", post.value[index].likes);
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
      <li v-for="(postitem, indexus) in post" :key="post" class="border-2 border-b-grau2 p-3 flex">
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

            <div class="flex items-center" @click="addLike(indexus)"> <!-- Likes -->
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
