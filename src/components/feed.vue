<script setup lang="ts">
  import { ref } from "vue";
  import {valueOf} from "tailwindcss";
  const post = ref([
    {id: 1,
      profile_picture: "@/assets/default_pp.png",
      author_display_name: "Linux Enjoyer",author_username: "lunix",
      content:"I love Linux. My Favorite Linux Distro is ARCH LINUX.",
      comments_count: 1, likes: 5},
    {id: 2,
      profile_picture: "@/assets/default_pp.png",
      author_display_name: "XBOX",author_username: "Xbox",
      content: "Call of Duty: Black Ops 6 is OUT NOW.",
      comments_count: 500000, likes: 100000},
    {id: 3,
      profile_picture: "@/assets/default_pp.png",
      author_display_name: "JETBrains",author_username: "Jetbrains",
      content: "BLI BLA BLUB. Jetbrains is the best IDE." ,
      comments_count: 5000, likes: 1000},
    {id: 4,
      profile_picture: "@/assets/default_pp.png",
      author_display_name: "GITHUB", author_username: "GitHub",
      content: "GitHub Copilot got an massive update. Check out the new features.",
      comments_count: 1500000, likes: 500000},
    {id: 5,
      profile_picture: "@/assets/danielvici_pp.png",
      author_display_name: "danielvici123", author_username: "danielvici",
      content: "I created this WebApp with VUE3 and TailwindCSS. It was a lot of fun.",
      comments_count: undefined, likes: 532844},
    {id: 6,
      profile_picture: "@/assets/default_pp.png",
      author_display_name: "Microsoft", author_username: "Microsoft",
      content: "Windows 11 24H2 is out now. Learn more here: https://www.microsoft.com",
      comments_count: 500000, likes: 100000},
    {id: 7,
      profile_picture: "@/assets/default_pp.png",
      author_display_name: "Apple", author_username: "Apple",
      content: "The new iPhone 16 is out now. Everything you need to know: https://www.apple.com",
      comments_count: 500000, likes: 100000},
  ])

  const addLike = (index) => {
    post.value[index].likes += 1;
    console.log("New Like Amount: ", post.value[index].likes);

  }
</script>

<template>
  <div class="p-2"> <!-- MAIN -->
    <div class="bg-grau-hell rounded-lg"> <!-- HEADER -->
      <h2 class="align-middle m-2 text-xl p-1">Your Feed</h2>
    </div>
    <div> <!-- CONTENT -->
      <ul>
        <li v-for="(postitem, indexus) in post" :key="post" class="border border-b-grau-hell rounded-lg p-1 m-2 bg-grau-hell2 flex">
          <!-- POST -->
          <img src="@/assets/default_pp.png" alt="" class="w-16 h-16">
          <div>
            <div> <!-- POST HEADER -->
              <label class="text-lg font-bold m-1">{{postitem.author_display_name}}</label>
              <label class="text-base m-1 text-logo-farbe-blau underline-offset-3">@{{ postitem.author_username }}</label>
            </div>
            <div class="m-2"> <!-- POST CONTENT -->
              <p class="text-sm m-1">{{ postitem.content }}</p>
            </div>
            <div class="flex "> <!-- POST FOOTER -->
              <div class="flex"> <!-- Comments -->
                <img src="@/assets/icons/comment.png" alt="" class="align-middle">
                <label class="text-sm m-1" v-if="postitem.comments_count != undefined">{{ postitem.comments_count }}</label>
                <label class="text-sm m-1" v-else>Comments disabled</label>
              </div>

              <div class="flex items-center" @click="addLike(indexus)"> <!-- Likes -->
                <img type="image" alt="" src="@/assets/icons/herz.png" class="align-middle">
                <label class="text-sm m-1">{{ postitem.likes }}</label>
              </div><!-- ENDE -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
