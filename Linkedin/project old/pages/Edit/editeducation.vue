<script setup>
definePageMeta({
  middleware: "auth",
});
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { usemonthStore } from "../../store/Month";
const store = usemonthStore();
import {
  postdata,
  getconnection,
  DeleteData,
  UpdateData,
} from "../../services/api";
const post = ref([]);
const route = useRoute();
const router = useRouter();
const showfunction = route.params.id;
const educationschool = ref("")
const educationdegree = ref("")
const educationstudy = ref("")
const educationdescprition = ref("")
const educationstartmonth = ref("")
const educationstartyear = ref("")
const educationendmonth = ref("")
const educationendyear = ref("")
const deletid = ref("");

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

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
// --------------------------------getUserEducationData-------------------------//

async function geteducation() {
  const educationdata = await getconnection("getUserEducationData");
  post.value = educationdata.Message;
}
geteducation();
watchEffect(() => {
  if (educationschool.value == "") {
    error.school = "";
  } else {
    error.school = "";
  }
});
watchEffect(() => {
  if (educationstartmonth.value == "") {
    error.Startmonth = "";
  }else if(currentYear === educationstartyear.value && educationstartmonth.value> currentMonth){
 error.Startmonth = "Start date can’t be in the future";
  }  else {
    error.Startmonth = "";
  }
});
watchEffect(() => {
  if (educationstartyear.value == "") {
    error.Startyear = "";
  } else {
    error.Startyear = "";
  }
});


watchEffect(() => {
  if ( educationendmonth.value == "") {
    error.Endmonth = "";
  } else if (
   educationstartyear.value ==  educationendyear.value &&
   educationstartmonth.value >  educationendmonth.value
  ) {
    error.Endmonth = "End date can’t be earlier than start date";
  }else if(currentYear ===  educationendyear.value && educationendmonth.value > currentMonth){
    error.Endmonth= "Start date can’t be in the future";
  }
   else {
    error.Endmonth = "";
  }
});

watchEffect(() => {
  if (educationendyear.value == "") {
    error.Endyear = "";
  } else if (educationendyear.value <  educationstartyear.value) {
    error.Endyear = "End date can’t be earlier than start date";
  } else {
    error.Endyear = "";
  }
});

// -------------------------------------editmodal------------------------//

function editmodal(id) {
  deletid.value = id;
  educationschool.value = post.value.find((i) => i._id == id).instituteName;
  educationdegree.value = post.value.find((i) => i._id == id).degree;
  educationstudy.value = post.value.find((i) => i._id == id).studyField;
  educationdescprition.value = post.value.find((i) => i._id == id).descprition;

  let  index = post.value.find((i) => i._id == id).startMonth;
  let monthindex = store.month.findIndex((i)=> i == index)
  educationstartmonth.value = monthindex + 1
  console.log(educationstartmonth.value)
  educationstartyear.value = post.value.find((i) => i._id == id).startYear;


  let indexendmonth = post.value.find((i) => i._id == id).endMonth;
  let endmonthindex = store.month.findIndex((i)=> i == indexendmonth)
  educationendmonth.value  = endmonthindex + 1

  educationendyear.value = post.value.find((i) => i._id == id).endYear;
}

// --------------------------editUserEducation------------------------//
async function handlesubmit() {
if (educationschool.value.trim() == "") {
    error.school = "* School-name is Requierd";
  }
 
watchEffect(() => {
  if (educationschool.value == "") {
    error.school = "";
  } else {
    error.school = "";
  }
});

  if(  educationschool.value.trim() != "" &&
    educationstartmonth.value != "" &&
    educationstartyear.value != "" &&
    educationendmonth.value != "" &&
    educationendyear.value != "" &&
    ( (currentYear >=   educationstartyear.value &&  educationstartmonth.value <= currentMonth)&&(currentYear >= educationendyear.value && educationendmonth.value  <= currentMonth) ) &&
    (educationendyear.value > educationstartyear.value ||
     (educationstartyear.value === educationendyear.value &&
     educationstartmonth.value <= educationendmonth.value)) ){
    const data = JSON.stringify({
      id: deletid.value,
    instituteName:  educationschool.value,
    degree: educationdegree.value ,
    descprition: educationdescprition.value ,
    studyField: educationstudy.value ,
    startMonth: store.month[educationstartmonth.value - 1] ,
    startYear: educationstartyear.value ,
    endMonth: store.month[educationendmonth.value - 1] ,
    endYear: educationendyear.value ,
  });

  const newdata = await UpdateData("editUserEducation", data);
        toast.success('Education updated Successfully',{
          autoClose:1500
       })
  await geteducation();

      var myModalEl = document.getElementById('eduction');
     var modal = bootstrap.Modal.getInstance(myModalEl)
     modal.hide();
    }
}

