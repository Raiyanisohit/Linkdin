<script setup>
import { postdata, getconnection, DeleteData } from "../../../services/fetch";
import { usemonthStore } from "../../../store/Month";
import { useprofileStore } from "../../../store/getprofile";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const storeid = useprofileStore();
const showfunction = ref("");
const route = useRoute();
const routeparams = ref(route.params.id);
const store = usemonthStore();
const post = ref([]);
const router = useRouter();
const education = reactive({
  school: "",
  grade: "",
  Degree: "",
  study: "",
  Startmonth: "",
  Startyear: "",
  Endmonth: "",
  Endyear: "",
});
const error = reactive({
  school: "",
  grade: "",
  Degree: "",
  study: "",
  Startmonth: "",
  Startyear: "",
  Endmonth: "",
  Endyear: "",
});
watchEffect(() => {
  if (education.school == "") {
    error.school = "";
  } else {
    error.school = "";
  }
});
watchEffect(() => {
  if (education.Startmonth == "") {
    error.Startmonth = "";
  } else {
    error.Startmonth = "";
  }
});
watchEffect(() => {
  if (education.Startyear == "") {
    error.Startyear = "";
  } else {
    error.Startyear = "";
  }
});


watchEffect(() => {
  if ( education.Endmonth == "") {
    error.Endmonth = "";
  } else if (
   education.Startyear ==  education.Endyear &&
   education.Startmonth >  education.Endmonth
  ) {
    error.Endmonth = "plese select valid Month";
  } else {
    error.Endmonth = "";
  }
});

watchEffect(() => {
  if (education.Endyear == "") {
    error.Endyear = "";
  } else if (education.Endyear <  education.Startyear) {
    error.Endyear = "plese select valid year";
  } else {
    error.Endyear = "";
  }
});

watchEffect(() => {
  const edit = storeid.profileid == route.params.id;
  showfunction.value = edit;
});



const educationerror = ref("");
console.log(education.Startmonth);
async function geteducation() {
  if (route.params.id) {
    const educationdata = await getconnection(
      "getUserEducationData?id=" + route.params.id
    );
    post.value = educationdata.Message;
  } else {
    const educationdata = await getconnection("getUserEducationData");
    post.value = educationdata.Message;
  }
}
geteducation();

async function handlesubmit() {
  if (education.school == "") {
    error.school = "* School is Requierd";
  }
  if (education.Startmonth == "") {
    error.Startmonth = "* Start_month is Required";
  }
  if (education.Startyear == "") {
    error.Startyear = "* Start_year is Required";
  }
  if (education.Endmonth == "") {
    error.Endmonth = "* End_month is Required";
  }
  if (education.Endyear == "") {
    error.Endyear = "* End_year is Required";
  }
  if (
    education.school != "" &&
    education.Startmonth != "" &&
    education.Startyear != "" &&
    education.Endmonth != "" &&
    education.Endyear != "" &&
    (education.Endyear > education.Startyear ||
      (education.Startyear === education.Endyear &&
        education.Startmonth <= education.Endmonth))

    
  ) {
    const data = JSON.stringify({
      instituteName: education.school,
      degree: education.Degree,
      studyField: education.study,
      startYear: education.Startyear,
      startMonth: store.month[education.Startmonth - 1],
      endYear: education.Endyear,
      endMonth: store.month[education.Endmonth - 1],
      grade: education.grade,
    });

    const Newdata = await postdata("addUserEducation", data);
     toast.success('New Education Added Successfully');
    education.school = "";
    education.Degree = "";
    education.study = "";
    education.Startyear = "";
    education.Startmonth = "";
    education.Endyear = "";
    education.Endmonth = "";
    education.grade = "";
    await geteducation();
  }
}

function edit() {
  router.push("/edit/editeducation");
}
</script>

