<script setup>
import { usesignupdataStore } from "../../store/signupdata";
import { usemonthStore } from "../../store/Month";
import { postdata } from "../../services/fetch";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const storemonth = usemonthStore();
const store = usesignupdataStore();
const inputjob = reactive({
  jobtitle: "",
  employe: "",
  role: true,
  compunyname: "",
  Startmonth: "",
  Startyear: "",
  Endmonth: "",
  Endyear: "",
});
const validationerror = reactive({
  true: "",
  joberror: "",
  employeerror: "",
  compunyname: "",
  startmonth: "",
  Startyear: "",
  Endyear: "",
  Endmonth: "",
});
const router = useRouter();
const validationrouter = ref(false);

function selectemploye(e) {
  inputjob.employe = e.target.value;
}

watchEffect(() => {
  if (inputjob.compunyname == "") {
    validationerror.compunyname = "";
  } else {
    validationerror.compunyname = "";
  }
});
watchEffect(() => {
  if (inputjob.employe == "") {
    validationerror.employeerror = "";
  } else {
    validationerror.employeerror = "";
  }
});
watchEffect(() => {
  if (inputjob.jobtitle == "") {
    validationerror.joberror = "";
  } else {
    validationerror.joberror = "";
  }
});

watchEffect(() => {
  if (inputjob.Startmonth == "") {
    validationerror.startmonth = "";
  } else {
    validationerror.startmonth = "";
  }
});
watchEffect(() => {
  if (inputjob.Startyear == "") {
    validationerror.Startyear = "";
  } else {
    validationerror.Startyear = "";
  }
});

watchEffect(() => {
  if (inputjob.Endyear == "") {
    validationerror.Endyear = "";
  } else if (inputjob.Endyear < inputjob.Startyear) {
    validationerror.Endyear = "plese select valid year";
  } else {
    validationerror.Endyear = "";
  }
});

watchEffect(() => {
  if (inputjob.Endmonth == "") {
    validationerror.Endmonth = "";
  } else if (
    inputjob.Startyear == inputjob.Endyear &&
    inputjob.Startmonth > inputjob.Endmonth
  ) {
    validationerror.Endmonth = "plese select valid Month";
  } else {
    validationerror.Endmonth = "";
  }
});

async function handlesubmit() {
  if (inputjob.jobtitle.trim() == "") {
    validationerror.joberror = "* Jobtitle is Required ";
  }
  if (inputjob.employe == "") {
    validationerror.employeerror = "* Employe_type is Required ";
  }
  if (inputjob.compunyname.trim() == "") {
    validationerror.compunyname = "* Compuny_Name is Required ";
  }
  if (inputjob.Startmonth == "") {
    validationerror.startmonth = "* Start_month is Required ";
  }
  if (inputjob.Startyear == "") {
    validationerror.Startyear = "* Start_year is Required";
  }
  if (inputjob.role == false) {
    if (inputjob.Endmonth == "") {
      validationerror.Endmonth = "* End_month is Required ";
    }
  }
  if (inputjob.role == false) {
    if (inputjob.Endyear == "") {
      validationerror.Endyear = "* End_year is Required ";
    }
  }

  if (
    inputjob.compunyname.trim() != "" &&
    inputjob.employe != "" &&
    inputjob.jobtitle.trim() != "" &&
    inputjob.Startmonth != "" &&
    inputjob.Startyear != "" &&
    inputjob.role == true
  ) {
    if (validationrouter.value != true) {
      toast.error("Please  accept the Terms and Conditions before submitting the form.", {
        position: "top-center",
      });
    } else {
      store.experince.jobtitle = inputjob.jobtitle;
      store.experince.employe = inputjob.employe;
      store.experince.compunyname = inputjob.compunyname;
      store.experince.Startmonth = storemonth.month[inputjob.Startmonth - 1];
      store.experince.Startyear = storemonth.year[inputjob.Startyear];
      store.experince.Endmonth = "";
      store.experince.Endyear = "0";

      const data = JSON.stringify({
        email: store.data.email,
        firstName: store.data.firstname,
        lastName: store.data.lastname,
      });
      const response = await postdata("adduser", data);
      router.push("/register/otp");
    }
  }
  if (
    inputjob.compunyname != "" &&
    inputjob.employe != "" &&
    inputjob.jobtitle != "" &&
    inputjob.Startmonth != "" &&
    inputjob.Startyear != "" &&
    (inputjob.Endyear > inputjob.Startyear ||
      (inputjob.Startyear === inputjob.Endyear &&
        inputjob.Startmonth <= inputjob.Endmonth)) &&
    inputjob.role == false &&
    inputjob.Endmonth != "" &&
    inputjob.Endyear != ""
  ) {
    if (validationrouter.value != true && inputjob.role == false) {
      toast.error("Please accept the Terms and Conditions before submitting the form.", {
        position: "top-center",
      });
    } else {
      store.experince.jobtitle = inputjob.jobtitle;
      store.experince.employe = inputjob.employe;
      store.experince.compunyname = inputjob.compunyname;
      store.experince.Startmonth = storemonth.month[inputjob.Startmonth - 1];
      store.experince.Startyear = storemonth.year[inputjob.Startyear];
      store.experince.Endmonth = storemonth.month[inputjob.Endmonth - 1];
      store.experince.Endyear = storemonth.month[inputjob.Endyear - 1];

      const data = JSON.stringify({
        email: store.data.email,
        firstName: store.data.firstname,
        lastName: store.data.lastname,
      });
      const response = await postdata("adduser", data);
      router.push("/register/otp");
    }
  }
}
</script>


