<script setup lang="ts">
import {ref} from "vue";

const hashtags = [ // DIESE HASTAGS SIND NUR FÜR DIE TRANDING DA
  {id: 8,name: "gym", nr_posts: 2144, category: "Lifestyle"},
  {id: 1,name: "xbox", nr_posts: 553,category: "Gaming" } ,
  {id: 2,name: "lol" , nr_posts: 16422, category: "Gaming"},
  {id: 7,name: "jetbrains", nr_posts: 1251, category: "Programming"},
  {id: 4,name: "github", nr_posts: 464, category: "Programming"},
  {id: 5,name: "r6",nr_posts: 4463, category: "Gaming"},
  {id: 6,name: "25" , nr_posts: 123, category: "Numbers"},
  {id: 3,name: "minecraft", nr_posts: 466, category: "Gaming"},
  {id: 9,name: "tiktok", nr_posts: 215474, category: "social media"},
];

const dinge = ref([ // SUCH DINGER
  {id: 1, username: "danielvici123", displayname: "danielvici223", type: "user", like:0},
  {id: 2, text_content: "My First Post on ESP", comments: 24,like: 2151, author: "danielvici123", author_id: 1, type: "post"},
  {id: 3, hashtag:"civ6", posts: 123, category: "Gaming", type: "hashtag" ,like:0},
  {id: 5, username: "xbox_official", displayname: "xbox", type: "user" ,like:0},
  {id: 4, username: "jetbrains", displayname: "jetbrains", type: "user" ,like:0},
  {id: 6, text_content: "xbox is the best platform", comments: 24,like: 2151, author: "xbox", author_id: 5, type: "post"},
  {id: 7, text_content: "webstorm x.x is out now! Check it out!", comments: 24,like: 2151, author: "jetbrains", author_id: 4, type: "post"},
  {id: 8, hashtag:"civ7", posts: 514, category: "Gaming", type: "hashtag" ,like:0},
]);

// HASTAGS
let most_posts_hashtags = [];

hashtags.sort((a, b) => {
  return b.nr_posts - a.nr_posts;
})

most_posts_hashtags = hashtags.slice(0, 3);

function addLike(index: number) {
  dinge.value[index].like += 1; // damit das geht haben hastags und user likes.
  console.log("New Like Amount: ", dinge.value[index].like);
}

console.log(most_posts_hashtags);

// FEED mit filter und suche

let feed = ref([]);
let feed2 = ref([]);

interface search_filter {
  u: boolean; // user
  h: boolean; // hastag
  p: boolean; // posts
}
// Standard filter
const search_filter_status = ref<search_filter>({
  u: true, // user default: true
  h: true, // hastag default: true
  p: true, // posts default: true
});

let usr_search;

for(let i =0; i < dinge.value.length; i++) {
  console.log("Getting Notifications...");
  feed.value.push(dinge.value[i]);
}

function go_fs(){
  console.log("These Filter applied: ", JSON.stringify(search_filter_status.value));
  feed.value = [];
  feed2.value = [];


  dinge.value.forEach((dinge) => {
    if ((search_filter_status.value.u == true && dinge.type === "user") || (search_filter_status.value.h == true && dinge.type === "hashtag")|| (search_filter_status.value.p == true && dinge.type === "post")){
      feed2.value.push(dinge);
    }
  })
  let i = 0;
  if (usr_search == undefined) {
    feed = feed2;
    return;
  } else {
    feed2.value.forEach(() => {
      switch (feed2.value[i].type) {
        case "user":
          if (feed2.value[i].displayname.includes(usr_search) || feed2.value[i].username.includes(usr_search)) {
            feed.value.push(feed2.value[i]);
          }
          console.log("User: ", feed2.value[i].displayname);
          break;
        case "post":
          if (feed2.value[i].text_content.includes(usr_search) || feed2.value[i].author.includes(usr_search)) {
            feed.value.push(feed2.value[i]);
          }
          console.log("Post: ", feed2.value[i]);
          break;
        case "hashtag":
          if (feed2.value[i].hashtag.includes(usr_search)) {
            feed.value.push(feed2.value[i]);
          }
          console.log("Hashtag: ", feed2.value[i].hashtag);
          break;
        default:
          console.log("No Results Found");
          break;
      }
      i++;
    })
  }


  console.log("Feed:", feed.value);
}


