<template>
<div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  ">
    <div class="modal-content lg:w-[700px] ">
      <div class="modal-header">
        <h5 class="modal-title text-xl" id="exampleModalLabel">Edit intro</h5>

        <button class="float-right" type="button"  data-bs-dismiss="modal">
            <img class="w-8" src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="">
        </button>
      </div>
      <div class="modal-body overflow-y-auto h-[700px]">
        <p class="text-xs mb-2">* Indicates required</p>
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">First name*:</label>
            <input  class="form-control" :value="post ? post.Message.firstName : ''" id="recipient-name">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Last name*</label>
            <input  class="form-control" :value="post ?  post.Message.lastName : ''" id="message-text"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Additional name</label>
            <input class="form-control" id="message-text"/>
          </div>
          <p>Name pronunciation</p>
          <p>This can only be added using our mobile app</p>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Pronouns</label>
            <select class="form-control" name="" id="">
                <option value="" disabled>please select</option>
                <option value="" >She/Her</option>
                <option value="" >He/Him</option>
                <option value="" >They/Them</option>
                <option value="" >Custom</option>
            </select>
            <p>Let others know how to refer to you.</p>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Enter custom pronouns</label>
            <input class="form-control" id="message-text"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Headline</label>
            <input class="form-control" :value="post ?  post.Message.profileHeadline : ''" id="message-text"/>
          </div>
         
          <div class="mb-3">
            <label for="message-text" class="col-form-label font-bold text-2xl">Location</label><br>
            <label for="message-text" class=" ">Country/Region*</label>
            <input class="form-control" :value="post ?  post.Message.country : ''" id="message-text"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class=" ">City</label>
            <input class="form-control" :value="post ?  post.Message.city : ''" id="message-text"/>
          </div>
        </form>
      </div><hr>
      <div class="py-2 px-3">
        <button data-bs-dismiss="modal" class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white   px-3 py-1 border-info font-bold">Save</button>
      </div>
    </div>
  </div>
</div>

 <!-- -----------------------------------------contact info --------------------------------------------- -->
 <!-- -----------------------------------------contact info --------------------------------------------- -->
 <!-- -----------------------------------------contact info --------------------------------------------- -->


<div class="modal fade " id="contact" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  ">
    <div class="modal-content lg:w-[600px] ">
      <div class="modal-header">
        <h5 class="modal-title text-2xl font-bold" id="exampleModalLabel"> {{ post.Message.firstName }} {{ post.Message.lastName }}</h5>

        <button class="float-right" type="button"  data-bs-dismiss="modal">
            <img class="w-8" src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="">
        </button>
      </div>
      <div class="modal-body ">
        <div>
          <p class="text-xl">Contact Info</p>
        </div>

        <div class="p-2">
          <div class="flex">
            <div>
              <img class="w-[50px]" src="https://static.vecteezy.com/system/resources/previews/018/930/585/original/linkedin-logo-linkedin-icon-transparent-free-png.png" alt="">
            </div>
            <div class="ps-1">
              <p class="text-[18px]  font-bold">Your Profile</p>
              <p class="text-[16px] ">linkedin.com/{{post.Message.firstName }}-{{post.Message.lastName}}/{{ route.params.name }}</p>
            </div>
          </div>
        </div>

        <div class="p-2 ps-3">
          <div class="flex">
            <div>
              <img class="w-[40px]" src="https://cdn-icons-png.flaticon.com/128/2549/2549872.png" alt="">
            </div>
            <div class="ps-1">
              <p class="text-[18px]  font-bold">Your Email</p>
              <p class="text-[16px] ">{{ post.Message.email }}</p>
            </div>
          </div>
        </div>
       </div>
    </div>
  </div>
</div>
</template>