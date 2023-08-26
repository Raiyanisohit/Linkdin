<script setup>
import {postdata,getconnection,DeleteData,UpdateData} from '../../../services/fetch'
import { usemonthStore } from "../../../store/Month";
const store = usemonthStore();
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const project = reactive({
  title: "",
  link: "",
  descprition: "",
  Startmonth: "",
  Startyear: "",
  Endmonth: "",
  Endyear: "",
});
const router = useRouter()

const Alluserproject = ref([])

async function getallproject(){
  const userproject = await getconnection("getUserProject")
  Alluserproject.value = userproject.Message
}
 getallproject()


const deletid = ref("")
function editmodal(id){
 deletid.value = id
  project.title = Alluserproject.value.find((i)=>i._id == id).projectName
  project.link = Alluserproject.value.find((i)=>i._id == id).link
  project.descprition = Alluserproject.value.find((i)=>i._id == id).description
  project.Startmonth = Alluserproject.value.find((i)=>i._id == id).projectStartMonth
  project.Startyear = Alluserproject.value.find((i)=>i._id == id).projectStartYear
  project.Endmonth = Alluserproject.value.find((i)=>i._id == id).projectEndMonth
  project.Endyear = Alluserproject.value.find((i)=>i._id == id).projectEndYear
}

const projecttitle =(e)=>{
project.title = e.target.value
}
const projectdescprition =(e)=>{
project.descprition = e.target.value
}
const projectstartmonth =(e)=>{
project.Startmonth = e.target.value
}
const projectdstartyear =(e)=>{
project.Startyear = e.target.value
}
const projectendmonth =(e)=>{
project.Endmonth = e.target.value
}
const projectendyear =(e)=>{
project.Endyear = e.target.value
}

async function editproject(){
   const data = JSON.stringify({
    id:deletid.value,
   "projectName": project.title ,
   "description": project.descprition ,
   "projectStartMonth": project.Startmonth ,
   "projectStartYear": project.Startyear ,
   "projectEndMonth":  project.Endmonth,
   "projectEndYear":  project.Endyear 
 });
   const newdata = await UpdateData("editUserProject",data)
   await getallproject()
}


async function removeproject(){
  const deletdata = await DeleteData(`deleteUserProject?id=${deletid.value}`)
      toast.success('Project deleted successfully');
  await getallproject()
}

  

</script>

<template>
<div class="flex justify-center">
        <div
            href="#"
            class="block mt-3  bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div class="pe-4 flex justify-between py-2">
              <div class="flex">
                <button>
              <img class="w-[50px] me-2" @click="router.push('/profile')" src="https://cdn-icons-png.flaticon.com/128/5720/5720446.png" alt="">
                </button>
              <p class="text-[25px] pt-1 ps-1 font-bold font-ui-sans-serif,">project</p>
              </div>
          </div>
            <div class="pl-6  py-3 flex justify-between " v-for="(m,index) in Alluserproject" :key="index">
                    <ul class=" justify-between"  >
                      <li class="text-[19px] py-1 font-bold" >{{ m.projectName }}</li>
                      <li class="text-[17px] pt-1 text-justify" >{{ m.description }} </li>
                      <li class="text-[17px] text-gray-500 pt-2" > {{ m.projectStartMonth }} - {{ m.projectStartYear }}</li>
                      <li class="text-[17px]  text-gray-500" > {{ m.projectEndMonth }} - {{ m.projectEndYear }} </li>
                    </ul>
                    <ul>
                       <li class="pe-5"> <p @click="editmodal(m._id)" class="w-5 ms-2" data-bs-toggle="modal" data-bs-target="#project" ><img src="https://cdn-icons-png.flaticon.com/128/61/61456.png" alt=""></p></li>
                    </ul>
                </div>
            </div>
    </div>

<modal id="project" title="Edit Project">
<form @submit.prevent="editproject">
            <p class="text-xs mb-2">* Indicates required</p>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Title *</label>
              <input
                :value="project.title"
                @input="projecttitle "
                class="form-control"
                id="recipient-name"
              />
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label"
                >Descprition *</label
              >
              <input
                :value="project.descprition"
                @input="projectdescprition"
                class="form-control"
                id="recipient-name"
              />
            </div>

            <div class="mb-3">
              <label for="message-text" class="col-form-label"
                >Start date
              </label>
              <div class="flex">
                <div class="w-full pe-2">
                  <select
                    :value="project.Startmonth"
                    @input="projectstartmonth"
                    class="form-control m-2"
                    name=""
                    id=""
                  >
               <option value="" disabled>Select option</option>
              <option v-for="list in store.month" :key="list" :value="list">
                {{ list }}
              </option>
                   
                  </select>
                </div>
                <div class="w-full pe-2">
                  <select
                    :value="project.Startyear"
                    @input="projectdstartyear"
                    class="form-control m-2"
                    name=""
                    id=""
                  >
                <option value="" disabled>Select option</option>
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
 
                  </select>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">End date </label>
              <div class="flex">
                <div class="w-full pe-2">
                  <select
                    :value="project.Endmonth"
                    @input="projectendmonth"
                    class="form-control m-2"
                    name=""
                    id=""
                  >
                 <option value="" disabled>Select option</option>
              <option v-for="list in store.month" :key="list" :value="list">
                {{ list }}
              </option>
                    
                  </select>
                </div>
                <div class="w-full pe-2">
                  <select
                    :value="project.Endyear"
                    @input="projectendyear"
                    class="form-control m-2"
                    name=""
                    id=""
                  >
               <option value="" disabled>Select option</option>
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
                   
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Project link
                </label>
                <input
                  :value="project.link"
                  class="form-control"
                  id="recipient-name"
                />
              </div>
            </div>
          <hr />
        <div class="py-3">
        <button  data-bs-dismiss="modal" class="me-1 float-right text-white rounded border-2  bg-green-600 hover:bg-green-700  px-3 py-1 border-success font-bold">SAVE</button>
        <button data-bs-dismiss="modal"  data-bs-toggle="modal" data-bs-target="#deleteproject"  class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
      </div>
      </form>
</modal>
<deletmodal id="deleteproject" title="Delete  Project?">
         <ul class=" justify-between"  >
                      <li class="text-[18px] pb-3" >Are you sure you want to delete your {{ project.title }} project?</li>
                    </ul>
 <button  data-bs-dismiss="modal"  @click="removeproject()" class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
 <button data-bs-dismiss="modal"   class="me-1 float-right border-dark rounded border-2  hover:bg-blue-400   px-3 py-1  font-bold">No thanks</button>
</deletmodal>

</template>