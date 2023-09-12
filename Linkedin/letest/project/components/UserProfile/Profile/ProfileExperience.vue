<script setup>
import { usemonthStore } from "../../../store/Month";
import { useprofileStore } from "../../../store/getprofile";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const storeid = useprofileStore();
const router = useRouter();
const route = useRoute();
const showfunction = ref("");
const routeparams = ref(route.params.id);
const store = usemonthStore();
const props = defineProps(["post"]);
const post = ref([]);
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
import { postdata, getconnection, DeleteData } from "../../../services/api";
const experience = reactive({
  employment_locationtype: "",
  employment_title: "",
  employment_type: "",
  employment_compunyName: "",
  employment_location: "",
  employment_Startmonth: "",
  employment_Startyear: "",
  employment_Endmonth: "",
  employment_Endyear: "",
});
const error = reactive({
  employment_locationtype: "",
  employment_title: "",
  employment_type: "",
  employment_compunyName: "",
  employment_location: "",
  employment_Startmonth: "",
  employment_Startyear: "",
  employment_Endmonth: "",
  employment_Endyear: "",
});

const enddate = ref(false);

watchEffect(() => {
  const edit = storeid.profileid == route.params.id;
  showfunction.value = edit;
});

watchEffect(() => {
  if (experience.employment_compunyName == "") {
    error.employment_compunyName = "";
  } else {
    error.employment_compunyName = "";
  }
});
watchEffect(() => {
  if (experience.employment_type == "") {
    error.employment_type = "";
  } else {
    error.employment_type = "";
  }
});
watchEffect(() => {
  if (experience.employment_title == "") {
    error.employment_title = "";
  } else {
    error.employment_title = "";
  }
});
watchEffect(() => {
  if (experience.employment_location == "") {
    error.employment_location = "";
  } else {
    error.employment_location = "";
  }
});
watchEffect(() => {
  if (experience.employment_locationtype == "") {
    error.employment_locationtype = "";
  } else {
    error.employment_locationtype = "";
  }
});
watchEffect(() => {
  if (experience.employment_Startmonth == "") {
    error.employment_Startmonth = "";
  }else if(currentYear === experience.employment_Startyear && experience.employment_Startmonth > currentMonth){
 error.employment_Startmonth = "Start date can’t be in the future";
  }  else {
    error.employment_Startmonth = "";
  }
});
watchEffect(() => {
  if (experience.employment_Startyear == "") {
    error.employment_Startyear = "";
  } else {
    error.employment_Startyear = "";
  }
});

watchEffect(() => {
  if (experience.employment_Endmonth == "") {
    error.employment_Endmonth = "";
  } else if (
    experience.employment_Startyear == experience.employment_Endyear &&
    experience.employment_Startmonth > experience.employment_Endmonth
  ) {
    error.employment_Endmonth = "End date can’t be earlier than start date";
  } else if(currentYear === experience.employment_Endyear && experience.employment_Endmonth > currentMonth){
   error.employment_Endmonth = "End date can’t be in the future";
  }else {
    error.employment_Endmonth = "";
  }
});

watchEffect(() => {
  if (experience.employment_Endyear == "") {
    error.employment_Endyear = "";
  } else if (experience.employment_Endyear < experience.employment_Startyear) {
    error.employment_Endyear = "End date can’t be earlier than start date";
  } else {
    error.employment_Endyear = "";
  }
});

async function getusersexperience() {
  if (route.params.id) {
    const userexp = await getconnection(
      "getUserExperience?id=" + route.params.id
    );
    post.value = userexp.Message.reverse();
  } else {
    const userexp = await getconnection("getUserExperience");
    post.value = userexp.Message.reverse();
  }
}
getusersexperience();

