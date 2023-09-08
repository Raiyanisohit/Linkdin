
<script setup>
definePageMeta({
layout: "custome"
})
import { usesignupdataStore } from "../../store/signupdata";
import data from '../../assets/json/data.json'
const store = usesignupdataStore();
const router = useRouter();
const inputcountry = reactive({ country: "", city: "" });
const validationerror = reactive({ country: "", city: "" });


watchEffect(()=>{
    if(store.data.email === ""){
    router.push('/')
    }
})

watchEffect(() => {
  if (inputcountry.country != "") {
    validationerror.country = "";
  } else {
    validationerror.country = "";
  }
});
watchEffect(() => {
  if (inputcountry.city != "") {
    validationerror.city = "";
  } else {
    validationerror.city = "";
  }
});

const datacountry = ref("")
datacountry.value = data.countries 
const statedata = ref([]) 

// -----------------------------SelectCountry-----city--------------------------//

const selectcountry =(e) =>{
  inputcountry.country = data.countries.find((i)=>i.id == e.target.value).country
  const state = data.city.find((i)=>i.id == e.target.value).city
 statedata.value = state

}

const selectcity = (e)=>{
  inputcountry.city = e.target.value
}

// --------------------------------submitform-----------------------//

function handlesubmit() {
  if (inputcountry.country == "") {
    validationerror.country = "* Please enter your country.";
  }
  if (inputcountry.city == "") {
    validationerror.city = "* Please enter your city.";
  }
  if (inputcountry.country != "" && inputcountry.city != "") {
    store.data.country = inputcountry.country;
    store.data.city = inputcountry.city;
    router.push("/register/job");
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
        <div class="">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Country / Region*
          </label>
          <select
            @input="selectcountry"
            id="small"
            class="block w-full p-2 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected disabled>Choose a country</option>
            <option :value="list.id"  v-for="(list) in datacountry" :key="list">
           {{list.country}}
            </option>
   
          </select>
          <p class="text-red-600  absolute font-semibold font-serif">
            {{ validationerror ? validationerror.country : "" }}
          </p>
        </div>
        <div  class="py-[28px]">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            City / District*
          </label>
          <select
            @input="selectcity"
            @click="touch"
            id="small"
            class="block w-full p-2 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option  selected disabled>Choose a city</option>
            <option :value="list"  v-for="(list) in statedata" :key="list">
           {{list}}
            </option>
           
          </select>
          <p class="text-red-600 absolute font-semibold font-serif">
            {{ validationerror ? validationerror.city : "" }}
          </p>
        </div>
        <div class="flex items-center pt-1 justify-between">
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
