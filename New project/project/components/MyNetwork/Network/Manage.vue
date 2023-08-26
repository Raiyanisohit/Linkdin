<script setup>
const props = defineProps(['data1','post','remove'])
const deletid = ref("")
const name = ref("")
const delet = (e)=>{
  console.log(e)
deletid.value = e.slice(0,24)
name.value = e.slice(24)
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
                <p class="text-[18px] font-bold font- ui-sans-serif,">Manage my network</p>
            </div>
            <div class="flex justify-between">
                <div class="flex p-2">
                    <img class="w-7 h-8 mt-1" src="https://cdn-icons-png.flaticon.com/128/3394/3394785.png" alt="">
                    <p class="text-[18px] ps-3 pt-2">Connections</p>
                </div>
                <div class="p-2 pt-3">
                    <p class="font-bold">{{ data1 }}</p>
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
        <ul v-for="k in post" :key="k">
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
        
              <button @click="delet(k.userId._id +  k.userId.firstName )" data-bs-dismiss="modal"  data-bs-toggle="modal" data-bs-target="#deleteconnection"
                class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 border border-blue-700 rounded"
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


  <deletmodal id="deleteconnection" title="Remove Connection">
 <p class="text-[18px] pb-2">Are you sure you want to remove {{name}} as a connection? Don’t worry, {{name}} won’t be notified by LinkedIn.</p> 
 <hr class="mb-2">
 <button  data-bs-dismiss="modal"   @click="remove(deletid)"   class=" float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
 <button data-bs-dismiss="modal"   class="me-1 float-right border-dark rounded border-2  hover:bg-blue-400   px-3 py-1  font-bold">No thanks</button>
</deletmodal>
</template>