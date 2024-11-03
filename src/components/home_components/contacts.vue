<script setup lang="ts">
const contacts =[
    {display_name: "Linux Enjoyer", username: "lunix"},
    {display_name: "XBOX", username: "Xbox"},
    {display_name: "JETBrains", username: "Jetbrains"},
]
</script>

<template>
  <div class="p-2 border-b-2 border-b-grau2"> <!--MAIN-->
    <div> <!--HEADER-->
      <h2 class="align-middle m-2 text-xl p-1 pb-4 text-weiss">Contacts</h2>
    </div>
    <div> <!--CONTENT-->
      <ul class="space-y-1">
        <li v-for="(contact) in contacts" :key="contact" class="flex rounded-lg">
          <!--CONTACT-->
          <img src="../../assets/default_pp.png" alt="" class="w-12 h-12 mr-2">
          <div class="">
            <label class=" font-bold m-1 text-weiss">{{ contact.display_name }}</label><br>
            <p class="text-base m-1 text-grau2 underline-offset-3">@{{ contact.username }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>