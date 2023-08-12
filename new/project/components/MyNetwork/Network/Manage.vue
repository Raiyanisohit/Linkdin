<script setup>
// import {usealluserpostdataStore} from '../../../store/Alluserpostdata'
// const store = usealluserpostdataStore()
import {getconnection,postdata,DeleteData} from '../../../services/fetch.js'
const allconnection = ref([])
const allconnectionNo = ref(0)

onMounted(async()=>{
  const connection = await getconnection("userConnections");
  const data = await postdata("getTotalConnectionNo");
  allconnection.value = connection.Message
  allconnectionNo.value = data
})

async function removeconnection(e) {
     let data = JSON.stringify({
    userId: e,
  });
  let deletepostee = await DeleteData("removeConnection", data);
  const index =  allconnection.value.findIndex((i) => i._id == e);
  allconnection = allconnection.value.splice(index, 1);
  allconnectionNo.value 
}

</script>

<template>
    <div data-bs-toggle="modal"
            data-bs-target="#connectionModal">
        <div
        href="#"
        class="block  px-9 p-1 my-2  mt-4 bg-white border border-gray-200 lg:w-[318px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div  >
            <div class="p-2">
                <p class="text-[17px]">Manage my network</p>
            </div>
            <div class="flex justify-between">
                <div class="flex p-2">
                    <img class="w-7 h-8 mt-1" src="https://cdn-icons-png.flaticon.com/128/3394/3394785.png" alt="">
                    <p class="text-[18px] ps-3 pt-2">Connections</p>
                </div>
                <div class="p-2 pt-3">
                    <p class="font-bold">{{ allconnectionNo }}</p>
                </div>
            </div>
        </div>
       
  </div>
</div>
    
 <div
    class="modal fade"
    id="connectionModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-xl font-bold" id="exampleModalLabel">
            Connection
          </h5>
          <button class="float-right" type="button" data-bs-dismiss="modal">
            <img
              class="w-8"
              src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png"
              alt=""
            />
          </button>
        </div>
        <div class="modal-body">
          <div class=" px-3">
        <ul v-for="k in allconnection" :key="k">
          <li  class="py-3 sm:py-4">
     
            <div class="flex pt-2 items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="w-[60px] rounded-full"
                  :src="k.userId ? k.userId.userImage : ''"
                  alt="Michael image"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p
                  class="text-xl font-bold text-gray-900 truncate dark:text-white"
                >
                  {{ k.userId ? k.userId.firstName : "" }}
                  {{ k.userId ? k.userId.lastName : "" }}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {{k.userId ? k.userId.profileHeadline :''}}
                </p>
              </div>
        
              <button   @click="removeconnection(k.userId._id)"
                class="inline-flex border-2 border-black hover:bg-red-500 hover:text-white font-bold items-center text-base p-2 rounded-full px-3"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
        </div>
      </div>
    </div>
  </div>

</template>