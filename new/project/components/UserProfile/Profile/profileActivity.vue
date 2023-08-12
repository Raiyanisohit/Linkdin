<script setup>
import axios from "axios";
const route = useRoute();
// import {usealluserpostdataStore} from '../../../store/Alluserpostdata'
// const store = usealluserpostdataStore()
const limit = ref(1);
const data = ref("");
const show = ref(false);
function toggle() {
  show.value = true;
}
function getdata() {
    if(route.params.id){
        var config = {
            method: "post",
    url: "http://localhost:3010/loginUserPosts?id=" + route.params.id,
    headers: {
        token: localStorage.getItem("token"),
    },
  };

  axios(config)
    .then(function (response) {
        data.value = response.data.Message;
    })
    .catch(function (error) {
        console.log(error);
    });
}else{
     var config = {
            method: "post",
    url: "http://localhost:3010/loginUserPosts",
    headers: {
        token: localStorage.getItem("token"),
    },
  };

  axios(config)
    .then(function (response) {
        data.value = response.data.Message;
    })
    .catch(function (error) {
        console.log(error);
    });
}

        }
getdata();
</script>

<template>
  <div>
    <div
      href="#"
      class="block my-2 mb-2 h-max bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="px-4 py-2">
        <div>
          <p class="text-[22px] font-bold">Activity</p>
          <div class="flex">
            <div>
              <button class="text-[16px] py-1 font-bold rounded-full border bg-green-500 px-3 ">post</button>
            <div>
              <div
                class="w-20 rounded-full my-2"
                v-for="(m, index) in data"
                :key="m"
              >
           
                <img
                  class="rounded-xl"
                  v-if="index < limit"
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
        <div class="flex py-2 bg-gray-200 justify-center">
          <button v-if="!show" @click="toggle" class="text-[17px]">
            Show all post
          </button>
          <span v-if="!show"
            ><img
              class="w-8 px-1 mx-1"
              src="https://cdn-icons-png.flaticon.com/128/545/545682.png"
              alt=""
          /></span>
      </div>
    </div>
  </div>
</template>
