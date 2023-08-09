<template>
<div class="modal fade " id="experience" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  ">
    <div class="modal-content lg:w-[700px]">
      <div class="modal-header">
        <h5 class="modal-title text-xl" id="exampleModalLabel">Edit intro</h5>

        <button class="float-right" type="button"  data-bs-dismiss="modal">
            <img class="w-8" src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png" alt="">
        </button>
      </div>
      <div class="modal-body">
        <p class="text-xs mb-2">* Indicates required</p>
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Title*:</label>
            <input  class="form-control"  id="recipient-name">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Employment type</label>
            <select class="form-control" name="" id="">
                <option value="" disabled>please select</option>
                <option value="" >Full-time</option>
                <option value="" >Part-time</option>
                <option value="" >Self-employed</option>
                <option value="" >Freelance</option>
                <option value="" >Traniee</option>
            </select>
            <p>Learn more about employment types.</p>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Company name</label>
            <input class="form-control" id="message-text"/>
          </div>
     
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Location</label>
            <input class="form-control" id="message-text"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Location type</label>
            <select class="form-control" name="" id="">
                <option value="" disabled>please select</option>
                <option value="" >On-site</option>
                <option value="" >Hybrid</option>
                <option value="" >remote</option>
            </select>
            <p>Pick a location type (ex: remote)</p>
          </div>
          <div class="flex">
            <input class="w-5 h-5 " type="checkbox">
            <p class="mb-2 ms-2">I am currently working in this role</p>
          </div>
               
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Start date </label>
            <div class="flex ">
              <select class="form-control m-2" name="" id="">
                <option value="" disabled>please select</option>
                <option value="" >January</option>
                <option value="" >February</option>
                <option value="" >March</option>
                <option value="" >April</option>
                <option value="" >May</option>
                <option value="" >June</option>
                <option value="" >July</option>
                <option value="" >August</option>
                <option value="" >September</option>
                <option value="" >october</option>
                <option value="" >November</option>
                <option value="" >December</option>
            </select>
         
              <select class="form-control m-2" name="" id="">
                <option value="" disabled>please select</option>
                <option value="" >2010</option>
                <option value="" >2011</option>
                <option value="" >2012</option>
                <option value="" >2013</option>
                <option value="" >2014</option>
                <option value="" >2015</option>
                <option value="" >2016</option>
                <option value="" >2017</option>
                <option value="" >2018</option>
                <option value="" >2019</option>
                <option value="" >2020</option>
                <option value="" >2021</option>
                <option value="" >2022</option>
                <option value="" >2023</option>
            </select>
         
            </div>
          </div>
        </form>
      </div>
       
       
    </div>
  </div>
</div>
</template>