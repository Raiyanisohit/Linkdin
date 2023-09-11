
<script setup>
const router = useRouter()
const props = defineProps([ "post"]);
</script>
<template>
    <div v-if="post">
        <div
      href="#"
      
     class="block  mt-3 bg-white border border-gray-200 w-[310px] md:w-[250px]  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
    <div class="relative">
      <img v-if="post.Message ? post.Message.backgroundImage : ''" class="rounded h-28 w-full" :src="post.Message ? post.Message.backgroundImage : ''" alt="">
      <img v-else class="rounded h-28 w-full" src="https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq" alt="">
      <div class="absolute top-16 md:left-[70px] left-[100px] hover:cursor-pointer">
        <img  @click="router.push('/Profile')"
          class="w-24 h-24 mb-3 rounded-full border-2 shadow-lg"
          :src="post.Message ? post.Message.userImage : '' "
          alt="Bonnie image"
        />
      </div>
      <div>
    </div>
    <div class="pt-5 pb-4 ">

          <!-- <NuxtLink to="/Profile"> -->
            <p @click="router.push('/Profile')" class="text-center hover:cursor-pointer hover:underline pb-1 text-[18px] font-bold"> {{post.Message ?  post.Message.firstName : '' }} {{post.Message ? post.Message.lastName : ''}} </p>
          <!-- </NuxtLink> -->
          <p class="text-xs text-gray-500 text-center">
            {{post.Message ? post.Message.profileHeadline : '' }}
          </p>
    </div>
      </div>
    </div>

  </div>
</template>