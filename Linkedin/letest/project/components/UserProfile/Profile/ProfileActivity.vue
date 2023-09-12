<script setup>
import axios from "axios";

import { postdata, getconnection, DeleteData } from "../../../services/api";
const route = useRoute();
const Profiledata = ref([]);


 
//  ------------------------------loginUserPosts------------------------//

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
            <div >
              <button  class="text-[16px] py-1 font-bold text-white rounded-full border bg-green-600 px-3 ">Posts</button>
            <div>
              <div
                class=" rounded-full my-2 flex"
                v-for="(m) in Profiledata"
                :key="m"
              >
                <img 
                  class="rounded-xl py-2 w-20"
                  :src="m.post"
                  alt=""
                />
                <p class="ps-3">{{m.text}}</p>
            </div>
              </div>
            </div>
          
          </div>
        </div>
        </div>
        
    </div>
  </div>
</template>
