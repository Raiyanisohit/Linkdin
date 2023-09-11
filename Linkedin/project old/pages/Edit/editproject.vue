<script setup>
definePageMeta({
  middleware: "auth",
});
import {
  postdata,
  getconnection,
  DeleteData,
  UpdateData,
} from "../../services/api";
import { usemonthStore } from "../../store/Month";
const store = usemonthStore();
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const projecttitle = ref("");
const projectlink = ref("");
const projectdescprition = ref("");
const projectStartmonth = ref("");
const projectStartyear = ref("");
const projectEndmonth = ref("");
const projectEndyear = ref("");
const enddate = ref(false);
const router = useRouter();
const currentYear = new Date().getFullYear();
   const currentMonth = new Date().getMonth() + 1;
  const error = reactive({
    errortitle: "",
    startmonth: "",
    startyear: "",
    endmonth: "",
    endyear: "",
  });

const Alluserproject = ref([]);

// --------------------------------------getUserProject----------------------------//

async function getallproject() {
  const userproject = await getconnection("getUserProject");
  Alluserproject.value = userproject.Message;
}
getallproject();

const deletid = ref("");

// --------------------------------------editmodal----------------------------//
const ff = ref("");
const dd = ref("");
const ll = ref("")
async function editmodal(id) {
  deletid.value = id;

  projecttitle.value = Alluserproject.value.find((i) => i._id == id).projectName;
  projectlink.value = Alluserproject.value.find((i) => i._id == id).link;
  projectdescprition.value = Alluserproject.value.find((i) => i._id == id).description;
  let  index = Alluserproject.value.find((i) => i._id == id).projectStartMonth;
  let monthindex = store.month.findIndex((i)=> i == index)
  projectStartmonth.value = monthindex + 1
  projectStartyear.value = Alluserproject.value.find((i) => i._id == id).projectStartYear;
  let indexendmonth = Alluserproject.value.find((i) => i._id == id).projectEndMonth;
  let endmonthindex = store.month.findIndex((i)=> i == indexendmonth)
  projectEndmonth.value = endmonthindex + 1
  projectEndyear.value = Alluserproject.value.find((i) => i._id == id).projectEndYear;
console.log(projectEndyear.value)
  if (projectEndmonth.value == "") {
    enddate.value = true;
    } else {
    enddate.value = false;
  }
}


watchEffect(() => {
  if (projectStartmonth.value === "") {
      error.startmonth = "";
  } else if(currentYear === projectStartyear.value && projectStartmonth.value > currentMonth){
  error.startmonth = "Start date can’t be in the future";
  }else{
    error.startmonth = "";
  }
});

watchEffect(() => {
  console.log(projectEndmonth.value)
  if (projectEndmonth.value == "") {
    error.endmonth = "";
  } else if (
    projectStartyear.value == projectEndyear.value &&
    projectStartmonth.value > projectEndmonth.value
  ) {
    error.endmonth = "End date can’t be earlier than start date";
  }
  else if(currentYear === projectEndyear.value && projectEndmonth.value > currentMonth){
    error.endmonth = "Start date can’t be in the future";
  } else {
    error.endmonth = "";
  }
});

watchEffect(() => {
  if (projectEndyear.value == "") {
    error.endyear = "";
  } else if (projectEndyear.value < projectStartyear.value) {
    error.endyear = "End date can’t be earlier than start date";
  } else {
    error.endyear = "";
  }
});
// --------------------------------editUserProject--------------------------//

