<script setup>
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { postdata, getconnection } from "../../../services/fetch";
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

async function getprojectdata() {
  if (route.params.id) {
    const projectdata = await getconnection(
      "getUserProject?id=" + route.params.id
    );
    post.value = projectdata.Message;
  }
  const projectdata = await getconnection("getUserProject");
  console.log(projectdata);
  post.value = projectdata.Message;
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
  } else{
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
    project.Startyear ==  project.Endyear &&
    project.Startmonth >  project.Endmonth
  ) {
    error.endmonth = "plese select valid Month";
  } else {
    error.endmonth = "";
  }
});

watchEffect(() => {
  if (project.Endyear == "") {
    error.endyear = "";
  } else if (project.Endyear <  project.Startyear) {
    error.endyear = "plese select valid year";
  } else {
    error.endyear = "";
  }
});

async function handlesubmit(){
    if(project.title.trim() === ""){
     error.errortitle = "* Title is Required"
     }
    if(project.Startmonth === ""){
     error.startmonth = "* Start_month is Required"
     }
    if(project.Startyear === ""){
     error.startyear = "* Start_year is Required"
     }
     
     if(enddate == false && project.title.trim() != "" && project.Startmonth != "" && project.Startyear != "" ){
       const data = JSON.stringify({
      projectName: project.title,
      description: project.descprition,
      projectStartMonth: store.month[project.Startmonth - 1] ,
      projectStartYear: project.Startyear,
      projectEndMonth: store.month[project.Endmonth - 1],
      projectEndYear: project.Endyear,
      projectLink: project.link,
    });
    console.log("first")
    // const newdata = await postdata("addUserProject", data);
    //   toast.success('New Project Added successfully');
    // await getprojectdata();
    // project.title = ""
    // project.descprition = ""
    // project.Endmonth = ""
    // project.Endyear = ""
    // project.link = ""
    // project.Startmonth = ""
    // project.Startyear = ""
     }


     if(project.Endmonth != "" && enddate.value != true && project.title.trim() != "" && project.Startmonth != "" && project.Startyear != "" &&     (project.Endyear > project.Startyear ||
      (project.Startyear === project.Endyear &&
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
    console.log("second")
    // const newdata = await postdata("addUserProject", data);
    //   toast.success('New Project Added successfully');
    await getprojectdata();
    project.title = ""
    project.descprition = ""
    project.Endmonth = ""
    project.Endyear = ""
    project.link = ""
    project.Startmonth = ""
    project.Startyear = ""
     }
    
}

const editproject = () => {
  router.push("/Edit/editproject");
};
watchEffect(() => {
  const edit = storeid.profileid == route.params.id;
  showfunction.value = edit;
});
</script>
<template>
  <div
    href="#"
    class="block mt-1 bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="px-4 flex justify-between py-2">
      <p class="text-[24px] font-bold font-ui-sans-serif">Project</p>
      <div class="flex">
        <div class="flex hover:bg-gray-300 p-2 rounded-full">
          <p
            v-if="showfunction"
            class="w-5"
            data-bs-toggle="modal"
            data-bs-target="#project"
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
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
              alt=""
            />
          </p>
        </div>
        <div
          @click="editproject"
          class="flex hover:bg-gray-300 p-2 rounded-full"
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
        <p class="text-gray-500 text-[14px] pt-1">
          {{ project.projectStartMonth }} - {{ project.projectStartYear }}
        </p>
        <p v-if="project.projectEndMonth" class="text-gray-500 text-[14px] ">
          {{ project.projectEndMonth }} - {{ project.projectEndYear }}
        </p>
      </div>
    </div>
  </div>
 
  <!-- ------------------------------------modal ----------------------- -->
  <!-- ------------------------------------modal ----------------------- -->

  <modal id="project" title="Add Project">
    <form @submit.prevent="handlesubmit">
      <p class="text-xs mb-2">* Indicates required</p>
      <div class="mb-3">
        <label for="recipient-name" class="col-form-label font-bold">Title *</label>
        <input
          v-model="project.title"
          class="form-control border-2"
          id="recipient-name"
        />
        <p class="text-red-500 absolute">{{error.errortitle}}</p>
      </div>
      <div class="">
        <label for="recipient-name" class="col-form-label font-bold">Descprition </label>
        <textarea
          v-model="project.descprition"
          class="form-control border-2"
          id="recipient-name"
        />
      </div>
    <div class="flex ps-1 mt-3">
              <input v-model="enddate" class="w-5 h-5" type="checkbox" />
              <p class="mb-2 ms-2">I am currently working on this project</p>
            </div>
      <div class="mb-4">
        <label for="message-text" class="col-form-label font-bold">Start date * </label>
        <div class="flex">
          <div class="w-full pe-2">
            <select
              v-model="project.Startmonth"
              class="form-control  border-2"
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="(list,index) in store.month" :key="list" :value="index + 1">
                {{ list }}
              </option>
            </select>
         

           <p class="text-red-500 absolute">{{error.startmonth}}</p>

          </div>
          <div class="w-full ">
            <select
              v-model="project.Startyear"
              class="form-control  border-2"
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
            </select>
             <p class="text-red-500 absolute">{{error.startyear}}</p>
          </div>
        </div>
      </div>
        
      <div v-if="!enddate" class="mb-3">
        <label for="message-text" class="col-form-label font-bold">End date </label>
        <div class="flex">
          <div class="w-full">

          <div class="w-full pe-2">
            <select
              v-model="project.Endmonth"
              class="form-control  border-2"
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="(list,index) in store.month" :key="list" :value="index + 1">
                {{ list }}
              </option>
            </select>
              <p class="text-red-500 absolute">{{error.endmonth}}</p>
          </div>
          </div>
          <div  class="w-full pe-2">
            <div class="w-full">

            <select
              v-model="project.Endyear"
              class="form-control  border-2"
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
            </select>
              <p class="text-red-500 absolute">{{error.endyear}}</p>
            </div>
          </div>
        </div>
      </div>
        <div class="my-3">
          <label for="recipient-name" class="col-form-label font-bold"
            >Project link
          </label>
          <input
            v-model="project.link"
            class="form-control border-2"
            id="recipient-name"
          />
        </div>
      <hr />
      <div v-if=" project.Startyear && project.title && project.Startmonth" class="py-2 px-3">
        <button
          data-bs-dismiss="modal"
          class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
          @click="submitSkill"
        >
          Save
        </button>
      </div>
     
      <div v-else class="py-2 px-3">
        <button
          class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
        >
          Save
        </button>
      </div>
    </form>
  </modal>
</template>