async function handlesubmit() {
  if (experience.employment_compunyName.trim() == "") {
    error.employment_compunyName = "* Compuny_name is Required";
  }
  if (experience.employment_title.trim() == "") {
    error.employment_title = "* Title is Required";
  }
  if (experience.employment_type == "") {
    error.employment_type = "* Employe-type is Required";
  }
  if (experience.employment_location.trim() == "") {
    error.employment_location = "* Location is Required";
  }
  if (experience.employment_locationtype == "") {
    error.employment_locationtype = "* Location-type is Required";
  }
  if (experience.employment_Startmonth == "") {
    error.employment_Startmonth = "* Start-month is Required";
  }
  if (experience.employment_Startyear == "") {
    error.employment_Startyear = "* Start-year is Required";
  }
  if (experience.employment_Endmonth == "") {
    error.employment_Endmonth = "* End-month is Required";
  }
  if (experience.employment_Endyear == "") {
    error.employment_Endyear = "* End-year is Required";
  }
  if (
    experience.employment_title.trim() != "" &&
    experience.employment_type != "" &&
    experience.employment_compunyName.trim() != "" &&
    experience.employment_location.trim() != "" &&
    experience.employment_locationtype != "" &&
    experience.employment_Startmonth != "" &&
    experience.employment_Startyear != "" &&
    enddate.value == true &&
      (currentYear >=  experience.employment_Startyear && experience.employment_Startmonth <= currentMonth)
  ) {
    const data = JSON.stringify({
      companyName: experience.employment_compunyName,
      employementType: experience.employment_type,
      jobTitle: experience.employment_title,
      location: experience.employment_location,
      locationType: experience.employment_locationtype,
      startYear: experience.employment_Startyear,
      startMonth: store.month[experience.employment_Startmonth - 1],
      endMonth: store.month[experience.employment_Endmonth - 1],
      endYear: experience.employment_Endyear,
    });
    const Experience = await postdata("addUserExperience", data);
    toast.success("New Experience Added Successfully", {
      autoClose: 1500,
    });
    await getusersexperience();
       var myModalEl = document.getElementById('experience');
     var modal = bootstrap.Modal.getInstance(myModalEl)
     modal.hide();
  }
  // Endmonth & EndYear
  if (
     experience.employment_title.trim() != "" &&
    experience.employment_Endmonth != "" &&
    enddate.value == false &&
    experience.employment_compunyName != "" &&
    experience.employment_compunyName.trim() != "" &&
    experience.employment_location.trim() != "" &&
    experience.employment_locationtype != "" &&
    experience.employment_Startmonth != "" &&
    experience.employment_Startyear != "" &&
    (currentYear >= experience.employment_Endyear && experience.employment_Endmonth <= currentMonth)&&
    (experience.employment_Endyear > experience.employment_Startyear ||
      (experience.employment_Startyear === experience.employment_Endyear &&
        experience.employment_Startmonth <= experience.employment_Endmonth))
  ) {
    const data = JSON.stringify({
      companyName: experience.employment_compunyName,
      employementType: experience.employment_type,
      jobTitle: experience.employment_title,
      location: experience.employment_location,
      locationType: experience.employment_locationtype,
      startYear: experience.employment_Startyear,
      startMonth: store.month[experience.employment_Startmonth - 1],
      endMonth: store.month[experience.employment_Endmonth - 1],
      endYear: experience.employment_Endyear,
    });
    const Experience = await postdata("addUserExperience", data);
    toast.success("New Experience Added Successfully", {
      autoClose: 1500,
    });
    await getusersexperience();
    
     var myModalEl = document.getElementById('experience');
     var modal = bootstrap.Modal.getInstance(myModalEl)
     modal.hide();
  }
}

function edit() {
  router.push("/edit/editexperience");
}