async function handleproject() {

  if (projecttitle.value.trim() == "") {
    error.errortitle = "* Title is Required";
  }
  if (projectStartmonth.value == "") {
    error.startmonth = "* Start-month is Required";
  }
  if (projectStartyear.value == "") {
    error.startyear = "* Start-year is Required";
  }
  if (projectEndmonth.value == "") {
    error.endmonth = "* End-month is Required";
  }
  if (projectEndyear.value == null) {
    error.endyear = "* End-year is Required";
  }

  if (
    enddate.value == true &&
    projecttitle.value.trim() != "" &&
    projectStartmonth.value != "" &&
    projectStartyear.value != "" &&
     (currentYear >= projectStartyear.value && projectStartmonth.value <= currentMonth)
  ) {

    const data = JSON.stringify({
      id: deletid.value,
      projectName: projecttitle.value,
      description: projectdescprition.value,
      projectStartMonth: store.month[projectStartmonth.value - 1],
      projectStartYear: projectStartyear.value,
      projectEndMonth: "",
      projectEndYear: "",
    });
    const newdata = await UpdateData("editUserProject", data);
          toast.success(' Project Update Successfully',{
            autoClose:1500
       })
    await getallproject();

     var myModalEl = document.getElementById('project');
     var modal = bootstrap.Modal.getInstance(myModalEl)
     modal.hide();
    
  }
//End_month && End_Year

  if ((currentYear >= projectEndyear.value && projectEndmonth.value <= currentMonth) &&
    projectEndmonth.value != "" &&
    projectEndyear.value != "" &&
    enddate.value != true &&
    projecttitle.value.trim() != "" &&
    projectStartmonth.value != "" &&
    projectStartyear.value != "" &&
    (projectEndyear.value > projectStartyear.value ||
      (projectStartyear.value === projectEndyear.value &&
        projectStartmonth.value <= projectEndmonth.value))
  ) {
    const data = JSON.stringify({
      id: deletid.value,
      projectName: projecttitle.value,
      description: projectdescprition.value,
      projectStartMonth: store.month[projectStartmonth.value - 1],
      projectStartYear: projectStartyear.value,
      projectEndMonth: store.month[projectEndmonth.value - 1],
      projectEndYear: projectEndyear.value,
    });
    const newdata = await UpdateData("editUserProject", data);
          toast.success('Project Upadated Successfully',{
            autoClose:1500
       })
    await getallproject();

     var myModalEl = document.getElementById('project');
     var modal = bootstrap.Modal.getInstance(myModalEl)
     modal.hide();
    

  }
}

// --------------------------------deleteUserProject--------------------------//

async function removeproject() {
  const deletdata = await DeleteData(`deleteUserProject?id=${deletid.value}`);
  toast.success("Project deleted successfully", {
    autoClose: 1500,
  });
  await getallproject();
}

function close() {
  error.errortitle = "";
  error.endmonth = "";
  error.endyear = "";
}
</script>

