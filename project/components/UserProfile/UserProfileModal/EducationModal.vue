<template>
     <div class="modal fade " id="about" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  ">
    <div class="modal-content lg:w-[700px]">
      <div class="modal-header">
            <h5 class="modal-title text-xl" id="exampleModalLabel">Profile About</h5>

        <button class="float-right" type="button"  data-bs-dismiss="modal">
            <img class="w-8" src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="">
        </button>
      </div>
      <div class="modal-body">
        <textarea class="form-control" :value="post ? post.Message.userAbout : ''"  cols="30" rows="10"></textarea>
       </div>
       <div class="py-2 px-3">
         <button class="float-right rounded border px-3 py-1 bg-green-500 font-bold">Save</button>
       </div>
      </div>
  </div>
</div>
</template>