<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import Navigationbar from './home_components/navigationbar.vue';
import Contacts from './home_components/contacts.vue';
import Legal from './home_components/legal.vue';

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
  comment_id: number;
  author_user_id: number;
  post_id: number;
  text: string;
  likes: number;
  created_at: string;
  displayname: string;
  username: string;
}

const route = useRoute();
const router = useRouter();

const post = ref<Post | null>(null);
const user = ref<User | null>(null);
const comments = ref<Comment[] | null>(null);
let comment_text = ref();
let self_id;

const loading = ref(true);

let post_uuid = ref();


async function getPost(post_id: any) {
  try {
    const post_response = await fetch(`http://localhost:8000/api/post/${post_id}`, {method: 'GET'});
    const fetchedPost: Post = await post_response.json();

    if (post_response.status === 404) {
      console.error("No comments found.");
      alert("Post not found")
      await router.push('/');
      return;
    }

    const user_response = await fetch('http://localhost:8000/api/users', {method: 'GET'});
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
  } finally {
    loading.value = false;
  }
}

async function getComment(post_id: any) {
  try {
    const comments_response = await fetch(`http://localhost:8000/api/post/${post_id}/comments`, { method: 'GET' });
    const fetchedComments: Comment[] = await comments_response.json();

    const user_response = await fetch(`http://localhost:8000/api/users`, { method: 'GET' });
    const usersDATA: User[] = await user_response.json();

    if(comments_response.status === 404 || user_response.status === 404) {
      console.error("ERRROR");
      alert("Error try it again later.");
      await router.push('/');
      return;
    }

    comments.value = fetchedComments.map(comment => {
      const author = usersDATA.find(u => u.user_id === comment.author_user_id) || {
        username: 'Unknown',
        displayname: 'Unknown',
      };

      return {
        ...comment,
        username: author.username,
        displayname: author.displayname,
      };
    });

    comments.value.sort((a, b) => b.post_id - a.post_id);

    console.log(comments.value);
  } catch (e) {
    console.error(e);
  }
}

function copyLink(post_id: string | number) {
  const tocopy = `http://localhost:5173/post/${post_id}`;
  navigator.clipboard.writeText(tocopy);
  alert("Copied to clipboard");
}

async function addLike() { // Post liken
  try {
    post.value.likes++;
    const response_like = await fetch(`http://localhost:8000/api/post/${post_uuid.value}/like`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: `{"userId":${self_id}}`,
    });

    if(response_like.status === 404) {
      console.error("ERROR");
      await router.push('/');
      return;
    }

    const data = await response_like.json();

    console.log("post_id 2: ", post_uuid);
    return data;
  } catch (error) {
    console.error('Fehler beim Liken des Posts:', error);
    throw error;
  }
}

async function comment_create_text(comment_text: string) {
  if (comment_text === null) {
    alert("Please write something before commenting.");
    return;
  }
  try {
    const response = await fetch(`http://localhost:8000/api/post/${post_uuid.value}/comment`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: `{"userId":${self_id},"text":"${comment_text}"}`,});

    const data = await response.json();

    if(response.status === 404) {
      console.error("ERROR");
      await router.push('/');
      return;
    }

    await getComment(parseInt(post_uuid.value));
    return data;
  } catch (error) {
    console.error(error);
  }
  console.log(comment_text);
}

async function addLike_comment(comment_id: number | string) {
  try {
    post.value.likes++;
    const response_like = await fetch(`http://localhost:8000/api/comment/${comment_id}/like`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: `{"userId":${self_id}}`,
    });

    if(response_like.status === 404) {
      console.error("ERROR");
      await router.push('/');
      return;
    }

    const data = await response_like.json();

    console.log("post_id: ", comment_id);
    console.log(data);
    getComment(parseInt(post_uuid.value));
    return data;
  } catch (error) {
    console.error('Fehler beim Liken des Posts:', error);
    throw error;
  }
}

function gotoProfile(user_id: string | number) {
  router.push(`/profile/${user_id}`);
}

onMounted(async () => {
  console.log("PARAMS: "+ route.path);
  const pathArray = route.path.split('/');
  console.log(pathArray);

  if (pathArray.length > 2) {
    post_uuid.value = pathArray[2];
    console.log("post_id 0: ", post_uuid.value);
  }

  if (!post_uuid) {
    alert('No post selected. Redirecting to feed.');
    await router.push('/');
    return;
  }
  self_id = localStorage.getItem('self_id');
  getPost(parseInt(post_uuid.value));
  getComment(parseInt(post_uuid.value));
});
</script>