<template>
  <div class="flex justify-center">
    <div
      href="#"
      class="block mt-3 mx-2 bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="pe-4 flex justify-between py-2">
        <div class="flex">
          <button>
            <img
              class="w-[50px] me-2"
              @click="router.push('/profile')"
              src="https://cdn-icons-png.flaticon.com/128/5720/5720446.png"
              alt=""
            />
          </button>
          <p class="text-[25px] pt-1 ps-1 font-bold font-ui-sans-serif,">
            project
          </p>
        </div>
      </div>
      <div
        class="pl-6 py-3 flex justify-between"
        v-for="(m, index) in Alluserproject"
        :key="index"
      >
        <ul class="justify-between">
          <li class="text-[19px] py-1 font-bold">{{ m.projectName }}</li>
          <li class="text-[17px] pt-1 text-justify">{{ m.description }}</li>
          <li class="text-[17px] text-gray-500 pt-2">
            {{ m.projectStartMonth }} - {{ m.projectStartYear }}
          </li>
          <li v-if="m.projectEndMonth" class="text-[17px] text-gray-500">
            {{ m.projectEndMonth }} - {{ m.projectEndYear }}
          </li>
        </ul>
        <ul>
          <li @click="close" class="pe-5 hover:cursor-pointer">
            <p
              @click="editmodal(m._id)"
              class="w-5 ms-2"
              data-bs-toggle="modal"
              data-bs-target="#project"
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

  <modal id="project" title="Edit Project">
    <form @submit.prevent="handleproject">
      <p class="text-xs mb-2">* Indicates required</p>
      <div class="mb-3">
        <label for="recipient-name" class="col-form-label font-bold"
          >Title *</label
        >
        <input
          v-model="projecttitle"
          class="form-control border-2 bg-gray-50"
          id="recipient-name"
        />
        <p class="text-red-500 absolute">{{ error.errortitle }}</p>
      </div>
      <div class="mb-3">
        <label for="recipient-name" class="col-form-label font-bold"
          >Descprition
        </label>
        <textarea
          v-model="projectdescprition"
          class="form-control border-2 bg-gray-50 "
          id="recipient-name"
          rows="3"
        />
      </div>
      <div class="flex ps-1 mt-3">
        <input v-model="enddate" class="w-5 h-5" type="checkbox" />
        <p class="mb-2 ms-2">I am currently working on this project</p>
      </div>

      <div class="mb-3">
        <label for="message-text" class="col-form-label font-bold"
          >Start date *
        </label>
        <div class="flex mb-4">
          <div class="w-full pe-2">
            <select
              v-model="projectStartmonth"
             class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name=""
              id=""
            >
              <option  value="" disabled>select Option</option>
              <option
                v-for="(list, index) in store.month"
                :key="index"
                :value="index + 1"
              >
                {{ list }}
              </option>
            </select>
               <p class="text-red-500 absolute w-72">{{error.startmonth}}</p>
          </div>

          <div class="w-full pe-2">
            <select
              v-model="projectStartyear"
              class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name=""
              id=""
            >
           
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div v-if="enddate == false" class="mb-3">
        <label for="message-text" class="col-form-label font-bold"
          >End date
        </label>
        <div class="flex">
          <div class="w-full pe-2">
            <select
              v-model="projectEndmonth"
             class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
            >
              <option  value="0" selected disabled>Select option</option>
              <option
                v-for="(list, index) in store.month"
                :key="list"
                :value="index + 1"
              >
                {{ list }}
              </option>
            </select>
            <p class="text-red-500 absolute w-72">{{error.endmonth}}</p>
          </div>
          <div class="w-full pe-2">
            <select
             class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="projectEndyear"
             
            >
               <option value="null" selected  disabled>Select option </option>
            <option v-for="list in store.year" :key="list" :value="list">
              {{ list }}
            </option>
            </select>
            <p class="text-red-500 absolute w-72">{{ error.endyear }}</p>
          </div>
        </div>
        <div class="my-3">
          <label for="recipient-name" class="col-form-label font-bold bg-gray-50"
            >Project link
          </label>
          <input
            v-model="projectlink"
            class="form-control border-2 bg-gray-50"
            id="recipient-name"
          />
        </div>
      </div>
      <hr />
      <div class="py-3 flex justify-between">
        <button
          data-bs-dismiss="modal"
          data-bs-toggle="modal"
          data-bs-target="#deleteproject"
          class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700 px-3 py-1 border-danger font-bold"
        >
          DELETE
        </button>
        <!-- <button
          v-if="
            (projectEndmonth && 
            projectEndyear &&
            enddate == false &&
            (projectEndyear > projectStartyear ||
            (projectStartyear === projectEndyear) &
            (projectStartmonth  <= projectEndmonth))) ||
            (projectStartyear &&
            projectStartmonth &&
            enddate == true 
             )
          "
          data-bs-dismiss="modal"
          class="me-1 float-right text-white rounded border-2 bg-green-600 hover:bg-green-700 px-3 py-1 border-success font-bold"
        >
          SAVE
        </button> -->
        <button
          class="me-1 float-right text-white rounded border-2 bg-green-600 hover:bg-green-700 px-3 py-1 border-success font-bold"
        >
          SAVE
        </button>
      </div>
    </form>
  </modal>
  <deletmodal id="deleteproject" title="Delete  Project?">
    <ul class="justify-between">
      <li class="text-[18px] pb-3">
        Are you sure you want to delete your {{ projecttitle }} project?
      </li>
    </ul>
    <button
      data-bs-dismiss="modal"
      @click="removeproject()"
      class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700 px-3 py-1 border-danger font-bold"
    >
      DELETE
    </button>
    <button
      data-bs-dismiss="modal"
      class="me-1 float-right border-dark rounded border-2 hover:bg-blue-400 px-3 py-1 font-bold"
    >
      No thanks
    </button>
  </deletmodal>
</template>