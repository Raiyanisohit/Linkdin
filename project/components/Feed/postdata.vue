<script setup>
import axios from 'axios'
import {usealluserpostdataStore} from '../../store/Alluserpostdata'
const storeallpost = usealluserpostdataStore() 
const props = defineProps(["post"]);
const showimg = ref("");
const imgurl = ref("");
const photos = ref("");
const validation = ref("")
const textarea = ref("");
function postdata(event) {
  photos.value =  event.target.files
  showimg.value = event.target.value.includes("mp4")
  console.log(photos.value)
  const file = event.target.files[0];
  if (file) {
    imgurl.value = URL.createObjectURL(file);
  }
}

function userpost(){
   
  if(photos.value == "" && textarea.value == ""){
   validation.value = "please enter your (text or photos)"
  }else{
     
    const data = new FormData()
        if (photos.value.length === 0) {
            data.append("postText", textarea.value)
       var config = {
      method: "post",
      url: "http://localhost:3010/createUSerPost",
      headers: {
        "token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data)
        storeallpost.getdata()
        textarea.value = ""
      })
      .catch(function (error) {
        console.log(error);
      });
           
        }
        else {
            for (const element of photos.value) {
              data.append("postText", textarea.value)
                data.append("photo", element)
            }
                  var config = {
      method: "post",
      url: "http://localhost:3010/createUSerPost",
      headers: {
        "token": localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data)
        storeallpost.getdata()
        imgurl.value = ""
        textarea.value = ""
      })
      .catch(function (error) {
        console.log(error);
      });
           

            // axios.post("http://192.168.103.254:3010/createUSerPost", data, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //         "token": localStorage.getItem("token")
            //     }
            // }).then((res) => {
            //     console.log(res.data)
            //        storeallpost.getdata()
            // }).catch((err) => console.log(err))
        }

          }
    }
</script>

<template>
  <div v-if="post">
    <div
      href="#"
      class="block px-7 lg:mx-3 mt-3 p-2 bg-white border border-gray-200 md:w-[550px]  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="flex">
        <img
          class="w-14 ms-2 rounded-full shadow-lg"
          :src="post.Message.userImage"
          alt="Bonnie image"
        />
       
        <div class="mt-2 ms-3">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            class="flex text-gray-500 hover:bg-slate-100 border w-[200px] lg:w-[400px] py-2 rounded-3xl"
          >
            <span class="px-3 py-1 font-bold">Start a post</span>
          </button>
        </div>
      </div>
      <div class="flex flex-wrap justify-between pt-3 px-3">
        <div class="flex hover:bg-gray-200 rounded p-2" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
          <label for="image" class="flex">
            <img
              class="w-[26px] h-[30px]"
              src="https://cdn-icons-png.flaticon.com/128/833/833453.png"
              alt=""
            />
          <p class="ps-2 pt-1">Photo</p>  
          </label>
          <input id="image" type="file" accept="image/*" @input="postdata" class="w-0"  />
        </div>
        <div class="flex hover:bg-gray-200 rounded p-2" data-bs-toggle="modal"
            data-bs-target="#exampleModal"  >  
            <label for="vidio" class="flex">
          <img
            class="w-[26px] h-[26px]"
            src="https://cdn-icons-png.flaticon.com/128/9187/9187515.png"
            alt=""
          />
          <p class="ps-2 pt-1">Video</p>
            </label>
             <input id="vidio" type="file" accept="vidio/*" @input="postdata" class="w-0"  />
        </div>
        <div class="flex hover:bg-gray-200 rounded p-2">
          <img
            class="w-[26px] h-[26px]"
            src="https://cdn-icons-png.flaticon.com/128/2558/2558934.png"
            alt=""
          />
          <p class="ps-2 pt-1">Event</p>
        </div>
        <div class="flex hover:bg-gray-200 rounded p-2">
          <img
            class="w-[26px] h-[26px]"
            src="https://cdn-icons-png.flaticon.com/128/2680/2680900.png"
            alt=""
          />
          <p class="ps-2 pt-1">Write article</p>
        </div>
      </div>
    </div>
  </div>

  <!-- ---------------modal------------------ -->
  <!-- ---------------modal------------------ -->

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-xl font-bold" id="exampleModalLabel">
            Edit your photo
          </h5>
          <button class="float-right" type="button" data-bs-dismiss="modal">
            <img
              class="w-8"
              src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png"
              alt=""
            />
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="userpost" enctype="multipart/form-data">
            <div>
              <textarea
                class="form-control"
                cols="30"
                rows="7"
                v-model="textarea"
                placeholder="What do you want talk about?"
              >
              </textarea>
               <div v-if="!showimg">
              <img :src="imgurl" alt="" />
            </div>
            <div v-else>
              <video class="w-full" height="240" controls autoplay muted loop>
                <source :src="imgurl && imgurl" type="video/mp4" />
              </video>
            </div>
            <p class="text-red-600">{{validation}}</p>
            </div>
            <div class="flex py-3 justify-between">
              <div class="flex">
              <div class="rounded-full hover:shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)] px-3 py-2 bg-gray-300">
                <label for="photos">
                  <img
                    class="w-[26px] pt-1"
                    src="https://cdn-icons-png.flaticon.com/128/3917/3917415.png"
                    alt=""
                  />
                </label>
                <input
                  id="photos"
                  @input="postdata"
                  accept="image/*"
                  class="w-0"
                  type="file"
                  multiple
                />
              </div>
              <div class="rounded-full hover:shadow-[0px_22px_75px_4px_rgba(0,0,0,0.56)] px-3 mx-2 py-2 bg-gray-300">
               <label for="video">
                <img
                  class="w-[28px]"
                  src="https://cdn-icons-png.flaticon.com/128/7931/7931047.png"
                  alt=""
                />
                 </label>
                <input
                  id="video"
                  accept="video/*"
                  @input="postdata"
                  class="w-0"
                  type="file"
                />
              </div>
              </div>
            <div class="pt-2">
            <button data-bs-dismiss="modal" class="rounded-full ms-1 bg-blue-600 text-white font-bold px-4 py-2 border">Post</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>