<template>
  <div id="main" class="bg-hintergrund-farbe sm:flex overflow-y-auto sm:h-full sm:scrollbar">
    <div id="left" class="sm:w-72 min-w-72">
      <navigationbar></navigationbar>
    </div>
    <div class="text-weiss sm:w-100p w-screen sm:border-x sm:border-x-grau2" v-if="post">
      <div> <!-- HEADER -->
        <h2 class="align-middle p-6 text-3xl text-weiss border-b-grau2 border-b">Post</h2>
      </div>


      <div class="flex px-2 py-4 border-b-grau2 border-b">
        <img v-if="user.username != 'danielvici' " src="../assets/default_pp.png" alt="" class="rounded-full w-16 h-16">
        <img v-else src="../assets/danielvici_pp.png" alt="" class="rounded-full w-16 h-16">
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
            <div class="flex items-center" @click="addLike()"> <!-- Likes -->
              <img alt="" src="../assets/icons/herz.png" class="align-middle">
              <label class="text-sm m-1 text-weiss">{{ post.likes }}</label>
            </div>
            <button @click="copyLink(post_uuid)" class="text-schwarz  pl-1 mx-1 px-1 rounded-lg bg-button-farbe">Share Post</button>
          </div>
        </div>
      </div>


      <div> <!-- COMMENTS VIEW and WRITE -->
        <div>
          <h2 class="align-middle p-6 text-xl text-weiss border-b-grau2 border-b">Comments</h2>
        </div>

        <div> <!-- WRITE COMMENTS -->
          <div class="flex border-b-2 border-b-grau2">
            <img v-if="self_id != '99' " src="../assets/default_pp.png" alt="" class="p-2 rounded-full w-16 h-16">
            <img v-else src="../assets/danielvici_pp.png" alt="" class="p-2 rounded-full w-16 h-16">
             <!-- <img src="../assets/danielvici_pp.png" alt="" class="p-2 rounded-full w-16 h-16">-->
            <form class="w-full pr-5">
              <!-- post_publish ist richtig aber wird falsch angezeigt. File Input geht nicht-->
              <textarea v-model="comment_text" name="post_text" class="bg-hintergrund-farbe rounded-lg m-2 p-1 focus:outline-none text-grau2 w-full resize-none" rows="3" placeholder="Write something..."></textarea>
              <div class="">
                <button id="post_publish" name="post_publishss" class="text-weiss p-1 m-2 rounded-lg py-3 px-5 bg-button-farbe" @click.prevent="comment_create_text(comment_text)" type="button">Post</button>
              </div>
            </form>
          </div>
        </div>

        <div> <!-- VIEW COMMENTS -->
          <div class="sm:overflow-y-scroll h-[450px]"> <!-- VIEW COMMENTS -->
            <ul v-if="comments && comments.length > 0">
              <li v-for="c in comments" :key="c.comment_id" class="p-4 border-b border-gray-700">
                <div class="flex">
                  <img v-if="c.author_user_id != '99' " src="../assets/default_pp.png" alt="" class="p-2 rounded-full w-16 h-16">
                  <img v-else src="../assets/danielvici_pp.png" alt="" class="p-2 rounded-full w-16 h-16">
                  <div>
                    <div> <!-- POST HEADER -->
                      <label class="text-lg font-bold m-1 text-weiss">{{c.displayname}}</label>
                      <label class="text-base m-1 text-grau2">@{{ c.username }}</label>
                    </div>
                    <div class="m-2"> <!-- POST CONTENT -->
                      <p class="text-sm m-1 text-weiss">{{ c.text }}</p>
                    </div>
                    <div class="flex"> <!-- POST FOOTER -->

                      <div class="flex items-center" @click="addLike_comment(c.comment_id)"> <!-- Likes -->
                        <img alt="" src="../assets/icons/herz.png" class="align-middle">
                        <label class="text-sm m-1 text-weiss">{{ c.likes }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div v-else class="p-4 text-gray-400">No comments yet.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sm:w-1/4 w-screen">
      <contacts></contacts>
      <legal></legal>
    </div>
  </div>
</template>

<style scoped>
</style>