function close() {
  experience.employment_compunyName = "";
  experience.employment_location = "";
  experience.employment_locationtype = "";
  experience.employment_Startmonth = "";
  experience.employment_Startyear = "";
  experience.employment_title = "";
  experience.employment_type = "";
  experience.employment_Endmonth = "";
  experience.employment_Endyear = "";
  error.employment_locationtype = "",
  error.employment_title = "",
  error.employment_type = "",
  error.employment_compunyName = "",
  error.employment_location = "",
  error.employment_Startmonth = "",
  error.employment_Startyear = "",
  error.employment_Endmonth = "",
  error.employment_Endyear = "";
}
</script>
<template>
  <div>
    <div
      href="#"
      class="block my-2 bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="px-4 flex justify-between py-2">
        <p class="text-[24px] font-bold font-ui-sans-serif">Experience</p>

        <div class="flex">
          <div data-bs-toggle="modal"   @click="close"
              data-bs-target="#experience"
            class="flex hover:bg-gray-300 p-2 rounded-full hover:cursor-pointer"
          >
            <p
              v-if="showfunction"
              class="w-5"

            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
            </p>
            <p
              v-if="!routeparams"
              class="w-5"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
            </p>
          </div>
          <div v-if="post.length > 0"
            @click="edit"
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
      <div class="pl-6 pb-2">
        <div class="py-2" v-for="experience in post" :key="experience">
          <p class="text-[17px] font-bold">{{ experience.jobTitle }}</p>
          <p class="">
            {{ experience.companyName }} &middot;
            {{ experience.employementType }}
          </p>
          <p v-if="experience.endMonth" class="text-gray-500 text-[14px]">
            {{ experience.startMonth }} {{ experience.startYear }} -
            {{ experience.endMonth }} {{ experience.endYear }}
          </p>
          <p v-else class="text-gray-500 text-[14px]">
            {{ experience.startMonth }} {{ experience.startYear }} - Present
          </p>
          <p class="text-gray-500 text-[14px]">{{ experience.location }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- -------------------------------model------------------------------ -->

  <div
    class="modal fade"
    id="experience"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="handlesubmit">
        <div class="modal-content lg:w-[700px]">
          <div class="modal-header">
            <h5
              class="modal-title text-2xl font-bold font-ui-sans-serif"
              id="exampleModalLabel"
            >
              Add Experience
            </h5>

            <button class="float-right" type="button" data-bs-dismiss="modal">
              <img
                class="w-8"
                src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png"
                alt=""
              />
            </button>
          </div>
          <div class="modal-body h-[700px] overflow-y-auto">
            <p class="text-xs mb-2">* Indicates required</p>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label font-bold"
                >Title*</label
              >
              <input
                v-model="experience.employment_title"
                class="form-control border-2 bg-gray-50"
                id="recipient-name"
              />
              <p class="text-red-600 absolute">{{ error.employment_title }}</p>
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label font-bold"
                >Employment type*</label
              >
              <select
                v-model="experience.employment_type"
             class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name=""
                id=""
              >
                <option value="" disabled>please select</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Freelance">Freelance</option>
                <option value="Traniee">Trainee</option>
              </select>
              <p class="text-red-600 absolute">{{ error.employment_type }}</p>
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label font-bold bg-gray-50"
                >Company name *</label
              >
              <input
                v-model="experience.employment_compunyName"
                class="form-control border-2 bg-gray-50"
                id="message-text"
              />
              <p class="text-red-600 absolute">
                {{ error.employment_compunyName }}
              </p>
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label font-bold"
                >Location type*
              </label>
              <select
                v-model="experience.employment_locationtype"
             class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name=""
                id=""
              >
                <option value="" disabled>please select</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
              <p class="text-red-600 absolute">
                {{ error.employment_locationtype }}
              </p>
            </div>
            <div class="mb-[30px]">
              <label for="message-text" class="col-form-label font-bold"
                >Location*</label
              >
              <input
                v-model="experience.employment_location"
                class="form-control border-2 bg-gray-50"
                id="message-text"
              />
              <p class="text-red-600 absolute">
                {{ error.employment_location }}
              </p>
            </div>

            <div class="flex">
              <input v-model="enddate" class="w-5 h-5" type="checkbox" />
              <p class="mb-2 ms-2">I am currently working in this role</p>
            </div>

            <div class="mb-3">
              <label for="message-text" class="col-form-label font-bold"
                >Start date *
              </label>
              <div class="flex">
                <div class="w-full pe-3">
                  <select
                    v-model="experience.employment_Startmonth"
                    class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name=""
                    id=""
                  >
                    <option value="" disabled>Select option</option>
                    <option
                      v-for="(list, index) in store.month"
                      :key="list"
                      :value="index + 1"
                    >
                      {{ list }}
                    </option>
                  </select>
                  <p class="text-red-600 absolute">
                    {{ error.employment_Startmonth }}
                  </p>
                </div>
                <div class="w-full">
                  <select
                    v-model="experience.employment_Startyear"
                     class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name=""
                    id=""
                  >
                    <option value="" disabled>Select option</option>
                    <option
                      v-for="list in store.year"
                      :key="list"
                      :value="list"
                    >
                      {{ list }}
                    </option>
                  </select>
                  <p class="text-red-600">{{ error.employment_Startyear }}</p>
                </div>
              </div>
            </div>
            <div v-if="!enddate" class="mb-3">
              <label for="message-text" class="col-form-label font-bold"
                >End date*
              </label>
              <div class="flex">
                <div class="w-full pe-3">
                  <select
                    v-model="experience.employment_Endmonth"
                    class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name=""
                    id=""
                  >
                    <option value="" disabled>Select option</option>
                    <option
                      v-for="(list, index) in store.month"
                      :key="list"
                      :value="index + 1"
                    >
                      {{ list }}
                    </option>
                  </select>
                  <p class="text-red-600">{{ error.employment_Endmonth }}</p>
                </div>
                <div class="w-full">
                  <select
                    v-model="experience.employment_Endyear"
                    class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name=""
                    id=""
                  >
                    <option value="" disabled>Select option</option>
                    <option
                      v-for="list in store.year"
                      :key="list"
                      :value="list"
                    >
                      {{ list }}
                    </option>
                  </select>
                  <p class="text-red-600">{{ error.employment_Endyear }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
            <div  class="py-2 px-3">
              <button
                class="float-right rounded border-2 hover:bg-blue-500 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
              >
                Save
              </button>
            </div>
          </div>
      </form>
    </div>
  </div>
</template>