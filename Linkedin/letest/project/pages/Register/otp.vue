
<script setup>
import axios from "axios";
import { usesignupdataStore } from "../../store/signupdata";
const store = usesignupdataStore();
const router = useRouter();
const inputotp = reactive({ otp: "" });
const validationrouter = ref("");
const validationerror = reactive({ otperror: "" });
const runtimeConfig = useRuntimeConfig();
definePageMeta({
  layout: "custome",
});
watchEffect(() => {
  if (store.data.email === "") {
    router.push("/");
  }
});

watchEffect(() => {
  if (inputotp.otp == "") {
    validationerror.otperror = "";
  } else {
    validationerror.otperror = "";
  }
});

// -------------------------------------------Submit_Form----------------------//

function handlesubmit() {
  if (inputotp.otp.trim() == "") {
    validationerror.otperror = "* Otp is Required";
  }
  if (inputotp.otp.trim() != "" && store.experince.compunyname == "" ) {
    var data = JSON.stringify({
      email: store.data.email,
      OTP: inputotp.otp,
      firstName: store.data.firstname,
      lastName: store.data.lastname,
      password: store.data.password,
      userImage: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
      education: [
        {
          CollegeName: store.student.college,
          startYear: store.student.Startyear,
          startMonth: store.student.Startmonth,
          endMonth: store.student.Endmonth,
          endYear: store.student.Endyear,
        },
      ],
      industry: store.experince.jobtitle,
      country: store.data.country,
      city: store.data.city,
    });

    var config = {
      method: "post",
      url: `${runtimeConfig.public.API_BASE_URL}/checkUserOTP`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const token = response.data.Token;
        if (response.data.Message == "Wrong OTP") {
          validationerror.otperror = "Enter valid otp";
        }else if (token) {
          localStorage.setItem("token", token);
          router.push("/feed");
        } else{

        }
      })
      .catch(function (error) {
        console.log(error)
      });
  } else {
    //Experience
    if(inputotp.otp.trim() != ""){
      var data = JSON.stringify({
      email: store.data.email,
      OTP: inputotp.otp,
      password: store.data.password,
      firstName: store.data.firstname,
      lastName: store.data.lastname,
      userImage: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
      experience: [
        {
          companyName: store.experince.compunyname,
          employeementType: store.experince.employe,
          jobTitle: store.experince.jobtitle,
          experienceStartYear: store.experince.Startyear,
          experienceStartMonth: store.experince.Startmonth,
          experienceEndMonth: store.experince.Endmonth,
          experienceEndYear: store.experince.Endyear,
        },
      ],
      industry: store.experince.jobtitle,
      country: store.data.country,
      city: store.data.city,
    });
    var config = {
      method: "post",
      url:`${runtimeConfig.public.API_BASE_URL}/checkUserOTP`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const token = response.data.Token;
        if (response.data.Message == "Wrong OTP") {
          validationerror.otperror = "Enter valid otp";
        } else if (token) {
          localStorage.setItem("token", token);
          router.push("/feed");
        } else {
          }
      })
      .catch(function (error) {
        console.log(error);
      });
        }
  }
}
</script>
<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-xs">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit.prevent="handlesubmit"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 mx-auto w-max text-2xl font-bold mb-3"
            for="username"
          >
            OTP
          </label>
          <label class="block text-gray-700 pb-1" for="username">
            ENTER OTP
          </label>
          <input
            v-model="inputotp.otp"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            placeholder="Enter your otp"
          />
          <p class="text-red-600 font-semibold font-serif absolute">
            {{ validationerror ? validationerror.otperror : "" }}
          </p>
        </div>
        <div class="flex pt-2 items-center justify-between">
          <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
</style>