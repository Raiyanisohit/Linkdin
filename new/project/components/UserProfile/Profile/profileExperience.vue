<script setup>
import axios from 'axios'
const props = defineProps(['post'])
const route = useRoute()
const showfunction = route.params.id
const experience = reactive({employment_locationtype:"",employment_title:"",employment_type:"",employment_compunyName:"",employment_location:"",employment_Startmonth:"",employment_Startyear:"",employment_Endmonth:"",employment_Endyear:""})
const enddate = ref(true)
function handlesubmit(){
  var data = JSON.stringify({
  "companyName": experience.employment_compunyName,
  "employementType": experience.employment_type,
  "jobTitle": experience.employment_title,
  "location": experience.employment_location,
  "locationType": experience.employment_locationtype,
  "startYear": experience.employment_Startyear,
  "startMonth": experience.employment_Startmonth,
  "endMonth": experience.employment_Endmonth,
  "endYear": experience.employment_Endyear
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/addUserExperience',
  headers: { 
    'token': localStorage.getItem('token'), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log((response.data));
})
.catch(function (error) {
  console.log(error);
});
}
</script>
<template>
    <div>
        <div
            href="#"
            class="block my-2   bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="px-4 flex justify-between py-2">
              <p class="text-[22px] font-bold">Experience</p>
              <div v-if="!showfunction" class="flex">
                <p class="w-5" data-bs-toggle="modal" data-bs-target="#experience"><img src="https://cdn-icons-png.flaticon.com/128/748/748113.png" alt=""></p>
              </div>
            </div>
            <div  class="pl-6 py-2">
                <div class="py-2" v-for="experience in post.Message.experience" :key="experience"  >
                  <p class="text-[18px] font-bold">{{ experience.jobTitle }}</p>
                  <p class="">{{ experience.companyName }} 	&middot; {{ experience.employementType }}</p>
                  <p class="text-gray-500 text-[14px] ">{{ experience.startMonth }} {{ experience.startYear }} - {{  }}</p>
                  <p class="text-gray-500 text-[14px]">{{ experience.location }}</p>
                </div>
            </div>
            </div>
    </div>

<!-- -------------------------------model------------------------------ -->
<!-- -------------------------------model------------------------------ -->
<!-- -------------------------------model------------------------------ -->

<div class="modal fade " id="experience" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  ">
        <form @submit.prevent="handlesubmit">
    <div class="modal-content lg:w-[700px]">
      <div class="modal-header">
        <h5 class="modal-title text-xl" id="exampleModalLabel">Edit intro</h5>

        <button class="float-right" type="button"  data-bs-dismiss="modal">
            <img class="w-8" src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="">
        </button>
      </div>
      <div class="modal-body h-[700px] overflow-y-auto">
        <p class="text-xs mb-2">* Indicates required</p>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Title*:</label>
            <input v-model="experience.employment_title"  class="form-control"  id="recipient-name">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Employment type</label>
            <select v-model="experience.employment_type" class="form-control" name="" id="">
                <option value="" disabled>please select</option>
                <option value="Full-time" >Full-time</option>
                <option value="Part-time" >Part-time</option>
                <option value="Self-employed" >Self-employed</option>
                <option value="Freelance" >Freelance</option>
                <option value="Traniee" >Traniee</option>
            </select>
            <p>Learn more about employment types.</p>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Company name</label>
            <input v-model="experience.employment_compunyName" class="form-control" id="message-text"/>
          </div>
         <div class="mb-3">
            <label for="message-text" class="col-form-label">Location type</label>
            <select v-model="experience.employment_locationtype" class="form-control" name="" id="">
                <option value="" disabled>please select</option>
                <option value="On-site" >On-site</option>
                <option value="Hybrid" >Hybrid</option>
                <option value="Remote" >Remote</option>
              
            </select>
            <p>Learn more about employment types.</p>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Location</label>
            <input v-model="experience.employment_location" class="form-control" id="message-text"/>
          </div>
          
          <div class="flex">
            <input  v-model="enddate" class="w-5 h-5 " type="checkbox">
            <p class="mb-2 ms-2">I am currently working in this role</p>
          </div>
               
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Start date </label>
            <div class="flex ">
              <select v-model="experience.employment_Startmonth" class="form-control m-2" name="" id="">
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
         
              <select v-model="experience.employment_Startyear" class="form-control m-2" name="" id="">
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
          <div v-if="!enddate" class="mb-3">
            <label for="message-text" class="col-form-label">End date </label>
            <div class="flex ">
              <select v-model="experience.employment_Endmonth" class="form-control m-2" name="" id="">
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
         
              <select v-model="experience.employment_Endyear" class="form-control m-2" name="" id="">
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
      </div><hr>
       <div class="py-2  px-3">
        <button data-bs-dismiss="modal" class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white   px-3 py-1 border-info font-bold">Save</button>
      </div>
    </div>
        </form>
  </div>
</div>
</template>