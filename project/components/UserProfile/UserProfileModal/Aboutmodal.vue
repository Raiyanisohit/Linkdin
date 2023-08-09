<template>
    <div class="modal fade" id="about" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  ">
    <div class="modal-content lg:w-[700px]">
      <form class="py-2" method="post" @submit.prevent="isaboute">
        <div class="modal-header">
          <h5 class="modal-title text-xl" id="exampleModalLabel">Edit about</h5>
          <button class="float-right" type="button"  data-bs-dismiss="modal">
            <img class="w-8" src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="">
          </button>
        </div>
        <div class="modal-body">
          <textarea class="form-control"  v-model="post.Message.userAbout" cols="30" rows="10"/>
        </div>
        <div class="py-1  px-3">
          <button class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white   px-3 py-1 border-info font-bold">Save</button>
        </div>
      </form>
      </div>
  </div>
</div>
</template>