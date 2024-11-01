<script setup lang="ts">

const hashtags = [
  {id: 1,name: "xbox", nr_posts: 553,category: "Gaming" } ,
  {id: 2,name: "lol" , nr_posts: 16422, category: "Gaming"},
  {id: 7,name: "jetbrains", nr_posts: 1251, category: "Programming"},
  {id: 4,name: "github", nr_posts: 464, category: "Programming"},
  {id: 5,name: "craftattack12",nr_posts: 4463, category: "Gaming"},
  {id: 6,name: "25" , nr_posts: 123, category: "Numbers"},
  {id: 3,name: "minecraft", nr_posts: 466, category: "Gaming"},
]

hashtags.sort((a, b) => {
  return b.nr_posts - a.nr_posts;
})
</script>

<template>
  <div class="p-2"> <!-- MAIN -->
    <!-- HEADER -->
    <h2 class="align-middle m-2 text-2xl p-1 text-weiss font-bold">Trending</h2>
    <div> <!-- CONTENT -->
      <ul>
        <li v-for="(hashtags, index) in hashtags " :key="hashtags" class="p-2">
          <!-- HASHTAGS-->
          <p class="text-sm m-1 text-grau2">{{ index+1 }} - {{ hashtags.category}}</p>
          <h1 class="text-xl font-bold m-1 text-weiss">#{{ hashtags.name }}</h1>
          <p class="text-sm m-1 text-grau2">{{ hashtags.nr_posts }} posts</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>