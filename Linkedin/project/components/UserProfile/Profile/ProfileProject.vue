<script setup>
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { postdata, getconnection } from "../../../services/api";
import { useprofileStore } from "../../../store/getprofile";
const storeid = useprofileStore();
import { usemonthStore } from "../../../store/Month";
const store = usemonthStore();
const route = useRoute();
const router = useRouter();
const showfunction = ref("");
const enddate = ref(false);
const routeparams = ref(route.params.id);
const project = reactive({
  title: "",
  link: "",
  descprition: "",
  Startmonth: "",
  Startyear: "",
  Endmonth: "",
  Endyear: "",
});
const complete = ref("");
const post = ref([]);
const error = reactive({errortitle:"",startmonth:"",startyear:"",endmonth:"",endyear:""})

// ------------------------------------get_Project_Data-----------------------------------//

async function getprojectdata() {
  if (route.params.id) {
    const projectdata = await getconnection(
      "getUserProject?id=" + route.params.id
    );
    post.value = projectdata.Message;
  }else{
    const projectdata = await getconnection("getUserProject");
  post.value = projectdata.Message;
  }
}
getprojectdata();

watchEffect(() => {
  if (project.title === "") {
    error.errortitle = "";
  } else{
    error.errortitle = "";
  }
});

watchEffect(() => {
  if (project.Startmonth === "") {
      error.startmonth = "";
  } else if(currentYear === project.Startyear && project.Startmonth > currentMonth){
  error.startmonth = "Start date can’t be in the future";
  }else{
    error.startmonth = "";
  }
});
watchEffect(() => {
  if (project.Startyear == "") {
      error.startyear = "";
  } else{
   error.startyear = "";
  }
});

watchEffect(() => {
  if ( project.Endmonth == "") {
    error.endmonth = "";
  } else if (
   ( project.Startyear ==  project.Endyear &&
    project.Startmonth >  project.Endmonth ) 
  ) {
    error.endmonth = "End date can’t be earlier than start date";

  } else if(currentYear === project.Endyear && project.Endmonth > currentMonth){
    error.endmonth = "Start date can’t be in the future";
  }else{
    error.endmonth = "";

  }
});
 const currentYear = new Date().getFullYear();
   const currentMonth = new Date().getMonth() + 1;
watchEffect(() => {
  if (project.Endyear == "") {
    error.endyear = "";
  } else if (project.Endyear <  project.Startyear) {
    error.endyear = "End date can’t be earlier than start date";
  } else {
    error.endyear = "";
  }
});

async function handlesubmit(){
    if(project.title.trim() === ""){
     error.errortitle = "* Title is Required"
     }
    if(project.Startmonth === ""){
     error.startmonth = "* Start-month is Required"
     }
    if(project.Startyear === ""){
     error.startyear = "* Start-year is Required"
     }
     
    if(project.Endmonth === ""){
     error.endmonth = "* End-month is Required"
     }
    if(project.Endyear === ""){
     error.endyear = "* End-year is Required"
     }
     if(enddate.value == true && project.title != "" &&  project.Startmonth != "" && project.Startyear != "" && (currentYear >= project.Startyear && project.Startmonth <= currentMonth) ){


    
       const data = JSON.stringify({
      projectName: project.title,
      description: project.descprition,
      projectStartMonth: store.month[project.Startmonth - 1] ,
      projectStartYear: project.Startyear,
      projectEndMonth: store.month[project.Endmonth - 1],
      projectEndYear: project.Endyear,
      projectLink: project.link,
    });
    const newdata = await postdata("addUserProject", data);
      toast.success('New Project Added successfully',{
            autoClose:1500
      });
    await getprojectdata();

       var myModalEl = document.getElementById('project');
       var modal = bootstrap.Modal.getInstance(myModalEl)
       modal.hide();

     }

     if((currentYear >= project.Endyear && project.Endmonth <= currentMonth)   && project.Endmonth != "" && enddate.value != true && project.title.trim() != "" && project.Startmonth != "" && project.Startyear != "" &&  (project.Endyear > project.Startyear ||
      (project.Startyear === project.Endyear  &&
        project.Startmonth <= project.Endmonth))){
   
       const data = JSON.stringify({
      projectName: project.title,
      description: project.descprition,
      projectStartMonth: store.month[project.Startmonth - 1] ,
      projectStartYear: project.Startyear,
      projectEndMonth:  store.month[project.Endmonth - 1],
      projectEndYear: project.Endyear,
      projectLink: project.link,
    });
    const newdata = await postdata("addUserProject", data);
      toast.success('New Project Added successfully',{
            autoClose:1500
      });
    await getprojectdata();

       var myModalEl = document.getElementById('project');
       var modal = bootstrap.Modal.getInstance(myModalEl)
       modal.hide();

     }
    
}

const editproject = () => {
  router.push("/Edit/editproject");
};
watchEffect(() => {

  const edit = storeid.profileid == route.params.id;
  showfunction.value = edit;
});