<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-md">
      <div class="flex">
        <div class="w-full">
          <button
            @click="router.push('/register/job')"
            class="border-b-2 border-s-2 py-2 rounded bg-gray-200 font-bold w-full"
          >
            EXPERIENCE
          </button>
        </div>
        <div v-if="!validationrouter" class="w-full">
          <button
            @click="router.push('/register/eduction')"
            class="border-b-2 border-s-2 py-2 rounded hover:bg-blue-300 font-bold border-r-2 w-full"
          >
            STUDENT
          </button>
        </div>
      </div>
      <form
        class="bg-white shadow-md rounded px-8 pb-8 mb-4"
        @submit.prevent="handlesubmit"
      >
        <div class="mb-2 pt-5">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Most Reacent job Title*
          </label>
          <input
            v-model="inputjob.jobtitle"
            class="shadow appearance-none border rounded w-full mb-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            placeholder="Job Title"
          />
          <p class="text-red-600 font-semibold  absolute font-serif">
            {{ validationerror ? validationerror.joberror : "" }}
          </p>
        </div>
        <div class="my-[30px]">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Employment Type*
          </label>
          <select
            @input="selectemploye"
            id="small"
            class="block shadow bg-white w-full p-2 mb-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected disabled>Select One</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Freelance">Freelance</option>
            <option value="Traniee">Traniee</option>
          </select>
          <p class="text-red-600 font-semibold  absolute font-serif">
            {{ validationerror ? validationerror.employeerror : "" }}
          </p>
        </div>
        <div class="my-[25px]">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Compuny Name*
          </label>
          <input
            v-model="inputjob.compunyname"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            placeholder="Compuny_Name"
          />
          <p class="text-red-600 font-semibold  absolute font-serif">
            {{ validationerror ? validationerror.compunyname : "" }}
          </p>
        </div>
        <div class="mb-2 mx-auto w-max">
          <input
            v-model="inputjob.role"
            class="w-4 h-4 mt-2"
            id="firstname"
            type="checkbox"
            placeholder="Compuny Name"
          />
          <span class="ps-2"> I am currently working in this role</span>
          <p class="text-red-600 font-semibold  font-serif">
            {{ validationerror ? validationerror.firstnameerror : "" }}
          </p>
        </div>

        <div class="mb-[30px] mt-3">
          <div class="mb-[25px]">
            <div class="flex">
              <div class="w-full">
                <label for="message-text" class="block ps-1 text-gray-700 text-sm font-bold mb-2"
                  >Start Month*
                </label>
                <select
                  v-model="inputjob.Startmonth"
                  class="block shadow bg-white w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name=""
                  id=""
                >
                  <option value="" disabled>please select</option>
                  <option
                    :value="index + 1"
                    v-for="(list, index) in storemonth.month"
                    :key="list"
                  >
                    {{ list }}
                  </option>
                </select>
                <p class="text-red-600 absolute font-semibold  font-serif ps-1">
                  {{ validationerror ? validationerror.startmonth : "" }}
                </p>
              </div>
              <div class="w-full">
                <label for="message-text" class="block ps-2 text-gray-700 text-sm font-bold mb-2"
                  >Start Year*
                </label>
                <select
                  v-model="inputjob.Startyear"
                  class="block ms-1 shadow bg-white w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name=""
                  id=""
                >
                  <option value="" disabled>please select</option>
                  <option
                    :value="list"
                    v-for="list in storemonth.year"
                    :key="list"
                  >
                    {{ list }}
                  </option>
                </select>
                <p class="text-red-600 font-serif font-semibold  absolute ps-2">
                  {{ validationerror ? validationerror.Startyear : "" }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="!inputjob.role" class="mt-[28px]">
            <div class="flex">
              <div class="w-full">
                <label for="message-text" class="block ps-1 text-gray-700 text-sm font-bold mb-2"
                  >End Month*
                </label>
                <select
                  v-model="inputjob.Endmonth"
                  class="block shadow bg-white w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name=""
                  id=""
                >
                  <option value="" disabled>please select</option>
                  <option
                    :value="index + 1"
                    v-for="(list, index) in storemonth.month"
                    :key="list"
                  >
                    {{ list }}
                  </option>
                </select>
                <p class="text-red-600 font-semibold font-serif absolute ps-1">
                  {{ validationerror ? validationerror.Endmonth : "" }}
                </p>
              </div>
              <div class="w-full mb-3">
                <label for="message-text" class="block text-gray-700 text-sm font-bold mb-2 ps-2"
                  >End Year*
                </label>
                <select
                  v-model="inputjob.Endyear"
                  class="block shadow bg-white ms-1 w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name=""
                  id=""
                >
                  <option value="" disabled>please select</option>
                  <option
                    :value="list"
                    v-for="list in storemonth.year"
                    :key="list"
                  >
                    {{ list }}
                  </option>
                </select>
                <p class="text-red-600 font-serif font-semibold  absolute ps-2">
                  {{ validationerror ? validationerror.Endyear : "" }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <input
            v-model="validationrouter"
            class="w-5 h-5 "
            id="firstname"
            type="checkbox"
            placeholder="Compuny Name"
          />
          <span class="ps-2">I accept the Terms and Conditions</span>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