// ------------------------------------deleteUserEducation---------------------//

async function removeeducation() {
  const deletdata = await DeleteData(`deleteUserEducation?id=${deletid.value}`);
  toast.success("Education Deleted successfully",{
    autoClose:1500
  });
  await geteducation();
}
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
          <li  class="text-[17px] ">
            {{ edu.degree }} -   {{ edu.studyField }}
          </li>
          <li class="text-[17px] text-gray-500">
            {{  edu.startMonth}} -
            {{ edu.startYear }}
          </li>
          <li class="text-[17px] text-gray-500">
            {{ edu.endMonth }}- {{ edu.endYear  }}
          </li>
          <li class="text-[17px] text-gray-500">{{ edu.descprition }}</li>
        </ul>
        <ul>
          <li class="pe-5  hover:cursor-pointer">
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
            <h5 class="modal-title text-2xl font-bold font-ui-sans-serif" id="exampleModalLabel">
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
              <label for="recipient-name" class="col-form-label font-bold"
                >School / College *</label
              >
              <input
                v-model="educationschool"
                class="form-control border-2"
                id="recipient-name"
              />
              <p class="text-red-500">{{error.school}}</p>
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label font-bold"
                >Degree </label
              >
              <input
                v-model="educationdegree"
                class="form-control border-2"
                id="recipient-name"
              />
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label font-bold"
                >Field of study
              </label>
              <input
                v-model="educationstudy"
                class="form-control border-2"
                id="recipient-name"
              />
            </div>

            <div class="mb-3">
              <label for="message-text" class="col-form-label font-bold"
                >Start date *
              </label>
              <div class="flex">
                   <div class="w-full pe-3">
                <select
                  v-model="educationstartmonth"
                  class="form-control border-2 "
            
                >
                  <option value="" disabled>please select</option>
                  <option v-for="(list,index) in store.month" :key="index" :value="index + 1">
                    {{ list }}
                  </option>
                </select>
                <p class="text-red-500 absolute " >
              {{ error.Startmonth }}
            </p>
                   </div>
                      <div class="w-full ">
                <select
                  v-model="educationstartyear"
                  class="form-control border-2"
                  name=""
                  id=""
                >
                  <option value="" disabled>please select</option>
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
            <div class="mb-3">
              <label for="message-text" class="col-form-label font-bold">End date *</label>
              <div class="flex">
                   <div class="w-full pe-3">
                <select
                  v-model="educationendmonth"
                  class="form-control border-2"
                  name=""
                  id=""
                >
                  <option value="" disabled>please select</option>
                  <option v-for="(list,index) in store.month" :key="list" :value="index + 1">
                    {{ list }}
                  </option>
                </select>
               <p class="text-red-500 absolute w-72">
              {{ error.Endmonth }}
            </p>
                   </div>
                   <div class="w-full ">
                <select
                  v-model="educationendyear"
                  class="form-control border-2"
                  name=""
                  id=""
                >
                  <option v-for="list in store.year" :key="list" :value="list">
                    {{ list }}
                  </option>
                </select>
                      <p class="text-red-500 absolute w-72" >
              {{ error.Endyear }}
            </p>
                   </div>
              </div>
              <div class="my-3">
                <label for="recipient-name" class="col-form-label font-bold"
                  >Descprition </label
                >
                <textarea
                  :v-model="educationdescprition"
                  class="form-control border-2"
                  id="recipient-name"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="py-2 px-4 flex justify-between">
   
            <div
 
               data-bs-dismiss="modal"
               data-bs-toggle="modal"
               data-bs-target="#deleteeducation"
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
        </div>
      </form>
    </div>
  </div>

  <deletmodal id="deleteeducation" title="Delete  Education?">
       <ul class="">
          <li class="text-[18px] pb-3">Are you sure you want to delete your {{ educationschool }} education?</li>
        </ul>
 <button  data-bs-dismiss="modal"   @click="removeeducation()" class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
 <button data-bs-dismiss="modal"   class="me-1 float-right border-dark rounded border-2  hover:bg-blue-400   px-3 py-1  font-bold">No thanks</button>
</deletmodal>
</template>