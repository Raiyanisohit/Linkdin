<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { postdata, getconnection, DeleteData } from "../../../services/api";
import {useprofileStore} from '../../../store/getprofile'
const store = useprofileStore()
const route = useRoute();
const showfunction = ref("");
const routeparams = ref(route.params.id)
const show = ref(false);
const limit = ref(2);
const router = useRouter();
const inputlang = ref("");
const langerror = ref("");
const modall = ref("");
const Alluserlanguage = ref([]);

async function getuserlang() {
  if (route.params.id) {
    const userlang = await getconnection("getUserLanguage?id=" + route.params.id);
    Alluserlanguage.value = userlang.Message.reverse();
  } else {
    const userlang = await getconnection("getUserLanguage");
    Alluserlanguage.value = userlang.Message.reverse();
  }
}
getuserlang();

function toggle() {
  show.value = !show.value;
}

async function addlang() {
  if (inputlang.value.trim() == "") {
    langerror.value = "* Language is Required";
  } else {
      const data = JSON.stringify({
      language: inputlang.value,
    });
    const Addlang = await postdata("addUserLanguage", data);
       toast.success('New Language Added Successfully',{
            autoClose:1500
       });
    await getuserlang();
        var myModalEl = document.getElementById('lang');
     var modal = bootstrap.Modal.getInstance(myModalEl)
     modal.hide();

  }
}

watchEffect(() => {
  if (inputlang.value.trim() == "") {
    langerror.value = "";
  } else {
    langerror.value = "";
  }
});

watchEffect(()=>{
 const edit =  store.profileid == route.params.id
 showfunction.value = edit
})


function edit() {
  router.push("/edit/editlanguage");
}
function close(){
    inputlang.value = "";
     langerror.value = ""
}
</script>
<template>
  <div>
    <div
      href="#"
      class="block mb-5 h-max bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="px-4 flex justify-between py-2">
        <p class="text-[24px] font-bold font-ui-sans-serif">Language</p>
        <div class="flex">
          <div @click="close" data-bs-toggle="modal" data-bs-target="#lang" class="flex hover:bg-gray-300 p-2 rounded-full hover:cursor-pointer">
            <p  v-if="showfunction" class="w-5 "  >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
            </p>
            <p  v-if="!routeparams" class="w-5 " >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
            </p>
          </div>
          <div v-if="Alluserlanguage.length > 0" @click="edit"  class="flex hover:bg-gray-300 p-2 rounded-full hover:cursor-pointer">
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
          <ul v-for="(m, index) in Alluserlanguage" :key="index">
            <li class="text-[17px] font-bold text-gray-600" >
              {{ m.language }}
               <hr class="my-2 me-4 bg-gray-500">
            </li>
            
          </ul>
        </div>
      </div>
     
    </div>
  </div>

  <modal id="lang" title="Add Language">
      <form @submit.prevent="addlang">
             <label for="" class="font-bold my-1 ps-1 font-bold">Add Language*</label>
        <input
          class="form-control border-2"
          placeholder="Add Language"
          v-model="inputlang"
        />
        <p class="text-red-600 absolute" v-if="langerror">{{ langerror }}</p>
        <div  class="py-4 ">
          <button
            class="float-right rounded border-2 hover:bg-blue-500 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
          >
            Save
          </button>
        </div>
      </form>
  </modal>
</template>