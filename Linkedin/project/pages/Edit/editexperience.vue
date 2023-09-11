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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { usemonthStore } from "../../store/Month";
const store = usemonthStore();
const Allexp = ref([]);

async function gelexperience() {
  const data = await getconnection("getUserExperience");
  Allexp.value = data.Message;
}
gelexperience();
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const deletid = ref("");
const experiencetitle = ref("");
const experiencetype = ref("");
const experiencecompunyName = ref("");
const experiencelocation = ref("");
const experienceStartmonth = ref("");
const experiencelocationtype = ref("");
const experienceStartyear = ref("");
const experienceEndmonth = ref("");
const experienceEndyear = ref("");
const enddate = ref(false);
const startmonth = ref("");
const endmonth = ref("");
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

// ------------------------------------editmodal---------------------//

function editmodal(id) {
  deletid.value = id;
  experiencetitle.value = Allexp.value.find((i) => i._id == id).jobTitle;
  experiencetype.value = Allexp.value.find((i) => i._id == id).employementType;
  experiencecompunyName.value = Allexp.value.find((i) => i._id == id).companyName;
  experiencelocation.value = Allexp.value.find((i) => i._id == id).location;
  experiencelocationtype.value = Allexp.value.find((i) => i._id == id).locationType;

  let  index = Allexp.value.find((i) => i._id == id).startMonth;
  let monthindex = store.month.findIndex((i)=> i == index)
  experienceStartmonth.value = monthindex + 1

let indexendmonth =  Allexp.value.find((i) => i._id == id).endMonth;;
  let endmonthindex = store.month.findIndex((i)=> i == indexendmonth)
  experienceEndmonth.value = endmonthindex + 1

  experienceStartyear.value = Allexp.value.find((i) => i._id == id).startYear;
  experienceEndyear.value = Allexp.value.find((i) => i._id == id).endYear;
  startmonth.value = Allexp.value.find((i) => i._id == id).startMonth;
  endmonth.value = Allexp.value.find((i) => i._id == id).endMonth;

  if (experienceEndmonth.value == "") {
    enddate.value = true;
    } else {
    enddate.value = false;
  }
}
watchEffect(() => {
  if (experienceEndmonth.value == "") {
    error.employment_Endmonth = "";
  } else if (
    experienceStartyear.value == experienceEndyear.value &&
    experienceStartmonth.value > experienceEndmonth.value
  ) {
    error.employment_Endmonth = "End date can’t be earlier than start date";
  }else if(currentYear === experienceEndyear.value && experienceEndmonth.value > currentMonth){
   error.employment_Endmonth = "Start date can’t be in the future";
  } else {
    error.employment_Endmonth = "";
  }
});

watchEffect(() => {
  if (experienceStartmonth.value === "") {
    error.employment_Startmonth = "";
  } else if(currentYear == experienceStartyear.value && experienceStartmonth.value > currentMonth ){
 error.employment_Startmonth = "Start date can’t be in the future";

  } else {
    error.employment_Startmonth = "";
  }
});

watchEffect(() => {
  if (experienceEndyear.value == "") {
    error.employment_Endyear = "";
  } else if (experienceEndyear.value < experienceStartyear.value) {
    error.employment_Endyear = "End date can’t be earlier than start date";
  } else {
    error.employment_Endyear = "";
  }
});

// ---------------------------------editUserExperience---------------------//

async function handlesubmit() {
  if (experiencecompunyName.value.trim() == "") {
    error.employment_compunyName = "* Compuny_name is Required";
  }
  if (experiencetitle.value.trim() == "") {
    error.employment_title = "* Title is Required";
  }
  if (experiencetype.value == "") {
    error.employment_type = "* Employe-type is Required";
  }
  if (experiencelocation.value.trim() == "") {
    error.employment_location = "* Location is Required";
  }
  if (experiencelocationtype.value == "") {
    error.employment_locationtype = "* Location-type is Required";
  }
  if (experienceStartmonth.value == "") {
    error.employment_Startmonth = "* Start-month is Required";
  }
  if (experienceStartyear.value == "") {
    error.employment_Startyear = "* Start-year is Required";
  }
  if (experienceEndmonth.value == "") {
    error.employment_Endmonth = "* End-month is Required";
  }
  if (experienceEndyear.value == "") {
    error.employment_Endyear = "* End-year is Required";
  }
  if (
    experiencecompunyName.value.trim() != "" &&
    experiencelocation.value.trim() != "" &&
    experiencelocationtype.value != "" &&
    experienceStartmonth.value != "" &&
    experienceStartyear.value != "" &&
    experiencetitle.value.trim() != "" &&
    experiencetype.value != "" &&
    enddate.value == true &&
     (currentYear >= experienceStartyear.value && experienceStartmonth.value <= currentMonth)
  ) {
    const data = JSON.stringify({
      id: deletid.value,
      companyName: experiencecompunyName.value,
      employementType: experiencetype.value,
      jobTitle: experiencetitle.value,
      location: experiencelocation.value,
      locationType: experiencelocationtype.value,
      startYear: experienceStartyear.value,
      startMonth: store.month[experienceStartmonth.value - 1],
      endMonth: "",
      endYear: "",
    });
    const newdata = await UpdateData("editUserExperience", data);
    toast.success(" Experience updated Successfully", {
      autoClose: 1500,
    });
    await gelexperience();

     var myModalEl = document.getElementById('editExperience');
     var modal = bootstrap.Modal.getInstance(myModalEl)
     modal.hide();
    
  }

  if (
    experienceEndmonth.value != "" &&
    enddate.value == false &&
    experiencetitle.value.trim() &&
    experiencecompunyName.value != "" &&
    experienceStartmonth.value != "" &&
    experienceStartyear.value != "" &&
    (currentYear >=experienceEndyear.value && experienceEndmonth.value <= currentMonth)
    (experienceEndyear.value > experienceStartyear.value ||
      (experienceStartyear.value === experienceEndyear.value &&
        experienceStartmonth.value < experienceEndmonth.value))
  ) {
    const data = JSON.stringify({
      id: deletid.value,
      companyName: experiencecompunyName.value,
      employementType: experiencetype.value,
      jobTitle: experiencetitle.value,
      location: experiencelocation.value,
      locationType: experiencelocationtype.value,
      startYear: experienceStartyear.value,
      startMonth: store.month[experienceStartmonth.value - 1],
      endMonth: store.month[experienceEndmonth.value - 1],
      endYear: experienceEndyear.value,
    });
    const newdata = await UpdateData("editUserExperience", data);
    toast.success(" Experience updated Successfully", {
      autoClose: 1500,
    });
    await gelexperience();
     var myModalEl = document.getElementById('editExperience');
     var modal = bootstrap.Modal.getInstance(myModalEl)
     modal.hide();
  }
}

