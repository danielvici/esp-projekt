<script setup lang="ts">
  import { ref } from "vue";
  // import {valueOf} from "tailwindcss";
  const post = ref([
    {id: 1,
      profile_picture: "../../assets/default_pp.png",
      author_display_name: "Linux Enjoyer",author_username: "lunix",
      content:"I love Linux. My Favorite Linux Distro is ARCH LINUX.",
      comments_count: 1, likes: 5},
    {id: 2,
      profile_picture: "../../assets/default_pp.png",
      author_display_name: "XBOX",author_username: "Xbox",
      content: "Call of Duty: Black Ops 6 is OUT NOW.",
      comments_count: 500000, likes: 100000},
    {id: 3,
      profile_picture: "../../assets/default_pp.png",
      author_display_name: "JETBrains",author_username: "Jetbrains",
      content: "BLI BLA BLUB. Jetbrains is the best IDE." ,
      comments_count: 5000, likes: 1000},
    {id: 4,
      profile_picture: "../../assets/default_pp.png",
      author_display_name: "GITHUB", author_username: "GitHub",
      content: "GitHub Copilot got an massive update. Check out the new features.",
      comments_count: 1500000, likes: 500000},
    {id: 5,
      profile_picture: "../../assets/danielvici_pp.png",
      author_display_name: "danielvici123", author_username: "danielvici",
      content: "I created this WebApp with VUE3 and TailwindCSS. It was a lot of fun.",
      comments_count: undefined, likes: 532844},
    {id: 6,
      profile_picture: "../../assets/default_pp.png",
      author_display_name: "Microsoft", author_username: "Microsoft",
      content: "Windows 11 24H2 is out now. Learn more here: https://www.microsoft.com",
      comments_count: 500000, likes: 100000},
    {id: 7,
      profile_picture: "../../assets/default_pp.png",
      author_display_name: "Apple", author_username: "Apple",
      content: "The new iPhone 16 is out now. Everything you need to know: https://www.apple.com",
      comments_count: 500000, likes: 100000},
  ])

  const addLike = (index: number) => {
    post.value[index].likes += 1;
    console.log("New Like Amount: ", post.value[index].likes);

  }
  function post_publish_func(text:string) {
    console.log("Post: ", text);
    if (text === undefined || text === "") {
      console.log("Post is empty");
      alert("Post is empty");
      return;
    } else {
      console.log("Post is not empty");
      post.value.push({id: post.value.length + 1, profile_picture: "../../assets/danielvici_pp.png", author_display_name: "ADMIN", author_username: "esp_admin", content: text, comments_count: undefined, likes: 0});

    }
  }
</script>

<template>
  <div class="border-x-2 border-x-grau2"> <!-- MAIN -->
    <div> <!-- FEED HEADER -->
      <h2 class="align-middle p-6 text-xl font-bold text-grau2 border-b-grau2 border-b ">Feed</h2>
      <!-- POSTING-->
      <div class="flex border-2 border-b-grau2">
        <img src="../../assets/danielvici_pp.png" alt="" class="p-2 rounded-full w-16 h-16">
        <form>
          <!-- post_publish ist richtig aber wird falsch angezeigt. File Input geht nicht-->
          <textarea v-model="post_publish" name="post_text" class="bg-hintergrund-farbe rounded-lg m-2 p-1 focus:outline-none text-grau2 w-200p resize-none" rows="3" placeholder="Write something..."></textarea>
          <div class="">
            <input class="text-weiss" type="file" accept=".png, .jpg, .jpeg">
            <button id="post_publish" name="post_publishss" class="text-weiss p-1 m-2 rounded-lg py-3 px-5 bg-button-farbe" @click.prevent="post_publish_func(post_publish)" type="button">Post</button>
          </div>
          </form>
      </div>
    </div>


    <div> <!-- CONTENT -->
      <ul>
        <li v-for="(postitem, indexus) in post" :key="post" class="border-2 border-b-grau2 p-3 flex">
          <!-- POST -->
          <img src="../../assets/default_pp.png" alt="" class="rounded-full w-16 h-16">
          <div>
            <div> <!-- POST HEADER -->
              <label class="text-lg font-bold m-1 text-weiss">{{postitem.author_display_name}}</label>
              <label class="text-base m-1 underline-offset-3 text-grau2">@{{ postitem.author_username }}</label>
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
              </div><!-- ENDE -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
