<script setup>
import {postdata} from '../../services/fetch'
const Profiledata = await postdata("getUserData")
const route = useRoute()
const router = useRouter();
const serchlist = ref("");

async function serchbar(event) {
  const data = JSON.stringify({
    firstName: event.target.value,
  });
   const serchalldata = await postdata("userSearch",data)
   serchlist.value = serchalldata
}




function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  router.push("/login");
}

function serchbarid(e){
  router.push(`/post/${e}`)
  serchlist.value = ""
  
}
const feed =()=>{
  router.push('/feed')
}
const network =()=>{
  router.push('/MyNetwork')
}

</script>
<template>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-2xl flex flex-wrap items-center justify-around mx-auto px-4">
    <div class="flex  mt-2">
        <div class=" ">
          <img class="w-[40px]" src="/assets//images/unnamed.png" alt="" />
        </div>
        <div class="ps-2 relative">
          <input
            class="nosubmit rounded"
            @input="serchbar"
            type="text"
            placeholder="Search..."
          />
          <div class="absolute md:w-[258px]">
            <div v-for="m in serchlist" :key="m">
              <div class="p-2 flex border border-dark bg-sky-50 rounded my-1">
                <img
                  class="w-8 h-8 rounded-full peer shadow-lg"
                  :src="m.userImage"
                  alt=""
                />
                <p
                  @click="serchbarid(m._id)"
                  class="px-2 text-[18px]"
                >
                  {{ m.firstName }} {{ m.lastName }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button> -->
    <div class=" w-full lg:ps-32  md:w-auto" >
      <ul class="font-medium flex  ps-4  bg-gray-50 md:flex-row md:space-x-8  md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <div class="pt-3 px-3  ">
        <div @click="feed">
          <img
            class="w-[26px] ms-1"
            src="https://cdn-icons-png.flaticon.com/128/1946/1946436.png"
            alt=""
          />
          <p class="text-xs mt-1  text-black">Home</p>
        </div>
      </div>
      <div @click="network">
        <div class="md:ps-8 px-3 pt-3">
          <img
            class="w-[26px] ms-4"
            src="https://cdn-icons-png.flaticon.com/128/6892/6892617.png"
            alt=""
          />
          <p class="text-xs  mt-1 text-black">
            My Network
          </p>
        </div>
      </div>
       <div class="md:ps-8 px-3   pt-3 relative">
        <img v-if="Profiledata ? Profiledata.Message.userImage : ''"
          class="w-8 h-8 border rounded-full peer shadow-lg"
          :src="Profiledata ? Profiledata.Message.userImage : ''"
          alt=""
        />
        <img v-else class="w-8 h-8 border rounded-full peer shadow-lg" src="https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000" alt="">
        <div class="flex peer">
          <p class="text-xs">Me</p>
          <img
            class="w-[18px]"
            src="https://cdn-icons-png.flaticon.com/128/2609/2609201.png"
            alt=""
          />
        </div>

         <div
          class="hidden absolute peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
          <button class="px-3 py-3 hover:bg-gray-200 text-center">
            <nuxt-link
              :to="
                '/profile' 
              "
            >
              View Profile
            </nuxt-link>
          </button>
          <button
            @click="logout"
            class="px-3 py-3 hover:bg-gray-200 text-center"
            href="#"
          >
            Sign Out
          </button>
        </div>
      </div>
      </ul>
    </div>
  </div>
</nav>
</template>
