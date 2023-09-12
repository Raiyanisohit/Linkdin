<script setup>
import {postdata} from '../../services/api'
import debounce from "lodash.debounce";
const route = useRoute()
const router = useRouter();
const serchlist = ref("");

// ---------------------------------SerchUser--------------------------------//
const Profiledata = ref("")

async function getdata(){
  const Profiledataa = await postdata("getUserData")
  Profiledata.value = Profiledataa.Message
} 
getdata()

const serchbar = debounce(async(event) => {
  const data = JSON.stringify({
    firstName: event.target.value,
  });
   const serchalldata = await postdata("userSearch",data)
   serchlist.value = serchalldata
}, 1000);

const Homeactive = ref("")
const Networkactive = ref(false)

watchEffect(()=>{
  if(route.fullPath === "/feed" ){
   Homeactive.value = true
  }
  else{
    Homeactive.value = false
  }
  if(route.fullPath === "/mynetwork" ){
   Networkactive.value = true
  }
  else{
    Networkactive.value = false
  }
})


// -----------------------------Unothorized Access----------------------------------//

watchEffect(()=>{
  if( Profiledata === "Unothorized Access" ){
    router.push('/login')
  }
})

function serchbarid(e){
  router.push(`/post/${e}`)
  serchlist.value = ""
  
}
const feed =()=>{
  router.push('/feed')
}
const network =()=>{
  router.push('/mynetwork')
}

   // -------------------------------------Logout-----------------------------------//

  function logout() {

  localStorage.removeItem("token");
  localStorage.removeItem("email");
  router.push("/login");

}

</script>
<template>

<nav class="bg-white border-gray-200 dark:bg-gray-900 ">
  <div class="max-w-screen-2xl flex flex-wrap items-center justify-around mx-auto px-2">
    <div class="flex  mt-2">
        <div class=" ">
          <img class="w-[40px] " src="/assets//images/unnamed.png" alt="" />
        </div>
        <div class="ps-2 relative">
          <input
            class="nosubmit rounded"
            @input="serchbar"
            type="text"
            placeholder="Search..."
          />
          <div class="absolute  md:w-[258px] ">
            <div v-for="m in serchlist" :key="m">
              <div class="p-2 flex border border-dark bg-sky-50 rounded my-1 hover:cursor-pointer">
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


    <div class=" w-full lg:ps-32  md:w-auto" >
      <ul class="font-medium flex  justify-center  md:flex-row md:space-x-8  md:border-0 ">
      <div class="pt-3 px-3 hover:cursor-pointer">
    
        <div  @click="feed">
          <img v-if="Homeactive" 
            class="w-[26px] ms-1"
            src="/assets/images/home (2).png"
            alt=""
          />
          <img v-else 
            src="https://cdn-icons-png.flaticon.com/128/1946/1946488.png"
            class="w-[26px] ms-1"
            alt=""
          />
          <p class="text-xs mt-1  text-black">Home</p>
        </div>

      </div>
      <div @click="network">
        <div class="md:ps-8 px-3 pt-3 hover:cursor-pointer">
          <img  v-if="!Networkactive"
            src="/assets/images/group.png"
            class="w-[27px] ms-4"
            alt=""
          />
          <img  v-else
            src="/assets/images/group (1).png"
            class="w-[27px] ms-4"
            alt=""
          />
          <p class="text-xs mt-1  text-black">
            My Network
          </p>
        </div>
       
      </div>
       <div class="md:ps-8 px-3   pt-3 relative hover:cursor-pointer">
        <img v-if="Profiledata ? Profiledata.userImage : ''"
          class="w-8 h-8 border border-gray-500 rounded-full peer shadow-lg"
          :src="Profiledata ? Profiledata.userImage : ''"
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
          class="hidden absolute right-0 md:left-0  peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
          <button class="px-3  py-3 hover:bg-gray-200 text-center">
            <nuxt-link
            class="flex justify-start"
              :to="
                '/profile' 
              "
            >
            <img class="w-[27px] " src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="">
              <p class="pt-1 mx-2 text-black">View Profile</p>
            </nuxt-link>
          </button>
          <button
            @click="logout"
            class="px-3 flex justify-start py-3 hover:bg-gray-200 text-center"
            href="#"
          >
          <img class="w-[27px] mx-1" src="https://cdn-icons-png.flaticon.com/128/660/660350.png" alt="">
            <p class="mx-1 text-[17px]">Sign Out</p>
          </button>
        </div>
      </div>
      </ul>
    </div>
  </div>
</nav>
</template>
