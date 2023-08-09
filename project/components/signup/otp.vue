<script setup>
import axios from 'axios'
import { usesignupdataStore } from "../../store/signupdata";
const store = usesignupdataStore();
const router = useRouter()
const inputotp = reactive({otp:""})
const validationrouter = ref("")
const validationerror = reactive({otperror:""})

function handlesubmit(){
    
if(inputotp.otp == ""){
validationerror.otperror = "required!!"
}else{
 var data = JSON.stringify({
  "email": store.data.email,
  "OTP": inputotp.otp,
  "password": store.data.password,
  "firstName": store.data.firstname,
  "lastName": store.data.lastname,
  "userImage": "https://cdn-icons-png.flaticon.com/128/149/149071.png",
  "education": [
    {
      "CollegeName": store.student.college,
      "startYear": store.student.Startyear,
      "startMonth": store.student.Startmonth,
      "endMonth": store.student.Endmonth,
      "endYear": store.student.Endyear
    }
  ],
  "industry": store.experince.jobtitle,
  "country": store.data.country,
  "city": store.data.city
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/checkUserOTP',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log((response.data));
  if(response.data.Message.includes("Wrong OTP")){
     validationerror.otperror = "Wrong OTP"
      }else{
        router.push('/feed')
      }
})
.catch(function (error) {
  console.log(error);
});
   
}
}

</script>
<template>
<div class="h-screen flex flex-col  items-center justify-center">

<div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handlesubmit">
    <div class="mb-4">
      <label class="block text-gray-700 mx-auto w-max text-2xl font-bold mb-3" for="username">
          OTP
      </label>
      <label class="block text-gray-700  " for="username">
        ENTER OTP
      </label>
     <input v-model="inputotp.otp" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="Enter your otp">
    <p class="text-red-600">{{validationerror ? validationerror.otperror : ''}}</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
       Submit
      </button>
    </div>
  </form>

</div>  
</div>
</template>

<style>

</style>