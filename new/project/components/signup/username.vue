<script setup>
import { usesignupdataStore } from "../../store/signupdata";
const store = usesignupdataStore();
const router = useRouter()
  console.log(store.data)
const inputusername = reactive({firstnamee:"",lastnamee:""})
const validationrouter = ref("")
const validationerror = reactive({firstnameerror:"",lastnameerror:""})
const isvalidationfirstname = ref(true)
const isvalidationlastname = ref(true)
watchEffect(()=>{
  const username = /^[a-zA-Z]*$/
isvalidationfirstname.value = username.test(inputusername.firstnamee) 
isvalidationlastname.value = username.test(inputusername.lastnamee) 
})


function handlesubmit(){
    
if(inputusername.firstnamee == ""){
validationerror.firstnameerror = "required!!"
}else if(inputusername.lastnamee == ""){
 validationerror.lastnameerror = "required!!"
}
else{
  store.data.firstname = inputusername.firstnamee 
  store.data.lastname = inputusername.lastnamee 
  // console.log(store.data)
    router.push("/country")
}
}


</script>


<template>
<div class="h-screen flex flex-col  items-center justify-center">

<div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handlesubmit">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        First Name
      </label>
     <input v-model="inputusername.firstnamee" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="First Name">
    <p v-if="!isvalidationfirstname" class="text-red-600">only character</p>
    <p  class="text-red-600">{{validationerror ? validationerror.firstnameerror : ''}}</p>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Last Name
      </label>
      <input v-model="inputusername.lastnamee" class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Last Name">
     <p v-if="!isvalidationlastname" class="text-red-600">only character</p>
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