// ------------------------------------deleteUserExperience------------------//

async function removEexperience() {
  const deletdata = await DeleteData(
    `deleteUserExperience?id=${deletid.value}`
  );
  toast.success("Experience Deleted successfully", {
    autoClose: 1500,
  });
  await gelexperience();
}
const router = useRouter();
</script>

<template>
  <div class="flex justify-center">
    <div
      href="#"
      class="block mt-3 bg-white lg:me-7 border border-gray-200 mx-2 w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
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
          <p class="text-[25px] pt-2 font-bold font-ui-sans-serif,">
            Experience
          </p>
        </div>
      </div>
      <div class="pl-2 py-2">
        <div class="pl-6 pb-2">
          <div
            class="py-2 flex justify-between"
            v-for="experience in Allexp"
            :key="experience"
          >
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
            <div class="pe-5 pt-2 hover:cursor-pointer">
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

  <modal id="editExperience" title="Edit  Experience ">
    <form @submit.prevent="handlesubmit">
      <p class="text-xs mb-2">* Indicates required</p>
      <div class="mb-2">
        <label for="recipient-name" class="col-form-label font-bold"
          >Title *</label
        >
        <input
          v-model="experiencetitle"
          class="form-control border-2 bg-gray-50"
          id="recipient-name"
        />
      </div>
      <p class="text-red-600 absolute">{{ error.employment_title }}</p>
      <div class="mb-3 pt-3">
        <label for="message-text" class="col-form-label font-bold"
          >Employment type *</label
        >
        <select
          v-model="experiencetype"
 class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name=""
          id=""
        >
          <option value="" disabled>please select</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Freelance">Freelance</option>
          <option value="Traniee">Traniee</option>
        </select>
      </div>
      <p class="text-red-600 absolute">{{ error.employment_type }}</p>
      <div class="mb-2">
        <label for="message-text" class="col-form-label font-bold"
          >Company name *</label
        >
        <input
          v-model="experiencecompunyName"
          class="form-control border-2 bg-gray-50"
          id="message-text"
        />
      </div>
      <p class="text-red-600 absolute">{{ error.employment_compunyName }}</p>
      <div class="mb-3 pt-3">
        <label for="message-text" class="col-form-label font-bold"
          >Location type *
        </label>
        <select
        class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :value="experiencelocationtype"
          name=""
          id=""
        >
          <option value="" disabled>please select</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </select>
      </div>
      <p class="text-red-600 absolute">{{ error.employment_locationtype }}</p>
      <div class="mb-2">
        <label for="message-text" class="col-form-label font-bold"
          >Location *</label
        >
        <input
          v-model="experiencelocation"
          class="form-control border-2 bg-gray-50"
          id="message-text"
        />
      </div>
      <p class="text-red-600 absolute">{{ error.employment_location }}</p>
      <div class="flex pt-4">
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
              v-model="experienceStartmonth"
              class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name=""
              id=""
            >
              <option  disabled>select option</option>
              <option
                v-for="(list, index) in store.month"
                :key="list"
                :value="index + 1"
              >
                {{ list }}
              </option>
            </select>
              <p class="text-red-600">{{ error.employment_Startmonth }}</p>
          </div>
          <div class="w-full">
            <select
              v-model="experienceStartyear"
            class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div v-if="enddate == false" class="mb-3">
        <label for="message-text" class="col-form-label font-bold"
          >End date
        </label>
        <div class="flex">
          <div class="w-full pe-3">
            <select
              v-model="experienceEndmonth"
             class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name=""
              id=""
            >
              <option  value="0" disabled>Select option</option>
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
              v-model="experienceEndyear"
               class="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
            </select>

            <p class="text-red-600">{{ error.employment_Endyear }}</p>
          </div>
        </div>
      </div>
      <div class="py-3 flex justify-between">
        <div
          data-bs-dismiss="modal"
          data-bs-toggle="modal"
          data-bs-target="#deleteExperience"
          class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700 px-3 py-1 border-danger font-bold"
        >
          DELETE
        </div>
        
        <button
          class="me-1 float-right text-white rounded border-2 bg-green-600 hover:bg-green-700 px-3 py-1 border-success font-bold"
        >
          SAVE
        </button>
      </div>
    </form>
  </modal>

  <!-- ------------------------------------delete modal-------------------------- -->

  <deletmodal id="deleteExperience" title="Delete  Experience">
    <ul class="">
      <li class="text-[18px] py-1">
        Are you sure you want to delete your
        {{ experiencecompunyName }} experience?
      </li>
    </ul>
    <button
      data-bs-dismiss="modal"
      @click="removEexperience()"
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