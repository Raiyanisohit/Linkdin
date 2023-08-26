<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { postdata, getconnection, DeleteData } from "../../../services/fetch";
import {useprofileStore} from '../../../store/getprofile'
const store = useprofileStore()
const route = useRoute();
const showfunction = ref("");
const routeparams = ref(route.params.id)
const show = ref(false);
const router = useRouter();
const inputskill = ref("");
const skillerror = ref("");
const modall = ref("");
const Alluserskill = ref([]);

// ----------------------------------getUserSkill----------------------------//
// ----------------------------------getUserSkill----------------------------//

async function getuserskill() {
  if (route.params.id) {
    const userskill = await getconnection("getUserSkill?id=" + route.params.id);
    Alluserskill.value = userskill.Message;
  } else {
    const userskill = await getconnection("getUserSkill");
    Alluserskill.value = userskill.Message;
  }
}
getuserskill();

function toggle() {
  show.value = !show.value;
}
watchEffect(() => {
  if (inputskill.value.trim() == "") {
    skillerror.value = "";
  } else {
    skillerror.value = "";
  }
});
// -------------------------------------adduserskill---------------------//
// -------------------------------------adduserskill---------------------//

async function addskill() {
  if (inputskill.value.trim() == "") {
    skillerror.value = "* Skill is Required";
  } else {
    modall.value = "modal";
    const data = JSON.stringify({
      skill: inputskill.value,
    });
    if(inputskill.value.trim()){
      const Addskill = await postdata("addUserSkill", data);
    toast.success('New Skill Added successfully');
   await getuserskill();
    inputskill.value = "";
    }
  }
}


watchEffect(()=>{
 const edit =  store.profileid == route.params.id
 showfunction.value = edit
})


function edit() {
  router.push("/edit/editskill");
}
</script>
<template>
  <div>
    <div
      href="#"
      class="block my-2  h-max bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="px-4 flex justify-between py-2">
        <p class="text-[24px] font-bold font-ui-sans-serif">Skills</p>
        <div class="flex">
          <div  class="flex hover:bg-gray-300 p-2 rounded-full">
            <p v-if="showfunction" class="w-5" data-bs-toggle="modal" data-bs-target="#skill">
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
              
            </p>
            <p v-if="!routeparams" class="w-5" data-bs-toggle="modal" data-bs-target="#skill">
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
              
            </p>
          </div>
          <div @click="edit"  class="flex hover:bg-gray-300 p-2 rounded-full">
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
      <div class="pl-6 py-2">
        <div>
          <ul v-for="(m, index) in Alluserskill" :key="index">
            <li class="text-[17px] font-bold " >
              {{ m.skill }}
            <hr class="my-2 me-4 bg-gray-500">
            </li>
            
          </ul>
        </div>
      </div>
      
    </div>
  </div>

  <modal id="skill" title="Add Skills">
      <form @submit.prevent="addskill">
        <label for="" class="font-bold my-1 ps-1">Add skill*</label>
        <input
          class="form-control border-2"
          placeholder="Add skill"
          v-model="inputskill"
          cols="30"
          rows="10"
        />
        <p class="text-red-600 pt-1 absolute" v-if="skillerror">{{ skillerror }}</p>
        <div v-if="inputskill.trim()" class="py-2 ">
          <button
            data-bs-dismiss="modal"
            class="float-right rounded border-2 hover:bg-blue-600 btn btn-outline-dark hover:text-white px-3 py-1 border-primary  font-bold"
            @click="submitSkill"
          >
            Save
          </button>
        </div>
        <div v-else class="py-4 ">
          <button
            class="float-right rounded border-2 hover:bg-blue-600 btn btn-outline-dark hover:text-white px-3 py-1 border-primary  font-bold "
          >
            Save
          </button>
        </div>
      </form>
  </modal>
</template>