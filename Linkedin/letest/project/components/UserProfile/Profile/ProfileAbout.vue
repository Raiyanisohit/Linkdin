<script setup>
import axios from 'axios'
import { postdata, getconnection, DeleteData } from "../../../services/api";
import {useprofileStore} from '../../../store/getprofile'
const store = useprofileStore()
const route = useRoute()
const showfunction = ref("")
const routeparams = ref(route.params.id)
const editintro = ref("")
const About = ref("")
const post = ref([])

// ------------------------------------getUserData---------------------------//
// ------------------------------------getUserData---------------------------//

async function getAbout(){
    if(route.params.id){
      const edituserinfo = await postdata("getUserData?id=" + route.params.id)
     post.value = edituserinfo.Message
     
  }else{
      const edituserinfo = await postdata("getUserData")
     post.value = edituserinfo.Message
}
}
getAbout()


const isinput =(e)=>{
editintro.value = e.target.value
}

async function isaboute(e){ 

// ---------------------------------editUserInfo--------------------//

 const data = JSON.stringify({
  "about": editintro.value
  });
const Editintro = await postdata("editUserInfo",data)
await getAbout()
}


watchEffect(()=>{
 const edit =  store.profileid == route.params.id
 showfunction.value = edit
})

</script>
<template>
    <div>
        <div
            href="#"
            class="block my-2   bg-white  border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="px-4 flex justify-between py-2">
              <p class="text-[24px] font-bold font-ui-sans-serif ">About</p>
              <div  data-bs-toggle="modal" data-bs-target="#about"  class="flex hover:bg-gray-300 p-2 rounded-full hover:cursor-pointer">
                <p v-if="showfunction" class="w-5 " ><img src="https://cdn-icons-png.flaticon.com/128/61/61456.png" alt=""></p>
                <p v-if="!routeparams" class="w-5 " ><img src="https://cdn-icons-png.flaticon.com/128/61/61456.png" alt=""></p>
              </div>
            </div>
            <div class="pl-6 py-2 pb-3  ">
              <p  class="whitespace-pre-line ... text-justify pe-4">{{post ? post.userAbout : '' }}</p>
            </div>
            </div>
    </div>

<!-- -------------++++++++++++++++++++ model ++++++++++++++++++++----------------------- -->

<modal id="about" title="Edit About">
  
 <form class="py-2" method="post" @submit.prevent="isaboute">
          <textarea class="form-control border-4" :value="post.userAbout" @input="isinput"  cols="30" rows="10"/>
        <div class="py-2 ">
          <button  data-bs-dismiss="modal" class="float-right rounded border-2 hover:bg-blue-500 btn btn-outline-dark hover:text-white   px-3 py-1 border-primary font-bold">Save</button>
        </div>
      </form>
</modal>
</template>


