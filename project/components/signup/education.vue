<script setup>
import axios from 'axios'
import { usesignupdataStore } from "../../store/signupdata";
const store = usesignupdataStore();
const router = useRouter()
const inputedu = reactive({college:"",Startmonth:"",Startyear:"",Endmonth:"",Endyear:""})
const validationerror = reactive({true:"",collegerror:"",startmonth:"",Startyear:"",Endmonth:"",Endyear:""})
const validationrouter = ref(false)
function selectemploye(e){
    inputjob.employe = e.target.value
}
function selectcity(e){
    inputcountry.city = e.target.value
}
function handlesubmit(){
if(inputedu.college == ""){
validationerror.joberror = "required !!"
}else if(inputedu.Startmonth == ""){
 validationerror.startmonth = "required !!"
}else if(inputedu.Startyear == ""){
 validationerror.Startyear = "required !!"
}else if(inputedu.Endmonth == ""){
 validationerror.Endmonth = "required !!"
}else if(inputedu.Endyear == ""){
 validationerror.Endyear = "required !!"
}else if(validationrouter.value == false){
 validationerror.true = "required !!"
}
else{
    store.student.college = inputedu.college
    store.student.Startmonth = inputedu.Startmonth
    store.student.Startyear = inputedu.Startyear
    store.student.Endmonth = inputedu.Endmonth
    store.student.Endyear = inputedu.Endyear
      router.push('/otp')
      var data = JSON.stringify({
  "email": store.data.email
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/adduser',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  store.otp = response.data.Message
  console.log((response.data.Message));
})
.catch(function (error) {
  console.log(error);
});
}
}
</script>


<template>
<div class="h-screen flex flex-col items-center justify-center">

<div class="w-full max-w-md">
       <div class="flex">
        <div class="w-full" ><button v-if="!validationrouter" @click="router.push('/job')" class="border-b-2 border-s-2 py-2 rounded font-bold hover:bg-blue-300 w-full"> EXPERIENCE</button></div>
        <div class="w-full"> <button @click="router.push('/eduction')"  class="border-b-2 border-s-2 py-2 rounded font-bold bg-gray-200  border-r-2 w-full">STUDENT</button></div>
    </div>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handlesubmit">
    <div class="mb-2">
      <label class="block text-gray-700  font-bold mb-2 font-bold" for="username">
        College / University
      </label>
   <input v-model="inputedu.college" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="Job Title">
    <p class="text-red-600">{{validationerror ? validationerror.joberror : ''}}</p>
    </div>

<div class="mb-3">
            <div class="flex ">
                <div class="w-full">
            <label for="message-text" class="col-form-label font-bold ps-1">Start Month </label>
              <select v-model="inputedu.Startmonth" class="block shadow bg-white w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="">
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
                       <label for="message-text" class="col-form-label font-bold ps-1">Start Year </label>
              <select v-model="inputedu.Startyear" class="block ms-1 shadow bg-white w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="">
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
          <div class="mb-3">
            <div class="flex ">
                <div class="w-full">

            <label for="message-text" class="col-form-label font-bold ps-1">End date </label>
              <select v-model="inputedu.Endmonth" class="block shadow bg-white w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="">
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
            <p class="text-red-600">{{validationerror ? validationerror.Endmonth : ''}}</p>
                </div>
                <div class="w-full">

                   <label for="message-text" class="col-form-label ps-1 font-bold">End date </label>
              <select v-model="inputedu.Endyear" class="block shadow bg-white ms-1 w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="">
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
            <p class="text-red-600">{{validationerror ? validationerror.Endyear : ''}}</p>
            </div>
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