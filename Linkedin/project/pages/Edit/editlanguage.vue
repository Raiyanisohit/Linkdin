<script setup>
definePageMeta({
  middleware: "auth",
});
import {postdata,getconnection,DeleteData,UpdateData} from '../../services/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// --------------------------------getUserLanguage---------------------//

async function getalllanguage(){
  const userlang = await getconnection("getUserLanguage")
  Alllang.value = userlang.Message
}
 getalllanguage()


const Alllang = ref([])
const langvalue = ref("")
const deletid = ref("")
const updateskill = ref("")
const langerror = ref("")
// ---------------------------------editmodal------------------------------//

function editmodal(id){
  deletid.value = id
  const edit = Alllang.value.find((i)=>i._id == id)
  langvalue.value = edit.language
}

// ------------------------------deleteUserLanguage-----------------------//

async function removelang(){
  const deletdata = await DeleteData(`deleteUserLanguage?id=${deletid.value}`)
   toast.success('Language Deleted successfully',{
    autoClose:1500
   });
   await getalllanguage()
}

function editskill(e){
langvalue.value = e.target.value
}

// --------------------------------------editUserLanguage-------------------------//

async function saveskill(e){
  if(langvalue.value.trim() == ""){
     langerror.value = "* Langage is required"
  }else{
    const data = JSON.stringify({
      id:e,
    language: langvalue.value ,
  })
  const edit = await UpdateData("editUserLanguage",data)
    toast.success('Language updated successfully',{
      autoClose:1500
    });
  await getalllanguage()
    }
}

const router =useRouter()
</script>

<template>
    <div class="flex justify-center ">
        <div
            href="#"
            class="block mt-3 mx-2 bg-white lg:me-7 border border-gray-200 w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                     <div class="pe-4 flex justify-between py-2">
              <div class="flex">
                <button>
              <img class="w-[50px] me-2" @click="router.push('/profile')" src="https://cdn-icons-png.flaticon.com/128/5720/5720446.png" alt="">
                </button>
              <p class="text-[25px] pt-2 font-bold font-ui-sans-serif,">Language</p>
              </div>
             
            </div>
            <div class="pl-6  py-2">
                <div >
                    <ul class="flex justify-between" v-for="(m,index) in Alllang" :key="index"  >
                      <li class="text-[17px] py-2 font-bold" >{{ m.language }}</li>
                      <li @click="close" class="pe-5  hover:cursor-pointer"> <p @click="editmodal(m._id)" class="w-5 ms-2" data-bs-toggle="modal" data-bs-target="#skill" ><img src="https://cdn-icons-png.flaticon.com/128/61/61456.png" alt=""></p></li>
                    </ul>
                    
                </div>
            </div>
            </div>
    </div>

<modal id="skill" title="Edit">
     <form @submit.prevent="addskill">
      <input class="form-control border-2" placeholder="Add skill" v-model="langvalue" cols="30" rows="10"/>
        <p v-if="langerror" class="text-red-600">{{langerror}}</p>
        <div class="py-3 flex justify-between">
        <button data-bs-dismiss="modal"  data-bs-toggle="modal" data-bs-target="#deletelang" class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
        <button v-if="langvalue.trim()" @click="saveskill(deletid)" data-bs-dismiss="modal" class="me-1 float-right text-white rounded border-2  bg-green-600 hover:bg-green-700  px-3 py-1 border-success font-bold">SAVE</button>
        <button v-else @click="saveskill()"  class="me-1 float-right text-white rounded border-2  bg-green-600 hover:bg-green-700  px-3 py-1 border-success font-bold">SAVE</button>
      </div>
     </form>
</modal>

<deletmodal id="deletelang" title="Delete  Language?">
 <p class="text-[18px] pb-3">This will delete {{langvalue}}  from all sections of your language.</p> 
 <button  data-bs-dismiss="modal"   @click="removelang()"   class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
 <button data-bs-dismiss="modal"   class="me-1 float-right border-dark rounded border-2  hover:bg-blue-400   px-3 py-1  font-bold">No thanks</button>
</deletmodal>

</template>


