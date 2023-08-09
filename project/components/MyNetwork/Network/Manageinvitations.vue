<script setup>
import axios from 'axios'
const props = defineProps(["data"]);
console.log(props.data)
function getaccept(e){
  var data = JSON.stringify({
    "id": e.slice(0,24),
    "status": e.slice(24)
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/acceptOrDeclineRequest',
  headers: { 
    'token':localStorage.getItem('token'), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));

})
.catch(function (error) {
  console.log(error);
});

  }
</script>
<template>
  <div>
    <div
      href="#"
      class="block mt-4 bg-white border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
           <div class="flex justify-between p-[10px]">
              <p>No pending invitations</p>
              <p class="text-gray-600 font-bold">Manage</p>
            </div>
      <div class=" px-3">
        <ul v-for="k in data" :key="k">
          <li v-for="l in k" :key="l" class="py-3 sm:py-4">
     
            <div class="flex pt-2 items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="w-[60px] rounded-full"
                  :src="l ? l.requestUserId.userImage : ''"
                  alt="Michael image"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p
                  class="text-xl font-bold text-gray-900 truncate dark:text-white"
                >
                  {{ l ? l.requestUserId.firstName : "" }}
                  {{ l ? l.requestUserId.lastName : "" }}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  Trainee Software Engineer - Radixweb
                </p>
              </div>
              <button  @click.prevent="getaccept(l._id)"
                class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
              >
                ignore
              </button>
              <button  type="button"  @click.prevent="getaccept(l._id + 'Accept')"
                class="inline-flex border-2 border-blue-600 hover:border-blue-500 items-center text-base p-2 rounded-full px-3"
              >
                Accept
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


