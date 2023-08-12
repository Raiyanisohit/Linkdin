<script setup>
import axios from "axios";
import { getprofiledata } from "../../assets/js/userprofile";
import {usealluserpostdataStore} from '../../store/Alluserpostdata'
const store = usealluserpostdataStore()
const route = useRoute()
const { Data } = getprofiledata();
const router = useRouter();
const serchlist = ref("");
function serchbar(event) {
  var data = JSON.stringify({
    firstName: event.target.value,
  });

  var config = {
    method: "post",
    url: "http://localhost:3010/userSearch",
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      serchlist.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
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
  <div>
    <div
      class="flex justify-center bg-white sticky top-0 pt-2 pb-2 border-b flex-wrap"
    >
      <div class="flex  mt-2">
        <div class=" ">
          <img class="w-[40px]" src="/assets//images/unnamed.png" alt="" />
        </div>
        <div class="ps-2 relative">
          <input
            class="nosubmit"
            @input="serchbar"
            type="text"
            placeholder="Search..."
          />
          <div class="absolute w-[258px]">
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

      <div class="pt-1 lg:ps-40">
        <div @click="feed">
          <img
            class="w-[26px] ms-1"
            src="https://cdn-icons-png.flaticon.com/128/1946/1946436.png"
            alt=""
          />
          <p class="text-xs mt-1 min-[850px]:block hidden text-black">Home</p>
        </div>
      </div>
      <div @click="network">
        <div class="md:ps-8 pt-1">
          <img
            class="w-[26px] ms-4"
            src="https://cdn-icons-png.flaticon.com/128/6892/6892617.png"
            alt=""
          />
          <p class="text-xs min-[850px]:block hidden mt-1 text-black">
            My Network
          </p>
        </div>
      </div>
   

      <div class="md:ps-8 pt-1 relative">
        <img v-if="Data ? Data.Message.userImage : ''"
          class="w-8 h-8 border rounded-full peer shadow-lg"
          :src="Data ? Data.Message.userImage : ''"
          alt=""
        />
        <img v-else class="w-8 h-8 border rounded-full peer shadow-lg" src="https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000" alt="">
        <div class="flex peer">
          <p class="text-xs min-[850px]:block hidden">Me</p>
          <img
            class="w-[18px]"
            src="https://cdn-icons-png.flaticon.com/128/2609/2609201.png"
            alt=""
          />
        </div>

        <!-- the menu here -->
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

    </div>
  </div>
</template>
