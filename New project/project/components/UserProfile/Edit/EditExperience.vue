<script setup>
import {
  postdata,
  getconnection,
  DeleteData,
  UpdateData,
} from "../../../services/fetch";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { usemonthStore } from "../../../store/Month";
const store = usemonthStore();
const Allexp = ref([]);

async function gelexperience() {
  const data = await getconnection("getUserExperience");
  Allexp.value = data.Message;
}
gelexperience();

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
const deletid = ref("");
function editmodal(id) {
  console.log(id);
  deletid.value = id;
  experience.employment_title = Allexp.value.find((i) => i._id == id).jobTitle;
  experience.employment_type = Allexp.value.find((i) => i._id == id).employementType;
  experience.employment_compunyName = Allexp.value.find((i) => i._id == id).companyName;
  experience.employment_location = Allexp.value.find((i) => i._id == id).location;
  experience.employment_locationtype = Allexp.value.find((i) => i._id == id).location;
  experience.employment_Startmonth = Allexp.value.find((i) => i._id == id).startMonth;
  experience.employment_Startyear = Allexp.value.find((i) => i._id == id).startYear;
  experience.employment_Endmonth = Allexp.value.find((i) => i._id == id).endMonth;
  experience.employment_Endyear = Allexp.value.find((i) => i._id == id).endYear;
}


const experiencetitle = (e) => {
  experience.employment_title = e.target.value;
};
const experiencetype = (e) => {
  experience.employment_type = e.target.value;
};
const experiencecompuny = (e) => {
   experience.employment_compunyName = e.target.value;
};
const experiencelocation = (e) => {
 experience.employment_location = e.target.value;
};
const experiencelocationtype = (e) => {
  experience.employment_locationtype = e.target.value;
};
const experiencestartmonth = (e) => {
 experience.employment_Startmonth = e.target.value;
};
const experiencestartyear = (e) => {
  experience.employment_Startyear= e.target.value;
};
const experienceendmonth = (e) => {
  experience.employment_Endmonth = e.target.value;
};
const experienceendyear = (e) => {
  experience.employment_Endyear = e.target.value;
};

async function handlesubmit(){
     const data = JSON.stringify({
        id: deletid.value,
        companyName: experience.employment_compunyName ,
        employementType: experience.employment_type,
        jobTitle:experience.employment_title,
        location:  experience.employment_location,
        locationType: experience.employment_locationtype,
        startYear:  experience.employment_Startyear,
        startMonth: experience.employment_Startmonth,
        endMonth: experience.employment_Endmonth,
        endYear: experience.employment_Endyear
  });
    const newdata = await UpdateData("editUserExperience", data);
  await gelexperience();
}

async function removEexperience(){
  const deletdata = await DeleteData(`deleteUserExperience?id=${deletid.value}`)
    toast.success('Experience Deleted successfully');
  await gelexperience();
}
const router = useRouter()
</script>

<template>
  <div class="flex justify-center">
    <div
      href="#"
      class="block mt-3 bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
                         <div class="pe-4 flex justify-between py-2">
              <div class="flex">
                <button>
              <img class="w-[50px] me-2" @click="router.push('/profile')" src="https://cdn-icons-png.flaticon.com/128/5720/5720446.png" alt="">
                </button>
              <p class="text-[25px] pt-2 font-bold font-ui-sans-serif,">Experience</p>
              </div>
             
            </div>
      <div class="pl-2 py-2 ">
        <div class="pl-6 pb-2 ">
          <div class="py-2 flex justify-between" v-for="experience in Allexp" :key="experience">
            <div>

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
            <div class="pe-5 pt-2">
              <p
                @click="editmodal(experience._id)"
                class="w-5 ms-2"
                data-bs-toggle="modal"
                data-bs-target="#editExperience"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
                  alt=""
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<!-- -----------------------------------Modal---------------------------------- -->
<!-- -----------------------------------Modal---------------------------------- -->

  <modal id="editExperience" title="Edit Your Experience ">
    <form @submit.prevent="handlesubmit">
      <p class="text-xs mb-2">* Indicates required</p>
      <div class="mb-3">
        <label for="recipient-name" class="col-form-label">Title *</label>
        <input
          :value="experience.employment_title"
          @input="experiencetitle"
          class="form-control"
          id="recipient-name"
        />
      </div>
      <div class="mb-3">
        <label for="message-text" class="col-form-label"
          >Employment type *</label
        >
        <select @input="experiencetype" :value="experience.employment_type" class="form-control" name="" id="">
          <option value="" disabled>please select</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Freelance">Freelance</option>
          <option value="Traniee">Traniee</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="message-text" class="col-form-label">Company name *</label>
        <input
          :value="experience.employment_compunyName"
          @input="experiencecompuny"
          class="form-control"
          id="message-text"
        />
      </div>
      <div class="mb-3">
        <label for="message-text" class="col-form-label"
          >Location type *
        </label>
        <select
          class="form-control"
          @input="experiencelocationtype"
          :value="experience.employment_locationtype"
          name=""
          id=""
        >
          <option value="" disabled>please select</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="message-text" class="col-form-label">Location *</label>
        <input
        @input="experiencelocation"
          :value="experience.employment_location"
          class="form-control"
          id="message-text"
        />
      </div>

      <div class="mb-3">
        <label for="message-text" class="col-form-label">Start date * </label>
        <div class="flex">
          <div class="w-full pe-3">
            <select
              :value="experience.employment_Startmonth"
              @input="experiencestartmonth"
              class="form-control"
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="list in store.month" :key="list" :value="list">
                {{ list }}
              </option>
            </select>
          </div>
          <div class="w-full ">
            <select
              :value="experience.employment_Startyear"
              @input="experiencestartyear"
              class="form-control"
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
      <div v-if="!enddate" class="mb-3">
        <label for="message-text" class="col-form-label">End date </label>
        <div class="flex">
        <div class="w-full pe-3">
          <select
            :value="experience.employment_Endmonth"
            @input="experienceendmonth"
            class="form-control"
            name=""
            id=""
          >
            <option value="" disabled>Select option</option>
            <option v-for="list in store.month" :key="list" :value="list">
              {{ list }}
            </option>
          </select>
        </div>
         <div class="w-full">
          <select
            :value="experience.employment_Endyear"
            @input="experienceendyear"
            class="form-control"
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
             <div class="py-3">
        <button  data-bs-dismiss="modal" class="me-1 float-right text-white rounded border-2  bg-green-600 hover:bg-green-700  px-3 py-1 border-success font-bold">SAVE</button>
        <button data-bs-dismiss="modal"  data-bs-toggle="modal" data-bs-target="#deleteExperience"  class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
      </div>
    </form>
  </modal>

<!-- ------------------------------------delete modal-------------------------- -->
<!-- ------------------------------------delete modal-------------------------- -->

   <deletmodal id="deleteExperience" title="Delete  Experience">
       <ul class="">
          <li class="text-[18px] py-1 ">Are you sure you want to delete your {{ experience.employment_compunyName }} experience?</li>
        </ul>
 <button  data-bs-dismiss="modal"   @click="removEexperience()" class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
 <button data-bs-dismiss="modal"   class="me-1 float-right border-dark rounded border-2  hover:bg-blue-400   px-3 py-1  font-bold">No thanks</button>
</deletmodal>
</template>