<template>
  <div>
    <div
      href="#"
      class="block mt-1 bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="px-4 flex justify-between py-2">
        <p class="text-[24px] font-bold font-ui-sans-serif">Education</p>
        <div class="flex">
          <div class="flex hover:bg-gray-300 p-2 rounded-full">
            <p
              v-if="showfunction"
              class="w-5"
              data-bs-toggle="modal"
              data-bs-target="#eduction"
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
              data-bs-target="#eduction"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
            </p>
          </div>
          <div @click="edit" class="flex hover:bg-gray-300 p-2 rounded-full">
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
        <div class="py-2" v-for="edu in post" :key="edu">
          <p class="text-[17px] font-bold">{{ edu.instituteName }}</p>
          <p v-if="edu.degree" class="">
            {{ edu.degree }} - {{ edu.studyField }}
          </p>
          <p v-else class="">{{ edu.studyField }}</p>
          <p class="text-gray-500 text-[14px]">
            {{ edu.startMonth }} - {{ edu.startYear }}
          </p>
          <p class="text-gray-500 text-[14px]">
            {{ edu.endMonth }} -
            {{ edu.endYear }}
          </p>
          <p class="text-gray-500 text-[14px]">{{ edu.descprition }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- -----------------------model--------------------------- -->
  <!-- -----------------------model--------------------------- -->

  <modal id="eduction" title="Add Eduction">
    <form @submit.prevent="handlesubmit">
      <p class="text-xs mb-2">* Indicates required</p>
      <div class="mb-3">
        <label for="recipient-name" class="col-form-label font-bold">School *</label>
        <input
          v-model="education.school"
          class="form-control border-2"
          id="recipient-name"
        />
        <p class="text-red-500 absolute" >
          {{ error.school }}
        </p>
      </div>
      <div class="mb-3">
        <label for="recipient-name" class="col-form-label font-bold">Degree </label>
        <input
          v-model="education.Degree"
          class="form-control border-2"
          id="recipient-name"
        />
      </div>
      <div class="mb-3">
        <label for="recipient-name" class="col-form-label font-bold"
          >Field of study
        </label>
        <input
          v-model="education.study"
          class="form-control border-2"
          id="recipient-name"
        />
      </div>

      <div class="mb-3">
        <label for="message-text " class="col-form-label font-bold">Start date * </label>
        <div class="flex">
          <div class="w-full me-3">
            <select
              v-model="education.Startmonth"
              class="form-control border-2 "
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="(list,index) in store.month" :key="list" :value="index + 1">
                {{ list }}
              </option>
            </select>
            <p class="text-red-500 absolute " >
              {{ error.Startmonth }}
            </p>
          </div>
          <div class="w-full me-2">
            <select
              v-model="education.Startyear"
              class="form-control border-2 "
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
            </select>
            <p class="text-red-500 absolute" >
              {{ error.Startyear }}
            </p>
          </div>
        </div>
      </div>
      <div class="my-3 mt-4">
        <label for="message-text" class="col-form-label font-bold">End date * </label>
        <div class="flex">
          <div class="w-full me-3">
            <select
              v-model="education.Endmonth"
              class="form-control border-2 "
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="(list,index) in store.month" :key="list" :value="index + 1">
                {{ list }}
              </option>
            </select>
            <p class="text-red-500 absolute">
              {{ error.Endmonth }}
            </p>
          </div>
          <div class="w-full me-2">
            <select
              v-model="education.Endyear"
              class="form-control border-2 "
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
            </select>
            <p class="text-red-500 absolute" >
              {{ error.Endyear }}
            </p>
          </div>
        </div>
        <div class="my-4">
          <label for="recipient-name" class="col-form-label font-bold">Grade </label>
          <input
            v-model="education.grade"
            class="form-control border-2"
            id="recipient-name"
          />
        </div>
      </div>
      <hr class="border-4" />
      <div v-if="education.Endyear && education.school && education.Startmonth && education.Startyear" class="py-2 px-3">
        <button
          data-bs-dismiss="modal"
          class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white px-3 py-1 border-info font-bold"
          @click="submitSkill"
        >
          Save
        </button>
      </div>
      <div v-else class="py-2">
        <button
          class="float-right rounded border-2 hover:bg-blue-500 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
        >
          Save
        </button>
      </div>
    </form>
  </modal>
</template>