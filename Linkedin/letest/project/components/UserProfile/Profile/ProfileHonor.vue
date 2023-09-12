<script setup>
import axios from "axios";
import { postdata, getconnection } from "../../../services/api";
import { usemonthStore } from "../../../store/Month";
import {useprofileStore} from '../../../store/getprofile'
const storeid = useprofileStore()
const route = useRoute();
const showfunction = ref("");
const routeparams = ref(route.params.id)
const store = usemonthStore();
const honorerror = ref("");
const complete = ref("");
const post = ref([]);
const honor = reactive({
  title: "",
  description: "",
  associateWith: "",
  issuer: "",
  issueDateMonth: "",
  issueDateYear: "",
});

watchEffect(()=>{
 const edit =  storeid.profileid == route.params.id
 showfunction.value = edit
})

watchEffect(() => {
  if (honor.title.trim() == "") {
     honorerror.value = "";
  } else {
     honorerror.value = "";
  }
});

async function gethonor() {
  if (route.params.id) {
    const honor = await getconnection(
      "getHonorsAndAwars?id=" + route.params.id
    );
    post.value = honor.Message.reverse();
  } else {
    const honor = await getconnection("getHonorsAndAwars");
    post.value = honor.Message.reverse();
  }
}
  gethonor();

async function handlesubmithonor() {
  if (honor.title.trim() == "") {
    honorerror.value = "* Title is Required";
  }  

  if(honor.title.trim() != "" ) {
    const data = JSON.stringify({
      titel: honor.title,
      associateWith: honor.associateWith,
      issuer: honor.issuer,
      issueDateMonth: honor.issueDateMonth,
      issueDateYear: honor.issueDateYear,
      description: honor.description,
    });
   const newdata = await postdata("addHonorsAndAwards",data)
   await gethonor()
   honor.title = ""
  }
  
}
const router = useRouter()
const edit = () => {
  router.push("/Edit/edithonor");
};
function close(){
  honor.title = ""
  honor.associateWith = ""
  honor.description = ""
  honor.issueDateMonth = ""
  honor.issuer = ""
  honor.issueDateYear = ""
  honorerror.value = ""
}
</script>
<template>
  <div
    href="#"
    class="block mt-1 bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="px-4 flex justify-between py-2">
      <p class="text-[24px] font-bold font-ui-sans-serif">Honor & Award</p>
 <div class="flex">
          <div data-bs-toggle="modal" data-bs-target="#honor" @click="close"  class="flex hover:bg-gray-300 p-2 rounded-full hover:cursor-pointer">
            <p v-if="showfunction" class="w-5"  >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
            </p>
            <p  v-if="!routeparams" class="w-5">
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
      <div class="py-2" v-for="honor in post" :key="honor">
        <p class="text-[17px] font-bold">{{ honor.titel }}</p>
        <p v-if="honor.associateWith" class="text-[16px]">associatewith :{{ honor.associateWith }}</p>
        <p v-if="honor.issuer" class="text-[16px]">issuer:{{ honor.issuer }}</p>
        <p class="text-[16px]">{{ honor.description }}</p>
        <p class="text-[16px]">
          {{ honor.issueDateMonth }}{{ honor.issueDateYear }}
        </p>
      </div>
    </div>
  </div>


<modal id="honor" title="Add Honor & Award">
    <form @submit.prevent="handlesubmithonor">
            <p class="text-xs mb-2">* Indicates required</p>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label font-bold">Title *</label>
              <input
                v-model="honor.title"
                class="form-control border-2"
                id="recipient-name"
              />
              <p class="text-red-500 absolute">{{ honorerror }}</p>
            </div>
            <div >
              <label for="recipient-name" class="col-form-label font-bold"
                >AssociateWith </label
              >
              <input
                v-model="honor.associateWith"
                class="form-control border-2"
                id="recipient-name"
              />
            </div>
            <div >
              <label for="recipient-name" class="col-form-label font-bold"
                >Descprition </label
              >
              <textarea
                v-model="honor.description"
                class="form-control border-2"
                id="recipient-name"
                rows="3"
              />
            </div>

            <div>
              <label for="recipient-name" class="col-form-label font-bold"
                >Issuer </label
              >
              <input
                v-model="honor.issuer"
                class="form-control border-2"
                id="recipient-name"
              />
            </div>

            <div class="mb-3">
              <label for="message-text" class="col-form-label font-bold"
                >Start date
              </label>
              <div class="flex">
                <div class="w-full pe-2">
                  <select
                    v-model="honor.issueDateMonth"
                    class="form-control  border-2"
                    name=""
                    id=""
                  >
               <option value="" disabled>Select option</option>
              <option v-for="list in store.month" :key="list" :value="list">
                {{ list }}
              </option>
                   
                  </select>
                  <p class="text-red-500">{{ honorerror.issueDateMonth }}</p>
                </div>
                <div class="w-full ">
                  <select
                    v-model="honor.issueDateYear"
                    class="form-control  border-2"
                    name=""
                    id=""
                  >
                  <option value="" disabled>Select option</option>
                 <option v-for="list in store.year" :key="list" :value="list">
                 {{ list }}
                  </option>
                    
                  </select>
                  <p class="text-red-500">{{ honorerror.issueDateYear }}</p>
                </div>
              </div>
            </div>
          <hr />
          <div v-if="honor.title.trim() " class="py-3 px-2">
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