function close(){

    project.title = ""
    project.descprition = ""
    project.Endmonth = ""
    project.Endyear = ""
    project.link = ""
    project.Startmonth = ""
    project.Startyear = ""
    error.endmonth = ""
    error.endyear = ""
    error.errortitle = ""
    error.startmonth = ""
    error.startyear = ""

}
</script>
<template>
  <div
    href="#"
    class="block mt-1 bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="px-4 flex justify-between py-2">
      <input type="text" class="hidden" id="txtHide">
      <p class="text-[24px] font-bold font-ui-sans-serif">Project</p>
      <div class="flex">
        <div class="flex hover:bg-gray-300 p-2 rounded-full hover:cursor-pointer">
          <p
            v-if="showfunction"
            class="w-5"
            data-bs-toggle="modal"
            data-bs-target="#project"
            @click="close"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
              alt="" 
            />
          </p>
          <p
            v-if="!routeparams"
            class="w-5"
            data-bs-toggle="modal"
            data-bs-target="#project"
            @click="close"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
              alt=""
            />
          </p>
        </div>
        <div
          @click="editproject"
          class="flex hover:bg-gray-300 p-2 rounded-full hover:cursor-pointer"
        >
          <p v-if="showfunction" class="w-5">
            <img
              src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
              alt=""
            />
          </p>
          <p v-if="!routeparams" class="w-5">
            <img
              src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
              alt=""
            />
          </p>
        </div>
      </div>
    </div>
    <div class="pl-6">
      <div class="py-2" v-for="project in post" :key="project">
        <p class="text-[17px] font-bold">{{ project.projectName }}</p>
        <p class="text-justify pe-4 pt-1">{{ project.description }}</p>
       <a target="_blank" :href="project.projectLink"><p class="text-justify pe-4 pt-1">{{ project.projectLink }}</p></a> 
        <p v-if="!project.projectEndMonth" class="text-gray-500 text-[14px] pt-1">
          {{ project.projectStartMonth }}  {{ project.projectStartYear }} - Continue
        </p>
        <p v-else class="text-gray-500 text-[14px] pt-1">
          {{ project.projectStartMonth }}  {{ project.projectStartYear }} - {{ project.projectEndMonth }}  {{ project.projectEndYear }}
        </p>
      </div>
    </div>
  </div>
 
  <!-- ------------------------------------modal ----------------------- -->

  <modal id="project" title="Add Project">
    <form @submit.prevent="handlesubmit">
      <p class="text-xs mb-2">* Indicates required</p>
      <div class="mb-3">
        <label for="recipient-name" class="col-form-label font-bold">Title*</label>
        <input
          v-model="project.title"
          class="form-control border-2 bg-gray-50"
          id="recipient-name"
        />
        <p class="text-red-500 absolute">{{error.errortitle}}</p>
      </div>
      <div class="">
        <label for="recipient-name" class="col-form-label font-bold">Descprition </label>
        <textarea
          v-model="project.descprition"
          class="form-control border-2 bg-gray-50"
          id="recipient-name"
          rows="3"
        />
      </div>
    <div class="flex ps-1 mt-3">
              <input v-model="enddate" class="w-5 h-5" type="checkbox" />
              <p class="mb-2 ms-2">I am currently working on this project</p>
            </div>
      <div class="mb-4">
        <label for="message-text" class="col-form-label font-bold">Start date* </label>
        <div class="flex">
          <div class="w-full pe-2">
               <select v-model="project.Startmonth" id="countries" class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
             <option value="" disabled>Select_Month</option>
              <option v-for="(list,index) in store.month" :key="list" :value="index + 1" >
                {{ list }}
              </option>
             </select>
           

           <p class="text-red-500 absolute">{{error.startmonth}}</p>

          </div>
          <div class="w-full ">
            <select
              v-model="project.Startyear"
             class="bg-gray-50 border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name=""
              id=""
            >
              <option value="" disabled>Select_Year</option>
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
            </select>
             <p class="text-red-500 absolute">{{error.startyear}}</p>
          </div>
        </div>
      </div>
        
      <div v-if="!enddate" class="mb-3">
        <label for="message-text" class="col-form-label font-bold">End date* </label>
        <div class="flex">
          <div class="w-full">

          <div class="w-full pe-2">
            <select
              v-model="project.Endmonth"
             class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name=""
              id=""
            >
              <option value="" disabled>Select_Month</option>
              <option v-for="(list,index) in store.month" :key="list" :value="index + 1">
                {{ list }}
              </option>
            </select>
              <p class="text-red-500 absolute w-72">{{error.endmonth}}</p>
          </div>
          </div>
          <div  class="w-full pe-2 ">
            <div class="w-full">

            <select
              v-model="project.Endyear"
           class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name=""
              id=""
            >
              <option value="" disabled>Select_Year</option>
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
            </select>
              <p class="text-red-500 absolute w-72">{{error.endyear}}</p>
            </div>
          </div>
        </div>
      </div>
        <div class="my-3 ">
          <label for="recipient-name" class="col-form-label font-bold"
            >Project link
          </label>
          <input
            v-model="project.link"
            class="form-control border-2 bg-gray-50"
            id="recipient-name"
          />
        </div>
      <hr />
      <div  class="py-2 px-3">
        <button
          class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
        >
          Save
        </button>
      </div>
    </form>
  </modal>
</template>
