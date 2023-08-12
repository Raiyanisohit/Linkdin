<script setup>
import axios from 'axios'
const props = defineProps(['post'])
const route = useRoute()
const showfunction = route.params.id
const project = reactive({title:"",link:"",descprition:"",Startmonth:"",Startyear:"",Endmonth:"",Endyear:""})
const projecterror = reactive({title:"",link:"",descprition:"",Startmonth:"",Startyear:"",Endmonth:"",Endyear:""})
const complete = ref("")
function handlesubmit(){
if(project.title == ""){
projecterror.title = "required"
}else if(project.descprition == ""){
projecterror.descprition = "required"
}else if(project.Startmonth == ""){
projecterror.Startmonth = "required"
}else if(project.Startyear == ""){
projecterror.Startyear = "required"
}else{
    complete.value = "modal"
    var data = JSON.stringify({
    "projectName": project.title,
  "description": project.descprition,
  "projectStartMonth": project.Startmonth,
  "projectStartYear": project.Startyear,
  "projectEndMonth": project.Endmonth,
  "projectEndYear": project.Endyear,
  "projectLink": project.link
});
var config = {
  method: 'post',
  url: 'http://localhost:3010/addUserProject',
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
    }

</script>
<template>
 <div
            href="#"
            class="block mt-1   bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="px-4 flex justify-between py-2">
              <p class="text-[22px] font-bold">Project</p>
              <div v-if="!showfunction" class="flex">
                <p class="w-5"  data-bs-toggle="modal" data-bs-target="#project"><img src="https://cdn-icons-png.flaticon.com/128/748/748113.png" alt=""></p>
              </div>
            </div>
            <div class="pl-6 ">
                <div class="py-2" v-for="project in post.Message.projects" :key="project">
                  <p class="text-[18px] font-bold">{{ project.projectName }}</p>
                   <p class="text-gray-500 text-[14px] ">{{ project.projectStartMonth }} {{ project.projectStartYear }}</p>
                   <p class="">{{ project.description }}</p>
                  <p class="text-gray-500 text-[14px]">{{ project.projectEndMonth }} {{ project.projectEndYear }}</p> 
                </div>
            </div>
            </div>


            <div class="modal fade " id="project" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  ">
        <form @submit.prevent="handlesubmit">
    <div class="modal-content lg:w-[700px]">
      <div class="modal-header">
        <h5 class="modal-title text-xl" id="exampleModalLabel">Add Project</h5>

        <button class="float-right" type="button"  data-bs-dismiss="modal">
            <img class="w-8" src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="">
        </button>
      </div>
      <div class="modal-body ">
        <p class="text-xs mb-2">* Indicates required</p>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Title *</label>
            <input v-model="project.title"  class="form-control"  id="recipient-name">
            <p class="text-red-500">{{projecterror.title}}</p>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Descprition *</label>
            <input v-model="project.descprition"  class="form-control"  id="recipient-name">
         <p class="text-red-500">{{projecterror.descprition}}</p>
          </div>
          
               
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Start date </label>
            <div class="flex ">
                <div class="w-full">
              <select v-model="project.Startmonth" class="form-control m-2" name="" id="">
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
                <p class="text-red-500">{{projecterror.Startmonth}}</p>
                </div>
                <div class="w-full">

              <select v-model="project.Startyear" class="form-control m-2" name="" id="">
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
                  <p class="text-red-500">{{projecterror.Startyear}}</p>
                </div>
            </div>
          </div>
          <div  class="mb-3">
            <label for="message-text" class="col-form-label">End date </label>
            <div class="flex ">
                <div class="w-full">

              <select v-model="project.Endmonth" class="form-control m-2" name="" id="">
                <option value="" disabled>please select</option>
                <option value="January" >January</option>
                <option value="February" >February</option>
                <option value="March" >March</option>close

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
                </div>
                         <div class="w-full">

              <select v-model="project.Endyear" class="form-control m-2" name="" id="">
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
               <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Project link </label>
            <input v-model="project.link"  class="form-control"  id="recipient-name">
          </div>
          
        
          </div>
      </div><hr>
       <div class="py-2  px-3">
        <button :data-bs-dismiss="complete" class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white   px-3 py-1 border-info font-bold">Save</button>
      </div>
    </div>
        </form>
  </div>
</div>

</template>
