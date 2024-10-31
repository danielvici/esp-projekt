<script setup lang="ts">
const contacts =[
    {display_name: "Linux Enjoyer", username: "lunix"},
    {display_name: "XBOX", username: "Xbox"},
    {display_name: "JETBrains", username: "Jetbrains"},
]
</script>

<template>
  <div class="p-2"> <!--MAIN-->
    <div class="bg-grau-hell rounded-lg"> <!--HEADER-->
      <h2 class="align-middle m-2 text-xl p-1">Contacts</h2>
    </div>
    <div> <!--CONTENT-->
      <ul class="space-y-1">
        <li v-for="(contact) in contacts" :key="contact" class="bg-grau-hell2 flex justify-between rounded-lg">
          <!--CONTACT-->
          <img src="../assets/default_pp.png" alt="" class="w-16 h-16 mr-2">
          <div class="flex flex-col">
            <label class="text-lg font-bold m-1" >{{ contact.display_name }}</label><br>
            <p class="text-base m-1 text-logo-farbe-blau underline-offset-3">@{{ contact.username }}</p>
          </div>
          <img src="../assets/icons/mail.png" alt="" class="ml-auto">
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>