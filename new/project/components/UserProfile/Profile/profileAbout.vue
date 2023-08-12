<script setup>
import axios from 'axios'

const props = defineProps(['post'])
const route = useRoute()
const showfunction = route.params.id
const editintro = ref("")

function isinput(e){
  console.log(e.target.value)
editintro.value = e.target.value
}
function isaboute(e){
 var data = JSON.stringify({
  "about": editintro.value
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/editUserInfo',
  headers: { 
    'token': localStorage.getItem('token'), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  
  
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
            class="block my-2   bg-white  border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="px-4 flex justify-between py-2">
              <p class="text-[22px] font-bold ">About</p>
              <div v-if="!showfunction" class="flex">
                <p class="w-5 ms-3" data-bs-toggle="modal" data-bs-target="#about"><img src="https://cdn-icons-png.flaticon.com/128/61/61456.png" alt=""></p>
              </div>
            </div>
            <div class="pl-6 py-2 px-4 ">
              <p  class="text-justify ">{{ post.Message.userAbout }}</p>
            </div>
            </div>
    </div>

<!-- -------------++++++++++++++++++++ model ++++++++++++++++++++----------------------- -->
<!-- -------------++++++++++++++++++++ model ++++++++++++++++++++----------------------- -->
<!-- -------------++++++++++++++++++++ model ++++++++++++++++++++----------------------- -->

    <div class="modal fade  " id="about" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  ">
    <div class="modal-content lg:w-[700px]">
      <form class="py-2" method="post" @submit.prevent="isaboute">

        <div class="modal-header">
          <h5 class="modal-title text-xl" id="exampleModalLabel">Edit about</h5>
          
          <button class="float-right" type="button"  data-bs-dismiss="modal">
            <img class="w-8" src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="">
          </button>
        </div>
        <div class="modal-body">
          <textarea class="form-control" :value="post.Message.userAbout" @input="isinput"  cols="30" rows="10"/>
        </div>
        <div class="py-1  px-3">
          <button  data-bs-dismiss="modal" class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white   px-3 py-1 border-info font-bold">Save</button>
        </div>
      </form>
      </div>
  </div>
</div>
</template>


