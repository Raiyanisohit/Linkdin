<script setup>
definePageMeta({
  middleware: "auth",
});
import axios from "axios";
import { postdata, getconnection,DeleteData,UpdateData } from "../../services/api";
import { usemonthStore } from "../../store/Month";
import {useprofileStore} from '../../store/getprofile'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const storeid = useprofileStore()
const route = useRoute();
const showfunction = ref("");
const routeparams = ref(route.params.id)
const store = usemonthStore();
const CourceName = ref("")
const CourceNunmber = ref("")
const CourceAssociatewith = ref("")
const courceerror = ref("");
const complete = ref("");
const post = ref([]);

// --------------------------------------getUserCource--------------------//

async function getcource() {
    const cource = await getconnection("getUserCource");
    post.value = cource.Message;
}
  getcource();  

// ---------------------------------------Edit_Modal----------------------------//

const deletid = ref("")
function editmodal(id){
 deletid.value = id
  CourceName.value= post.value.find((i)=>i._id == id).courceName
  CourceNunmber.value = post.value.find((i)=>i._id == id).number
  CourceAssociatewith.value= post.value.find((i)=>i._id == id).associatewith
}

  const error = ref("")
watchEffect(() => {
  if (CourceName.value.trim() == "") {
    error.value = "";
  } else {
    error.value = "";
  }
});
// --------------------------------------updateUserCource---------------------//
async function handlesubmitcource() {
  if(CourceName.value.trim() == ""){
   error.value = "* Course-name is Required"
  }
  if(CourceName.value.trim() != "") {
    const data = JSON.stringify({
       id: deletid.value,
      courceName: CourceName.value,
      associatewith: CourceAssociatewith.value,
      number:CourceNunmber.value,

    });
   const newdata = await UpdateData("updateUserCource",data)
      toast.success('Cource updated  Successfully',{
            autoClose:1500
       })
   await getcource()
 
  }
  
}
const router = useRouter()

// ------------------------------------deleteUserCourec----------------------//

async function removecourse(){
  const deletdata = await DeleteData(`deleteUserCourec?id=${deletid.value}`)
      toast.success('Course deleted successfully',{
        autoClose:1500
      });
  await getcource()
}

  
</script>       
<template>
  <div class="flex justify-center">
  <div
    href="#"
    class="block mt-2 bg-white lg:me-7 border border-gray-200 mx-2 w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
          <div class="pe-4 flex justify-between py-2">
              <div class="flex">
                <button>
              <img class="w-[50px] me-2" @click="router.push('/profile')" src="https://cdn-icons-png.flaticon.com/128/5720/5720446.png" alt="">
                </button>
              <p class="text-[25px] pt-1 ps-1 font-bold font-ui-sans-serif,">Courses</p>
              </div>
          </div>

    <div class="pl-6 flex justify-between"  v-for="cource in post" :key="cource">
      <ul class="py-2">
        <li class="text-[17px] font-bold">{{ cource.courceName }}</li>
        <li  class="text-[16px] text-gray-500">{{ cource.number }}</li>
        <li v-if="cource.associatewith" class="text-[16px] text-gray-500">AssociateWith : {{ cource.associatewith }}</li>
      </ul>
      <ul>
        <li class="pe-5  hover:cursor-pointer">
            <p
              @click="editmodal(cource._id)"
              class="w-5 ms-2"
              data-bs-toggle="modal"
              data-bs-target="#editcourse"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
                alt=""
              />
            </p>
          </li>
      </ul>
    </div>
  </div>
  </div>

<modal id="editcourse" title=" Add course">
    <form @submit.prevent="handlesubmitcource">
            <p class="text-xs mb-2">* Indicates required</p>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label font-bold">Course *</label>
              <input
                v-model="CourceName"
                class="form-control border-2"
                id="recipient-name"
              />
              <p class="text-red-500 absolute">{{ error }}</p>
            </div>
            <div >
              <label for="recipient-name" class="col-form-label font-bold"
                >Course_Number </label
              >
              <input
               v-model="CourceNunmber"
                class="form-control border-2"
                id="recipient-name"
              />
            </div>
            <div class="pb-4" >
              <label for="recipient-name" class="col-form-label font-bold"
                >AssociateWith </label
              >
              <input
               v-model="CourceAssociatewith"
                class="form-control border-2"
                id="recipient-name"
              />
            </div>

          <hr />
          <div class="py-3 flex justify-between">
        <div data-bs-dismiss="modal"  data-bs-toggle="modal" data-bs-target="#deletecourse"  class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</div>
        <button v-if="CourceName.trim()"  data-bs-dismiss="modal" class="me-1 float-right text-white rounded border-2  bg-green-600 hover:bg-green-700  px-3 py-1 border-success font-bold">SAVE</button>
        <button v-else class="me-1 float-right text-white rounded border-2  bg-green-600 hover:bg-green-700  px-3 py-1 border-success font-bold">SAVE</button>
      </div>
            </form>
</modal>

  <deletmodal id="deletecourse" title="Delete  Course?">
         <ul class=" justify-between"  >
                      <li class="text-[18px] pb-3" >Are you sure you want to delete your {{  }} course?</li>
                    </ul>
 <button  data-bs-dismiss="modal"  @click="removecourse()" class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
 <button data-bs-dismiss="modal"   class="me-1 float-right border-dark rounded border-2  hover:bg-blue-400   px-3 py-1  font-bold">No thanks</button>
</deletmodal>

</template>
