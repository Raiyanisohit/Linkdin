<script setup>
import axios from "axios";

import { postdata, getconnection, DeleteData } from "../../../services/fetch";
const route = useRoute();
const Profiledata = ref([]);

const show = ref(false);
function toggle() {
  show.value = true;
}
 
 async function getactivity(){
   if(route.params.id){
     const data = await postdata("loginUserPosts?id=" + route.params.id)
Profiledata.value = data.Message
  }else{
    const data  = await postdata("loginUserPosts")   
Profiledata.value = data.Message 
  }
    }
    getactivity()


</script>

<template>
  <div>
    <div
      href="#"
      class="block my-2 mb-2 h-max bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="px-4 py-2">
        <div>
          <p class="text-[24px] font-bold font-ui-sans-serif">Activity</p>
          <div class="flex">
            <div>
              <button class="text-[16px] py-1 font-bold text-white rounded-full border bg-blue-600 px-3 ">POST</button>
            <div>
              <div
                class="w-20 rounded-full my-2"
                v-for="(m, index) in Profiledata"
                :key="m"
              >
           
                <img
                  class="rounded-xl"
                  v-if="index < 1"
                  :src="m.post"
                  alt=""
                />
                <img class="rounded-xl" v-else-if="show" :src="m.post" alt="" />
              </div>
            </div>
            </div>
          
          </div>
        </div>
        </div>
        
    </div>
  </div>
</template>
