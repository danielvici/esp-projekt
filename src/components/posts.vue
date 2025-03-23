<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navigationbar from './home_components/navigationbar.vue';
import Contacts from './home_components/contacts.vue';
import Legal from './home_components/legal.vue';
import router from '../router';
import {consoleLog} from "vite-plugin-checker/dist/logger";

interface Post {
  post_uuid: number;
  user_id: number;
  author_username: string;
  post_text: string;
  likes: number;
  comments_count: number;
  comments: any[];
  created_at: string;
}

interface User {
  user_id: number;
  username: string;
  displayname: string;
}

interface Comment {
  comment_uuid: number;
  user_id: number;
  post_id: number;
  comment_text: string;
  created_at: string;
  displayname: string;
  username: string;
}

const post = ref<Post | null>(null);
const user = ref<User | null>(null);
const comments = ref<Comment[] | null>(null);

onMounted(async () => {
  const post_id = localStorage.getItem('viewedpost');
  console.log(post_id);
  if (post_id === null) {
    alert('No post selected. You will be redirected to the feed.');
    await router.push('/');
    return;
  }

  getPost(parseInt(post_id));
  getComment(parseInt(post_id));
});



async function getPost(post_id: number) {
  try {
    const post_response =  await fetch(`http://localhost:8000/api/post/${post_id}`, { method: 'GET' });
    const fetchedPost: Post = await post_response.json();

    const user_response = await fetch('http://localhost:8000/api/users', { method: 'GET' });
    const usersDATA = await user_response.json();

    const postAuthor = usersDATA.find(user => user.user_id === fetchedPost.user_id);
    if (postAuthor) {
      console.log("The post was written by:", postAuthor);
    } else {
      console.error("Author not found.");
    }

    user.value = postAuthor;
    post.value = fetchedPost;
    console.log(post.value);
  } catch (e) {
    console.error(e);
  }
}


async function getComment(post_id: number) {
  try {
    const comments_response = await fetch(`http://localhost:8000/api/post/${post_id}/comments`, { method: 'GET' });
    const fetchedComments: Comment[] = await comments_response.json();

    const user_response = await fetch(`http://localhost:8000/api/users`, { method: 'GET' });
    const usersDATA: User[] = await user_response.json();

    comments.value = fetchedComments.map(comment => ({
      ...comment,
      author: usersDATA.find(user => user.user_id === comment.user_id) || null
    }));

    console.log(comments.value);
  } catch (e) {
    console.error(e);
  }
}

</script>

<template>
  <div id="main" class="bg-hintergrund-farbe flex">
    <div id="left" class="w-72">
      <navigationbar></navigationbar>
    </div>
    <div class="text-weiss w-100p border-x border-x-grau2" v-if="post">
      <div> <!-- HEADER -->
        <h2 class="align-middle p-6 text-3xl text-weiss border-b-grau2 border-b">Post</h2>
      </div>


      <div class="flex px-2 py-4 border-b-grau2 border-b">
        <img src="../assets/default_pp.png" alt="" class="rounded-full w-16 h-16">
        <div>
          <div> <!-- POST HEADER -->
            <label class="text-lg font-bold m-1 text-weiss">{{user.displayname}}</label>
            <label class="text-base m-1 text-grau2">@{{ user.username }} | </label>
            <label class="text-base text-grau2"> Posted at {{ post.created_at }}</label>
          </div>
          <div class="m-2"> <!-- POST CONTENT -->
            <p class="text-sm m-1 text-weiss">{{ post.post_text }}</p>
          </div>
          <div class="flex"> <!-- POST FOOTER -->
            <div class="flex"> <!-- Comments -->
              <img src="../assets/icons/comment.png" alt="" class="rounded-full align-middle">
              <label class="text-sm m-1 text-weiss" v-if="post.comments != undefined">{{ post.comments }}</label>
              <label class="text-sm m-1 text-weiss" v-else>Comments disabled</label>
            </div>

            <div class="flex items-center" @click="addLike(post.post_uuid)"> <!-- Likes -->
              <img alt="" src="../assets/icons/herz.png" class="align-middle">
              <label class="text-sm m-1 text-weiss">{{ post.likes }}</label>
            </div>
          </div>
        </div>
      </div>


      <div> <!-- COMMENTS VIEW and WRITE -->
        <div>
          <h2 class="align-middle p-6 text-xl text-weiss border-b-grau2 border-b">Comments</h2>
        </div>

        <div> <!-- WRITE COMMENTS -->

        </div>

        <div> <!-- VIEW COMMENTS -->
          <div> <!-- VIEW COMMENTS -->
            <div v-if="comments && comments.length > 0">
              <div v-for="c in comments" :key="c.comment_uuid" class="p-4 border-b border-gray-700">
                <p class="text-sm text-weiss">{{ c.author?.displayname || 'Unknown' }}: {{ c.comment_text }}</p>
              </div>
            </div>
            <div v-else class="p-4 text-gray-400">No comments yet.</div>
          </div>




        </div>
      </div>
    </div>
    <div class="w-1/4">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>
</style>

