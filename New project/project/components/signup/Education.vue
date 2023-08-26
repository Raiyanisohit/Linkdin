<script setup>
import axios from "axios";
import { postdata } from "../../services/fetch";
import { usesignupdataStore } from "../../store/signupdata";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { usemonthStore } from "../../store/Month";
const storemonth = usemonthStore();
const store = usesignupdataStore();
const router = useRouter();
const inputedu = reactive({
  college: "",
  Startmonth: "",
  Startyear: "",
  Endmonth: "",
  Endyear: "",
});
const validationerror = reactive({
  true: "",
  collegerror: "",
  startmonth: "",
  Startyear: "",
  Endmonth: "",
  Endyear: "",
});

watchEffect(() => {
  if (inputedu.college == "") {
    validationerror.collegerror = "";
  } else {
    validationerror.collegerror = "";
  }
});
watchEffect(() => {
  if (inputedu.Startmonth == "") {
    validationerror.startmonth = "";
  } else {
    validationerror.startmonth = "";
  }
});
watchEffect(() => {
  if (inputedu.Startyear == "") {
    validationerror.Startyear = "";
  } else {
    validationerror.Startyear = "";
  }
});

watchEffect(() => {
  if (inputedu.Endmonth == "") {
    validationerror.Endmonth = "";
  } else if (
    inputedu.Startyear == inputedu.Endyear &&
    inputedu.Startmonth > inputedu.Endmonth
  ) {
    validationerror.Endmonth = "plese select valid Month";
  } else {
    validationerror.Endmonth = "";
  }
});

watchEffect(() => {
  if (inputedu.Endyear == "") {
    validationerror.Endyear = "";
  } else if (inputedu.Endyear < inputedu.Startyear) {
    validationerror.Endyear = "plese select valid year";
  } else {
    validationerror.Endyear = "";
  }
});

const validationrouter = ref(false);
function selectemploye(e) {
  inputjob.employe = e.target.value;
}
function selectcity(e) {
  inputcountry.city = e.target.value;
}
async function handlesubmit() {
  if (inputedu.college.trim() == "") {
    validationerror.collegerror = "* College is Required ";
  }
  if (inputedu.Startmonth == "") {
    validationerror.startmonth = "* Start_month is Required ";
  }
  if (inputedu.Startyear == "") {
    validationerror.Startyear = "* Start_year is Required ";
  }
  if (inputedu.Endmonth == "") {
    validationerror.Endmonth = "* End_month is Required ";
  }
  if (inputedu.Endyear == "") {
    validationerror.Endyear = "* End_year is Required ";
  }
  if (
    inputedu.college.trim() != "" &&
    inputedu.Startmonth != "" &&
    inputedu.Startyear != "" &&
    inputedu.Endmonth != "" &&
    inputedu.Endyear != "" &&
    (inputedu.Endyear > inputedu.Startyear ||
      (inputedu.Startyear === inputedu.Endyear &&
        inputedu.Startmonth <= inputedu.Endmonth))
  ) {
    if (validationrouter.value != true) {
      toast.error("Please accept the Terms and Conditions before submitting the form.", {
        position: "top-center",
      });
    } else {
      store.student.college = inputedu.college;
      store.student.Startmonth = storemonth.month[inputedu.Startmonth - 1];
      store.student.Startyear =  storemonth.year[inputedu.Startyear];
      store.student.Endmonth =  storemonth.month[inputedu.Endmonthmonth - 1];
      store.student.Endyear =  storemonth.year[inputedu.Endyear];

      const data = JSON.stringify({
        email: store.data.email,
        firstName:store.data.firstname,
        lastName:store.data.lastname
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
        <div v-if="!validationrouter" class="w-full">
          <button
            @click="router.push('/register/job')"
            class="border-b-2 border-s-2 py-2 rounded font-bold hover:bg-blue-300 w-full"
          >
            EXPERIENCE
          </button>
        </div>
        <div class="w-full">
          <button
            @click="router.push('/register/eduction')"
            class="border-b-2 border-s-2 py-2 rounded font-bold bg-gray-200 border-r-2 w-full"
          >
            STUDENT
          </button>
        </div>
      </div>
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit.prevent="handlesubmit"
      >
        <div class="mb-[25px]">
          <label
            class="block ps-1 text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            College / University*
          </label>
          <input
            v-model="inputedu.college"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            placeholder="Job Title"
          />
          <p class="text-red-600 font-semibold font-serif absolute ps-1">
            {{ validationerror ? validationerror.collegerror : "" }}
          </p>
        </div>

        <div class="mb-[25px]">
          <div class="flex">
            <div class="w-full">
              <label for="message-text" class="block ps-1 text-gray-700 text-sm font-bold mb-2"
                >Start Month*
              </label>
              <select
                v-model="inputedu.Startmonth"
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
                {{ validationerror ? validationerror.startmonth : "" }}
              </p>
            </div>
            <div class="w-full">
              <label for="message-text" class="block ps-2 text-gray-700 text-sm font-bold mb-2"
                >Start Year*
              </label>
              <select
                v-model="inputedu.Startyear"
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
              <p class="text-red-600  font-semibold font-serif absolute ps-2">
                {{ validationerror ? validationerror.Startyear : "" }}
              </p>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="flex">
            <div class="w-full">
              <label for="message-text" class="block ps-1 text-gray-700 text-sm font-bold mb-2"
                >End Month*
              </label>
              <select
                v-model="inputedu.Endmonth"
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
              <label for="message-text" class="block ps-2 text-gray-700 text-sm font-bold mb-2"
                >End Year*
              </label>
              <select
                v-model="inputedu.Endyear"
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
              <p class="text-red-600 font-semibold font-serif absolute ps-2">
                {{ validationerror ? validationerror.Endyear : "" }}
              </p>
            </div>
          </div>
        </div>

        <div class="mb-2">
          <input
            v-model="validationrouter"
            class="w-5 h-5 "
            id="firstname"
            type="checkbox"
            placeholder="Compuny Name"
          />
          <span class="ps-2">I accept the Terms and Conditions</span>
          <p class="text-red-600">
          </p>
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


<style>
</style>