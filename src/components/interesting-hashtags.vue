<script setup lang="ts">

const hashtags = [
  {id: 1,name: "xbox", nr_posts: 553 } ,
  {id: 2,name: "lol" , nr_posts: 16422},
  {id: 7,name: "jetbrains", nr_posts: 1251},
  {id: 4,name: "github", nr_posts: 464},
  {id: 5,name: "craftattack12",nr_posts: 4463},
  {id: 6,name: "25" , nr_posts: 123},
  {id: 3,name: "minecraft", nr_posts: 466},
]

hashtags.sort((a, b) => {
  return b.nr_posts - a.nr_posts;
})
</script>

<template>
  <div class="p-2"> <!-- MAIN -->
    <div class="bg-grau-hell rounded-lg"> <!-- HEADER -->
      <h2 class="align-middle m-2 text-xl p-1">Trending Hashtags:</h2>
    </div>
    <div class="bg-grau-hell2"> <!-- CONTENT -->
      <ul>
        <li v-for="(hashtags) in hashtags " :key="hashtags">
          <!-- HASHTAGS-->
          <h1 class="text-lg font-bold m-1">#{{ hashtags.name }}</h1>
          <p class="text-sm m-1">{{ hashtags.nr_posts }} posts</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>