<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { usemonthStore } from "../../../store/Month";
const store = usemonthStore();
import {
  postdata,
  getconnection,
  DeleteData,
  UpdateData,
} from "../../../services/fetch";
const post = ref([]);

// --------------------------------getUserEducationData-------------------------//
// --------------------------------getUserEducationData-------------------------//

async function geteducation() {
  const educationdata = await getconnection("getUserEducationData");
  console.log(educationdata);
  post.value = educationdata.Message;
}
geteducation();

const route = useRoute();
const router = useRouter();
const showfunction = route.params.id;
const education = reactive({
  school: "",
  descprition: "",
  Degree: "",
  study: "",
  Startmonth: "",
  Startyear: "",
  Endmonth: "",
  Endyear: "",
});

const deletid = ref("");

function editmodal(id) {
  deletid.value = id;
  education.school = post.value.find((i) => i._id == id).instituteName;
  education.Degree = post.value.find((i) => i._id == id).degree;
  education.study = post.value.find((i) => i._id == id).studyField;
  education.descprition = post.value.find((i) => i._id == id).descprition;
  education.Startmonth = post.value.find((i) => i._id == id).startMonth;
  education.Startyear = post.value.find((i) => i._id == id).startYear;
  education.Endmonth = post.value.find((i) => i._id == id).endMonth;
  education.Endyear = post.value.find((i) => i._id == id).endYear;
}

const educationschool = (e) => {
  education.school = e.target.value;
};
const educationdegree = (e) => {
  education.Degree = e.target.value;
};
const educationstudy = (e) => {
  education.study = e.target.value;
};
const educationdescprition = (e) => {
  education.descprition = e.target.value;
};
const educationstartmonth = (e) => {
  education.Startmonth = e.target.value;
};
const educationstartyear = (e) => {
  education.Startyear = e.target.value;
};
const educationendmonth = (e) => {
  education.Endmonth = e.target.value;
};
const educationendyear = (e) => {
  education.Endyear = e.target.value;
};

// --------------------------editUserEducation------------------------//
// --------------------------editUserEducation------------------------//

async function handlesubmit() {
  const data = JSON.stringify({
    id: deletid.value,
    instituteName:  education.school,
    degree: education.Degree ,
    descprition: education.descprition ,
    studyField: education.study ,
    startMonth: education.Startmonth ,
    startYear: education.Startyear ,
    endMonth: education.Endmonth ,
    endYear: education.Endyear ,
  });

  const newdata = await UpdateData("editUserEducation", data);
  await geteducation();
}

// ------------------------------------deleteUserEducation---------------------//
// ------------------------------------deleteUserEducation---------------------//

async function removeeducation() {
  const deletdata = await DeleteData(`deleteUserEducation?id=${deletid.value}`);
  toast.success("Education Deleted successfully");
  await geteducation();
}
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
              <p class="text-[25px] pt-2 font-bold font-ui-sans-serif,">Education</p>
              </div>
             
            </div>      <div
        class="pl-6 py-2 flex justify-between"
        v-for="(edu, index) in post"
        :key="index"
      >
        <ul class="">
          <li class="text-[19px] py-1 font-bold">{{ edu.instituteName }}</li>
          <li class="text-[17px] text-gray-500">
            {{  edu.startMonth}}
            {{ edu.startYear }}
          </li>
          <li class="text-[17px] ">
            {{ edu.degree }} -   {{ edu.studyField }}
          </li>
          <li class="text-[17px] text-gray-500">
            {{ edu.endMonth }} {{ edu.endYear  }}
          </li>
          <li class="text-[17px] text-gray-500">{{ edu.descprition }}</li>
        </ul>
        <ul>
          <li class="pe-5">
            <p
              @click="editmodal(edu._id)"
              class="w-5 ms-2"
              data-bs-toggle="modal"
              data-bs-target="#eduction"
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

  <!-- -----------------------model--------------------------- -->
  <!-- -----------------------model--------------------------- -->

  <div
    class="modal fade"
    id="eduction"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="handlesubmit">
        <div class="modal-content lg:w-[700px]">
          <div class="modal-header">
            <h5 class="modal-title text-xl" id="exampleModalLabel">
              Add eduction
            </h5>

            <button class="float-right" type="button" data-bs-dismiss="modal">
              <img
                class="w-8"
                src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png"
                alt=""
              />
            </button>
          </div>
          <div class="modal-body">
            <p class="text-xs mb-2">* Indicates required</p>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label"
                >School *</label
              >
              <input
                @input="educationschool"
                :value="education.school"
                class="form-control"
                id="recipient-name"
              />
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label"
                >Degree *</label
              >
              <input
                :value="education.Degree"
                @input="educationdegree"
                class="form-control"
                id="recipient-name"
              />
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label"
                >Field of study
              </label>
              <input
                :value="education.study"
                @input="educationstudy"
                class="form-control"
                id="recipient-name"
              />
            </div>

            <div class="mb-3">
              <label for="message-text" class="col-form-label"
                >Start date
              </label>
              <div class="flex">
                <select
                  :value="education.Startmonth"
                  @input="educationstartmonth"
                  class="form-control m-2"
                  name=""
                  id=""
                >
                  <option value="" disabled>please select</option>
                  <option v-for="list in store.month" :key="list" :value="list">
                    {{ list }}
                  </option>
                </select>

                <select
                  :value="education.Startyear"
                  @input="educationstartyear"
                  class="form-control m-2"
                  name=""
                  id=""
                >
                  <option value="" disabled>please select</option>
                  <option v-for="list in store.year" :key="list" :value="list">
                    {{ list }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">End date </label>
              <div class="flex">
                <select
                  :value="education.Endmonth"
                  @input="educationendmonth"
                  class="form-control m-2"
                  name=""
                  id=""
                >
                  <option value="" disabled>please select</option>
                  <option v-for="list in store.month" :key="list" :value="list">
                    {{ list }}
                  </option>
                </select>

                <select
                  :value="education.Endyear"
                  @input="educationendyear"
                  class="form-control m-2"
                  name=""
                  id=""
                >
                  <option v-for="list in store.year" :key="list" :value="list">
                    {{ list }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Descprition :</label
                >
                <input
                  :value="education.descprition"
                  class="form-control"
                  id="recipient-name"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="py-2 px-4">
            <button
              data-bs-dismiss="modal"
              class="me-1 float-right text-white rounded border-2 bg-green-600 hover:bg-green-700 px-3 py-1 border-success font-bold"
            >
              SAVE
            </button>
            <button
 
               data-bs-dismiss="modal"
               data-bs-toggle="modal"
               data-bs-target="#deleteeducation"
              class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700 px-3 py-1 border-danger font-bold"
            >
              DELETE
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <deletmodal id="deleteeducation" title="Delete  Education?">
       <ul class="">
          <li class="text-[18px] pb-3">Are you sure you want to delete your {{ education.school }} education?</li>
        </ul>
 <button  data-bs-dismiss="modal"   @click="removeeducation()" class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
 <button data-bs-dismiss="modal"   class="me-1 float-right border-dark rounded border-2  hover:bg-blue-400   px-3 py-1  font-bold">No thanks</button>
</deletmodal>
</template>