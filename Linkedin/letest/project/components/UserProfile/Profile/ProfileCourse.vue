<script setup>
import axios from "axios";
import { postdata, getconnection } from "../../../services/api";
import { usemonthStore } from "../../../store/Month";
import {useprofileStore} from '../../../store/getprofile'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const storeid = useprofileStore()
const route = useRoute();
const showfunction = ref("");
const routeparams = ref(route.params.id)
const store = usemonthStore();
const cource = reactive({
cource_name : "",
cource_number:"",
cource_associatewith:""
});
const courceerror = ref("");
const complete = ref("");
const post = ref([]);


watchEffect(() => {
  if (cource.cource_name.trim() == "") {
    courceerror.value = "";
  } else {
    courceerror.value = "";
  }
});

// --------------------------------getUserCource-------------------------//

async function getcource() {
  if (route.params.id) {
    const cource = await getconnection(
      "getUserCource?id=" + route.params.id
    );
    post.value = cource.Message.reverse();
  } else {
    const cource = await getconnection("getUserCource");
    post.value = cource.Message.reverse();
  }
}
  getcource();

  watchEffect(()=>{
   const edit =  storeid.profileid == route.params.id
   showfunction.value = edit
  })
  
// ------------------------------addCourses---------------------//

async function handlesubmitcource() {
  if (cource.cource_name.trim() == "") {
    courceerror.value = "* Course-name is Required";
  }  
  if(cource.cource_name.trim() != "") {
    const data = JSON.stringify({
      courceName: cource.cource_name,
      associatewith: cource.cource_associatewith,
      number: cource.cource_number,

    });
   const newdata = await postdata("addCourses",data)
   await getcource()
   toast.success('New Course Added Successfully',{
            autoClose:1500
       });

  }
  
}
const router = useRouter()
const edit = () => {
  router.push("/Edit/editcourse");
};

function close(){
    cource.cource_name = ""
   cource.cource_associatewith = ""
   cource.cource_number = ""
    courceerror.value = ""
}
</script>
<template>

  <div
    href="#"
    class="block mt-1 bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="px-4 flex justify-between py-2">
      <p class="text-[24px] font-bold font-ui-sans-serif">Courses</p>
 <div class="flex">
          <div @click="close" data-bs-toggle="modal" data-bs-target="#cource"  class="flex hover:bg-gray-300 p-2 rounded-full hover:cursor-pointer">
            <p v-if="showfunction" class="w-5" >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
            </p>
            <p  v-if="!routeparams" class="w-5" >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
            </p>
          </div>
          <div v-if="post.length > 0" @click="edit"  class="flex hover:bg-gray-300 p-2 rounded-full hover:cursor-pointer">
            <p v-if="showfunction" class="w-5 ">
              <img
                src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
                alt=""
              />
            </p>
            <p v-if="!routeparams" class="w-5 ">
              <img
                src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
                alt=""
              />
            </p>
          </div>
        </div>

    </div>
    <div class="pl-6">
      <div class="py-2" v-for="cource in post" :key="cource">
        <p class="text-[17px] font-bold">{{ cource.courceName }}</p>
        <p v-if="cource.courceName" class="text-[16px] text-gray-500">{{ cource.number }}</p>
        <p v-if="cource.associatewith" class="text-[16px] text-gray-500">Associatewith : {{ cource.associatewith }}</p>
      </div>
    </div>
  </div>

<!-- --------------------------------model------------------------------------------- -->

<modal id="cource" title=" Add course">
    <form @submit.prevent="handlesubmitcource">
            <p class="text-xs mb-2">* Indicates required</p>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label font-bold">Course *</label>
              <input
                v-model="cource.cource_name"
                class="form-control border-2"
                id="recipient-name"
              />
              <p class="text-red-500 absolute">{{ courceerror }}</p>
            </div>
            <div >
              <label for="recipient-name" class="col-form-label font-bold"
                >Course_Number </label
              >
              <input
                v-model="cource.cource_number"
                class="form-control border-2"
                id="recipient-name"
              />
            </div>
            <div class="pb-4" >
              <label for="recipient-name" class="col-form-label font-bold"
                >AssociateWith </label
              >
              <input
                v-model="cource.cource_associatewith"
                class="form-control border-2"
                id="recipient-name"
              />
            </div>

          <hr />
          <div v-if="cource.cource_name.trim() " class="py-3 px-2">
            <button
              data-bs-dismiss="modal"
               @click="submitSkill"
              class="float-right rounded border-2 hover:bg-blue-500 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
            >
              Save
            </button>
          </div>
          <div v-else class="py-3 px-2">
            <button
              class="float-right rounded border-2 hover:bg-blue-500 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
            >
              Save
            </button>
          </div>
            </form>
</modal>
  
</template>
