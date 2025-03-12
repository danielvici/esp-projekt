<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navigationbar from "./home_components/navigationbar.vue";
import Contacts from "./home_components/contacts.vue";
import Legal from "./home_components/legal.vue";

const route = useRoute();
const post = ref(null);

onMounted(async () => {
  const postId = route.params.id;
  try {
    const response = await fetch(`/api/posts/${postId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    post.value = data;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
});
</script>

<template>
  <div id="main" class="bg-hintergrund-farbe flex">
    <div id="left" class="border border-b-grau w-72">
      <navigationbar></navigationbar>
    </div>
    <div>
      <div v-if="post">
        <h2>{{ post.author_display_name }}</h2>
        <p>@{{ post.author_username }}</p>
        <p>{{ post.content }}</p>
        <p>Likes: {{ post.likes }}</p>
        <p v-if="post.comments_count !== undefined">Comments: {{ post.comments_count }}</p>
        <p v-else>Comments disabled</p>
      </div>
      <div v-else>
        <p class="text-5xl text-weiss">Loading post...</p>
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