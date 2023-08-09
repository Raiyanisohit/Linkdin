<script setup>
import axios from 'axios'
const props = defineProps(['post'])
const route = useRoute()
const showfunction = route.params.id
const education = reactive({school:"",grade:"",Degree:"",study:"",Startmonth:"",Startyear:"",Endmonth:"",Endyear:""})
function handlesubmit(){
  var data = JSON.stringify({
  "instituteName": education.school,
  "degree": education.Degree,
  "studyField": education.study,
  "startYear": education.Startyear,
  "startMonth": education.Startmonth,
  "endYear": education.Endyear,
  "endMonth": education.Endmonth,
  "grade": education.grade
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/addUserEducation',
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
            class="block mt-1   bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="px-4 flex justify-between py-2">
              <p class="text-[22px] font-bold">Education</p>
              <div v-if="!showfunction" class="flex">
                <p class="w-5"  data-bs-toggle="modal" data-bs-target="#eduction"><img src="https://cdn-icons-png.flaticon.com/128/748/748113.png" alt=""></p>
              </div>
            </div>
            <div class="pl-6 ">
                <div class="py-2" v-for="edu in post.Message.education" :key="edu">
                  <p class="text-[18px] font-bold">{{ edu.instituteName }}</p>
                  <p class="">{{ edu.degree }}  {{ edu.studyField }}</p>
                  <p class="text-gray-500 text-[14px] ">{{ edu.startMonth }} {{ edu.startYear }}  {{ edu.endMonth }} {{ edu.endYear }}</p>
                  <p class="text-gray-500 text-[14px]">{{ edu.descprition }}</p>
                </div>
            </div>
            </div>
    </div>

<!-- -----------------------model--------------------------- -->
<!-- -----------------------model--------------------------- -->
<!-- -----------------------model--------------------------- -->

    
<div class="modal fade " id="eduction" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  ">
        <form @submit.prevent="handlesubmit">
    <div class="modal-content lg:w-[700px]">
      <div class="modal-header">
        <h5 class="modal-title text-xl" id="exampleModalLabel">Add eduction</h5>

        <button class="float-right" type="button"  data-bs-dismiss="modal">
            <img class="w-8" src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="">
        </button>
      </div>
      <div class="modal-body ">
        <p class="text-xs mb-2">* Indicates required</p>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">School *</label>
            <input v-model="education.school"  class="form-control"  id="recipient-name">
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Degree *</label>
            <input v-model="education.Degree"  class="form-control"  id="recipient-name">
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Field of study </label>
            <input v-model="education.study"  class="form-control"  id="recipient-name">
          </div>
               
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Start date </label>
            <div class="flex ">
              <select v-model="education.Startmonth" class="form-control m-2" name="" id="">
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
         
              <select v-model="education.Startyear" class="form-control m-2" name="" id="">
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
          <div  class="mb-3">
            <label for="message-text" class="col-form-label">End date </label>
            <div class="flex ">
              <select v-model="education.Endmonth" class="form-control m-2" name="" id="">
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
         
              <select v-model="education.Endyear" class="form-control m-2" name="" id="">
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
                <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Grade :</label>
            <input v-model="education.grade"  class="form-control"  id="recipient-name">
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