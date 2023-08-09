<template>
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
        <input class="form-control" v-model="inputskill"  cols="30" rows="10"/>
      </div>
      <div class="py-2 px-3">
        <button data-bs-dismiss="modal" class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white   px-3 py-1 border-info font-bold">Save</button>
      </div>
    </div>
  </form>
  </div>
</div>
</template>