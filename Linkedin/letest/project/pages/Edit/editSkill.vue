<script setup>
definePageMeta({
  middleware: "auth",
});
import {postdata,getconnection,DeleteData,UpdateData} from '../../services/api'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter()

// --------------------------------getUserSkill-----------------------//

async function getallskill(){
  const userskill = await getconnection("getUserSkill")
  AllSkill.value = userskill.Message.reverse()
}
 getallskill()


const AllSkill = ref([])
const addvalue = ref("")
const deletid = ref("")
const updateskill = ref("")
const skillerror = ref("")
// -----------------------------editmodal------------------------//

function editmodal(id){
  deletid.value = id
  const edit = AllSkill.value.find((i)=>i._id == id)
  addvalue.value = edit.skill
}

// -------------------------------removeSkill-------------------------//

async function removeSkill(){
  const deletdata = await DeleteData(`removeSkill?id=${deletid.value}`)
   toast.success('Skill Deleted successfully',{
    autoClose:1500
   });
   await getallskill()
}

function editskill(e){
addvalue.value = e.target.value
}

// -------------------------------updateUserSkill-------------------------//


async function saveskill(e){
if(addvalue.value.trim() == ""){
skillerror.value = "* Skill is required"
}else{
  const data = JSON.stringify({
    id:e,
    skill: addvalue.value ,
  })
  const edit = await UpdateData("updateUserSkill",data)
    toast.success('Skill Update successfully',{
      autoClose:1500
    });
  await getallskill()
    }
}

function close(){
skillerror.value = ""
}

</script>

<template>
    <div class="flex justify-center">
        <div
            href="#"
            class="block mt-3  bg-white lg:me-7 border border-gray-200 mx-2 w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="pe-4 flex justify-between py-2">
              <div class="flex">
                <button>
              <img class="w-[50px] me-2" @click="router.push('/profile')" src="https://cdn-icons-png.flaticon.com/128/5720/5720446.png" alt="">
                </button>
              <p class="text-[25px] pt-2 font-bold font-ui-sans-serif,">Skills</p>
              </div>
             
            </div>
            <div class="pl-6  py-2">
                <div >
                    <ul class="flex justify-between" v-for="(m,index) in AllSkill" :key="index"  >
                      <li class="text-[17px] py-2 font-bold " >{{ m.skill }}</li>
                      <li @click="close" class="mx-4 hover:bg-gray-300 rounded-full p-2  hover:cursor-pointer "> <p @click="editmodal(m._id)" class="w-5 ms-2" data-bs-toggle="modal" data-bs-target="#skill" ><img src="https://cdn-icons-png.flaticon.com/128/61/61456.png" alt=""></p></li>
                    </ul>
                    
                </div>
            </div>
            </div>
    </div>

<modal id="skill" title="Edit Skill">
     <form @submit.prevent="addskill">
      <input class="form-control border-2" placeholder="Add skill" v-model="addvalue"  cols="30" rows="10"/>
        <p v-if="skillerror" class="text-red-600">{{skillerror}}</p>
      <div class="py-3 flex justify-between">
        <div data-bs-dismiss="modal"  data-bs-toggle="modal" data-bs-target="#deleteskill"  class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</div>
        <button v-if="addvalue.trim()" @click="saveskill(deletid)" data-bs-dismiss="modal" class="me-1 float-right text-white rounded border-2  bg-green-600 hover:bg-green-700  px-3 py-1 border-success font-bold">SAVE</button>
        <button v-else  @click="saveskill()" class="me-1 float-right text-white rounded border-2  bg-green-600 hover:bg-green-700  px-3 py-1 border-success font-bold">SAVE</button>
      </div>
     </form>
</modal>

<deletmodal id="deleteskill" title="Delete from Skill?">
 <p class="text-[18px] pb-3">This will delete {{value}}  from all sections of your profile.</p> 
 <button  data-bs-dismiss="modal"   @click="removeSkill()"   class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
 <button data-bs-dismiss="modal"   class="me-1 float-right border-dark rounded border-2  hover:bg-blue-400   px-3 py-1  font-bold">No thanks</button>
</deletmodal>
</template>



