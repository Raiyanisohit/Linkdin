
<script setup>
const router = useRouter()
const props = defineProps([ "post"]);
</script>
<template>
    <div v-if="post">
        <div
      href="#"
     class="block md:px-9 md:p-7 px-24 p-7 mt-3  bg-white border border-gray-200 md:w-[250px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="separator">
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          :src="post.Message ? post.Message.userImage : '' "
          alt="Bonnie image"
        />
      </div>
      <div>
          <!-- <NuxtLink to="/Profile"> -->
            <p @click="router.push('/Profile')" class="text-center hover:underline  text-[18px] font-bold"> {{post.Message ?  post.Message.firstName : '' }} {{post.Message ? post.Message.lastName : ''}} </p>
          <!-- </NuxtLink> -->
          <p class="text-xs text-gray-500 pt-1 text-center">
            {{post.Message ? post.Message.profileHeadline : '' }}
          </p>
      </div>
    </div>

  </div>
</template>