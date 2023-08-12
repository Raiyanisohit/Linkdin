<script setup>
import { usesignupdataStore } from "../../store/signupdata";
const store = usesignupdataStore();
const router = useRouter()
const inputcountry = reactive({country:"",city:""})
const validationerror = reactive({firstnameerror:"",lastnameerror:""})
function selectcountry(e){
    inputcountry.country = e.target.value
}
function selectcity(e){
    inputcountry.city = e.target.value
}
function handlesubmit(){
    
if(inputcountry.country == ""){
validationerror.firstnameerror = "required"
}else if(inputcountry.city == ""){
 validationerror.lastnameerror = "required"
}
else{
    store.data.country = inputcountry.country
    store.data.city = inputcountry.city
    router.push('/job')
}
}
</script>


<template>
<div class="h-screen flex flex-col  items-center justify-center">

<div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handlesubmit">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Country / Region
      </label>
<select @input="selectcountry" id="small" class="block w-full p-2 mb-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Choose a country</option>
  <option value="india">India</option>
  <option value="CA">Canada</option>
  <option value="FR">France</option>
  <option value="DE">Germany</option>   
</select>
    <p class="text-red-600">{{validationerror ? validationerror.firstnameerror : ''}}</p>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        City / District
      </label>
<select @input="selectcity" id="small" class="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Choose a city</option>
  <option value="Ahemdabd">Ahemdabd</option>
  <option value="Junagdh">Junagdh</option>
  <option value="Rajkot">Rajkot</option>
  <option value="Surat">Surat</option>
</select>
    <p class="text-red-600">{{validationerror ? validationerror.lastnameerror : ''}}</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
       Continue
      </button>
    </div>
  </form>

</div>  
</div>
</template>
<style>

</style>