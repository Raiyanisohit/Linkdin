<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { postdata, getconnection, DeleteData } from "../../../services/api";
import { useprofileStore } from "../../../store/getprofile";

const inputskill =async(event)=>{
console.log(event.target.value)
const data = JSON.stringify({
    name:event.target.value
})

const data1 = await postdata("userRecommendationSearch",data)
console.log(data1)

}

</script>
<template>
  <div>
    <div
      href="#"
      class="block my-2 h-max bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
  
       <div class="px-4 flex justify-between py-2">
         <p class="text-[24px] font-bold font-ui-sans-serif">Skills</p>
        <div class="flex">
          <div data-bs-toggle="modal"
              data-bs-target="#re"    
            class="flex hover:bg-gray-300 p-2 rounded-full hover:cursor-pointer"
          >
            <p
              v-if="showfunction"
              class="w-5"
           
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
            </p>
            <p
              v-if="!routeparams"
              class="w-5"
             
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
                alt=""
              />
            </p>
          </div>
        </div>
       </div>
    </div>
  </div>


  <modal id="re" title="Recomdation">
      <label for="" class="font-bold my-1 ps-1">Search for people </label>
      <input
        class="form-control border-2"
        placeholder="Add skill"
        @input="inputskill"
      />

    <div>

    </div>
      
  </modal>
  </template>

 