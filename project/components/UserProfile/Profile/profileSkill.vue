<script setup>
import {userskills} from '../../../assets/js/userprofile'
const props = defineProps(['post'])
const route = useRoute()
const showfunction = (route.params.id)
const show = ref(false) 
const limit = ref(2) 
const inputskill = ref("")
function toggle(){
show.value = !show.value
}

function addskill(){
  const {data} = userskills(inputskill.value) 
}

</script>
<template>
    <div>
        <div
            href="#"
            class="block my-2 mb-5 h-max  bg-white lg:me-7 border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="px-4 flex justify-between py-2">
              <p class="text-[22px] font-bold">Skills</p>
              <div v-if="!showfunction " class="flex">
                <p class="w-5"  data-bs-toggle="modal" data-bs-target="#skill"><img src="https://cdn-icons-png.flaticon.com/128/748/748113.png" alt=""></p>
              </div>
            </div>
            <div class="pl-6  py-2">
                <div >
                    <ul v-for="(skill,index) in post.Message.skills" :key="index"  >
                      <li class="text-[17px] font-bold" v-if = "index < limit" >{{ skill }}</li>
                      <li class="text-[17px] font-bold" v-else-if="show" >{{ skill }}</li>
                    </ul>
                </div>
            </div>
            <div class="flex py-2 bg-gray-200 justify-center">
              <p v-if="!show" @click="toggle" class="text-[17px]">Show all  Skill</p> <span v-if="!show"><img class="w-8 px-1 mx-1" src="https://cdn-icons-png.flaticon.com/128/545/545682.png" alt=""></span>
            </div>
            </div>
    </div>

<!-- -------------------------------model------------------------------ -->
<!-- -------------------------------model------------------------------ -->
<!-- -------------------------------model------------------------------ -->


    <div class="modal fade " id="skill" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  ">
    <form @submit.prevent="addskill">

      <div class="modal-content lg:w-[700px]">
        <div class="modal-header">
            <h5 class="modal-title text-xl" id="exampleModalLabel">Add Skills</h5>

            <button class="float-right" type="button"  data-bs-dismiss="modal">
              <img class="w-8" src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="">
            </button>
          </div>
          <div class="modal-body">
        <input class="form-control" placeholder="Add skill" v-model="inputskill"  cols="30" rows="10"/>
      </div>
      <div class="py-2 px-3">
        <button data-bs-dismiss="modal" class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white   px-3 py-1 border-info font-bold">Save</button>
      </div>
    </div>
  </form>
  </div>
</div>
</template>