</script>
<template>
<div>
  <div class="flex justify-center"> <!-- Search-->
    <div class="w-1/2">
      <form @submit.prevent="go_fs">
        <input type="text" placeholder="Search..." class="w-full m-2 mt-6 p-4 bg-grau-dunkel focus:outline-none rounded-xl placeholder:text-center text-center" v-model="usr_search">
        <div class="flex justify-center text-grau2">
          <label class="m-2 accent-logo-farbe-blau"><input type="checkbox" class="mr-1" v-model="search_filter_status.u">User</label>
          <label class="m-2 accent-logo-farbe-rot" ><input type="checkbox" class="mr-1" v-model="search_filter_status.h">Hashtag</label>
          <label class="m-2 accent-logo-farbe-lila"><input type="checkbox" class="mr-1" v-model="search_filter_status.p">Post</label>
          <button class="px-1 text-weiss rounded-lg">Filter</button>
        </div>
      </form>
    </div>
  </div>

  <div> <!-- TRENDING HASHTAGS -->
    <a class="text-2xl flex justify-center mt-4">Trending</a>
    <ul class="flex justify-center ">
      <li v-for="(bing, i) in most_posts_hashtags" :key="bing.id" class="w-2/12">
        <div class="p-5 mt-4 border-b-grau2 border-b">
          <p class="text-sm m-1 text-grau2">{{ i+1 }} - {{ bing.category}}</p>
          <h1 class="text-xl font-bold m-1 text-weiss">#{{ bing.name }}</h1>
          <p class="text-sm m-1 text-grau2">{{ bing.nr_posts }} posts</p>
        </div>
      </li>
    </ul>
  </div>
  <!-- ### ### ### ### ### ### ### -->
  <div>
    <div>
      <a class="text-2xl flex justify-center mt-4">Result(s):</a> <!-- RESULTS -->
    </div>
    <div v-if="feed.length > 0">
      <div v-for="(bing, i) in feed" :key="bing" class=""> <!-- SEARCH RESULTS -->
        <div v-if="bing.type === 'user'" class="pt-2 p-3 border-b-grau2 border-b"> <!-- USER RESULT -->
          <div class="flex">
            <img src="/src/assets/default_pp.png" alt="profile picture" class="rounded-full w-16 h-16">
            <div class="">
              <a class="text-lg m-1">{{ bing.displayname }}</a>
              <a class="text-base m-1 text-grau2">@{{ bing.username }}</a>
              <div><a class=" text-sm m-3 text-weiss">my cool bio</a></div>
            </div>
          </div>
        </div>
        <!-- ### ### -->
        <div v-else-if="bing.type === 'post'" class="flex p-3 border-b-grau2 border-b " > <!-- POST RESULT-->
          <img src="../../assets/default_pp.png" alt="" class="rounded-full w-16 h-16">
          <div>
            <div> <!-- POST HEADER -->
              <label class="text-lg m-1 text-weiss">{{bing.author}}</label>
              <label class="text-base m-1 text-grau2">@username</label>
            </div>
            <div class="m-2"> <!-- POST CONTENT -->
              <p class="text-sm m-1 text-weiss">{{ bing.text_content }}</p>
            </div>
            <div class="pt-2">
              <div class="flex"> <!-- POST FOOTER -->
                <div class="flex"> <!-- Comments -->
                  <img src="../../assets/icons/comment.png" alt="" class="rounded-full align-middle">
                  <label class="text-sm m-1 text-weiss" v-if="bing.comments != undefined">{{ bing.comments }}</label>
                  <label class="text-sm m-1 text-weiss" v-else>Comments disabled</label>
                </div>

                <div class="flex items-center" @click="addLike(i)"> <!-- Likes -->
                  <img alt="" src="../../assets/icons/herz.png" class="align-middle">
                  <label class="text-sm m-1 text-weiss">{{ bing.like }}</label>
                </div>
              </div>
            </div>
          </div>
        </div><!-- ENDE -->
        <!-- ### ### -->
        <div v-else-if="bing.type === 'hashtag'"> <!-- HASHTAG RESULT-->
          <div class="p-3 border-b-grau2 border-b">
            <h1 class="text-xl font-bold m-1 text-weiss">#{{ bing.hashtag }}</h1>
            <p class="text-sm m-1 text-grau2">{{ bing.posts }} posts - {{ bing.category}}</p>
          </div>
        </div>

        <!-- ### ### -->
        <div v-else> <!-- NO RESULT-->
          <div class="p-3 border-b-grau2 border-b">
            <h1 class="text-xl font-bold m-1 text-weiss">No Results Found</h1>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center">
      <a class="text-xl text-logo-farbe-rot p-10 text-center">No Results Found!</a>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>