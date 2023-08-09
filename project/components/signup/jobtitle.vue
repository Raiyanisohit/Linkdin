<script setup>
import { usesignupdataStore } from "../../store/signupdata";
const store = usesignupdataStore();
const inputjob = reactive({jobtitle:"",employe:"",role:true,compunyname:"",Startmonth:"",Startyear:"",Endmonth:"",Endyear:""})
const validationerror = reactive({true:"",joberror:"",employeerror:"",compunyname:"",startmonth:"",Startyear:""})
const router = useRouter()
const validationrouter = ref(false)
function selectemploye(e){
    inputjob.employe = e.target.value
}
function selectcity(e){
    inputcountry.city = e.target.value
}
function handlesubmit(){
    console.log(inputjob.employe)
if(inputjob.jobtitle == ""){
validationerror.joberror = "required !!"
}else if(inputjob.employe == ""){
 validationerror.employeerror = "required !!"
}else if(inputjob.compunyname == ""){
validationerror.compunyname = "required !!"
}else if(inputjob.Startmonth == ""){
 validationerror.startmonth = "required !!"
}else if(inputjob.Startyear == ""){
 validationerror.Startyear = "required !!"
}
else if(validationrouter.value == false){
 validationerror.true = "required !!"
}else{
  store.experince.jobtitle = inputjob.jobtitle
  store.experince.employe = inputjob.employe
  store.experince.compunyname = inputjob.compunyname
  store.experince.Startmonth = inputjob.Startmonth
  store.experince.Startyear = inputjob.Startyear
router.push('/otp')
}
}
</script>


<template>
<div class="h-screen flex flex-col items-center justify-center">

<div class="w-full max-w-md">

    <div class="flex">
        <div class="w-full" ><button @click="router.push('/job')" class="border-b-2 border-s-2 py-2 rounded bg-gray-200 font-bold w-full">EXPERIENCE</button></div>
        <div class="w-full"> <button v-if="!validationrouter" @click="router.push('/eduction')"  class="border-b-2 border-s-2 py-2 rounded hover:bg-blue-300 font-bold border-r-2 w-full"> STUDENT</button></div>
    </div>
  <form class="bg-white shadow-md rounded px-8  pb-8 mb-4" @submit.prevent="handlesubmit">
    <div class="mb-2 pt-5">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Most Reacent job Title
      </label>
   <input v-model="inputjob.jobtitle" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="Job Title">
    <p class="text-red-600">{{validationerror ? validationerror.joberror : ''}}</p>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
       Employment Type
      </label>
<select @input="selectemploye" id="small" class="block shadow bg-white w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select One</option>
                <option value="Full-time" >Full-time</option>
                <option value="Part-time" >Part-time</option>
                <option value="Self-employed" >Self-employed</option>
                <option value="Freelance" >Freelance</option>
                <option value="Traniee" >Traniee</option>
</select>
    <p class="text-red-600">{{validationerror ? validationerror.employeerror : ''}}</p>
    </div>
    <div class="mb-2">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
       Compuny Name
      </label>
   <input v-model="inputjob.compunyname" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="Compuny Name">
    <p class="text-red-600">{{validationerror ? validationerror.compunyname : ''}}</p>
    </div>
    <div class="mb-2 mx-auto w-max">
   <input v-model="inputjob.role" class="w-4 h-4 " id="firstname" type="checkbox" placeholder="Compuny Name">
   <span class="ps-2 "> I am currently working in this role</span>
    <p class="text-red-600">{{validationerror ? validationerror.firstnameerror : ''}}</p>
    </div>

<div class="mb-3">
            <label for="message-text" class="col-form-label">Start date </label>
            <div class="flex ">
                <div class="w-full">
              <select v-model="inputjob.Startmonth" class="block shadow bg-white w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="">
                <option value="" disabled>please select</option>
                <option value="January" >January</option>
                <option value="February" >February</option>
                <option value="March" >March</option>
                <option value="April" >April</option>
                <option value="May" >May</option>
                <option value="June" >June</option>
                <option value="July" >July</option>
                <option value="August" >August</option>
                <option value="September" >September</option>
                <option value="october" >october</option>
                <option value="November" >November</option>
                <option value="December" >December</option>
            </select>
         <p class="text-red-600">{{validationerror ? validationerror.startmonth : ''}}</p>
                </div>
                <div class="w-full">

              <select v-model="inputjob.Startyear" class="block ms-1 shadow bg-white w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="">
                <option value="" disabled>please select</option>
                <option value="2010" >2010</option>
                <option value="2011" >2011</option>
                <option value="2012" >2012</option>
                <option value="2013" >2013</option>
                <option value="2014" >2014</option>
                <option value="2015" >2015</option>
                <option value="2016" >2016</option>
                <option value="2017" >2017</option>
                <option value="2018" >2018</option>
                <option value="2019" >2019</option>
                <option value="2020" >2020</option>
                <option value="2021" >2021</option>
                <option value="2022" >2022</option>
                <option value="2023" >2023</option>
            </select>
            <p class="text-red-600">{{validationerror ? validationerror.Startyear : ''}}</p>
            </div>
                </div>
          </div>
          <div v-if="!inputjob.role" class="mb-3">
            <label for="message-text" class="col-form-label">End date </label>
            <div class="flex ">
              <select v-model="inputjob.Endmonth" class="block shadow bg-white w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="">
                <option value="" disabled>please select</option>
                <option value="January" >January</option>
                <option value="February" >February</option>
                <option value="March" >March</option>
                <option value="April" >April</option>
                <option value="May" >May</option>
                <option value="June" >June</option>
                <option value="July" >July</option>
                <option value="August" >August</option>
                <option value="September" >September</option>
                <option value="october" >october</option>
                <option value="November" >November</option>
                <option value="December" >December</option>
            </select>
         
              <select v-model="inputjob.Endyear" class="block shadow bg-white ms-1 w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="">
                <option value="" disabled>please select</option>
                <option value="2010" >2010</option>
                <option value="2011" >2011</option>
                <option value="2012" >2012</option>
                <option value="2013" >2013</option>
                <option value="2014" >2014</option>
                <option value="2015" >2015</option>
                <option value="2016" >2016</option>
                <option value="2017" >2017</option>
                <option value="2018" >2018</option>
                <option value="2019" >2019</option>
                <option value="2020" >2020</option>
                <option value="2021" >2021</option>
                <option value="2022" >2022</option>
                <option value="2023" >2023</option>
            </select>
            </div>
          </div>
        <div class="mb-2">
   <input v-model="validationrouter" class="w-5 h-5 accent-green-600 " id="firstname" type="checkbox" placeholder="Compuny Name">
   <span class="ps-2 ">Confirm</span>
   <p class="text-red-600">{{validationerror ? validationerror.true : ''}}</p>
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