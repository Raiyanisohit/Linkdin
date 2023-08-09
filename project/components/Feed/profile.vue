
<script setup>
const props = defineProps([ "post"]);
</script>
<template>
    <div v-if="post">
        <div
      href="#"
      class="block px-9  p-7  mt-3 flex flex-col items-center bg-white border border-gray-200 w-[250px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="separator">
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          :src=" post.Message.userImage "
          alt="Bonnie image"
        />
      </div>
      <div>
          <!-- <p  @click="$router.push(`/post/${post.Message._id}`)" class="text-center hover:underline  text-[18px] font-bold"> {{  post.Message.firstName  }} {{ post.Message.lastName }} </p> -->
          <NuxtLink to="/Profile">
            <p  class="text-center hover:underline  text-[18px] font-bold"> {{  post.Message.firstName  }} {{ post.Message.lastName }} </p>
          </NuxtLink>
          <p class="text-xs text-gray-500 pt-1 text-center">
            {{ post.Message.profileHeadline }}
          </p>
      </div>
    </div>

  </div>
</template>