<script setup>
import axios from "axios";
import { postdata, postdataImg } from "../../services/api";
const props = defineProps(["post", "data", "alluserpost"]);
const emit = defineEmits(["childDataChanged"]);
const showimg = ref("");
const imgurl = ref("");
const photos = ref("");
const validation = ref("");
const textarea = ref("");

// --------------------modal showimg ---------------------------//

const photoerror = ref("");
function Img(event) {
  showimg.value = event.target.value.includes("mp4");
  const file = event.target.files[0];
  photos.value = event.target.files;

  if (file) {
    imgurl.value = URL.createObjectURL(file);
  }
}

// ------------------------------new post--------------------------------//

async function userpost() {
  const data = new FormData();
  if (photos.value.length == 0) {
    data.append("postText", textarea.value);
    if (textarea.value.trim()) {
      const text = await postdata("createUSerPost", data);
      emit("childDataChanged", text);
    }
  } else {
    for (const element of photos.value) {
      data.append("postText", textarea.value);
      data.append("photo", element);
    }
    const img = await postdataImg("createUSerPost", data);
    emit("childDataChanged", img);
  
  }
}

function close(){
imgurl.value = ""
photos.value = ""
textarea.value = ""
}
</script>


<template>
  <div v-if="post">
    <div
      href="#"
      class="block px-7 lg:mx-3 mt-3 p-2 bg-white border border-gray-200 md:w-[550px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="flex">
        <img
          class="w-14 h-14 ms-2 mt-2 border-2 rounded-full shadow-lg"
          :src="post.Message ? post.Message.userImage : ''"
          alt="Bonnie image"
        />

        <div class="mt-2 ms-3">
          <button
          @click="close"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            class="flex text-gray-500 hover:bg-slate-100 border-2 w-[200px] md:w-[400px] py-2 rounded-3xl"
          >
            <span class="px-3 py-1 font-bold" >Start a post</span>
          </button>
        </div>
      </div>
      <div class="flex justify-center pt-3 px-3">
        <div
        @click="close"
          class="flex hover:bg-gray-200 rounded p-2 px-5 hover:cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <label for="image" class="flex">
            <img 
              class="w-[26px] h-[30px] hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/128/833/833453.png"
              alt=""
            />
            <p class="ps-2 pt-1 hover:cursor-pointer">Photo</p>
          </label>
          <input id="image" accept="image/*" @input="postdata" class="w-0" />
        </div>
        <div
        @click="close"
          class="flex hover:bg-gray-200 rounded p-2 px-5 hover:cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <label for="vidio" class="flex">
            <img
              class="w-[26px] h-[26px] hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/128/9187/9187515.png"
              alt=""
            />
            <p class="ps-2 pt-1 hover:cursor-pointer">Video</p>
          </label>
          <input id="vidio" accept="video/*" @input="postdata" class="w-0" />
        </div>
      </div>
    </div>
  </div>

  <!-- ---------------modal------------------ -->
  <!-- ---------------modal------------------ -->

  <modal id="exampleModal" title=" Create your post">
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
        <img class="max-h-[500px] w-full mx-auto" :src="imgurl" alt="" />
      </div>
      <div v-else>
        <video class="w-full h-[500px]" controls autoplay muted loop>
          <source class="w-full mx-auto" :src="imgurl" type="video/mp4" />
        </video>
      </div>
    </div>
    <p
      v-if="
        photos &&
        (photos[0].name.includes('webp') ||
          photos[0].name.includes('jpeg') ||
          photos[0].name.includes('jpg') ||
          photos[0].name.includes('png') ||
          photos[0].name.includes('mp4'))
      "
    ></p>
    <p v-else-if="photos" class="text-red-600 font-bold">
      Please insert a valid file
    </p>
    <p v-else class="text-red-600 font-bold"></p>
    <div class="flex py-3 justify-between">
      <div class="flex">
        <div
          class="rounded-full hover:shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)] px-3 py-2 bg-gray-300"
        >
          <label for="photos">
            <img
              class="w-[26px] pt-1 hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/128/3917/3917415.png"
              alt=""
            />
          </label>
          <input
            id="photos"
            @input="Img"
            accept="image/*"
            class="w-0"
            type="file"
            multiple
          />
        </div>
        <div
          class="rounded-full hover:shadow-[0px_22px_75px_4px_rgba(0,0,0,0.56)] px-3 mx-2 py-2 bg-gray-300 hover:cursor-pointer"
        >
          <label for="video">
            <img
              class="w-[28px] hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/128/7931/7931047.png"
              alt=""
            />
          </label>
          <input
            id="video"
            accept="video/*"
            @input="Img"
            class="w-0 hover:cursor-pointer"
            type="file"
          />
        </div>
      </div>
      <div v-if="textarea.trim() && !photos" class="pt-2">
        <button
          @click="userpost"
          data-bs-dismiss="modal"
          class="rounded-full ms-1 bg-blue-600 text-white font-bold px-4 py-2 border"
        >
          Post
        </button>
      </div>
      <div
        v-else-if="
          textarea.trim() &&
          photos &&
          (photos[0].name.includes('webp') ||
            photos[0].name.includes('jpeg') ||
            photos[0].name.includes('mp4') ||
            photos[0].name.includes('jpg') ||
            photos[0].name.includes('png'))
        "
        class="pt-2"
      >
        <button
          @click="userpost"
          data-bs-dismiss="modal"
          class="rounded-full ms-1 bg-blue-600 text-white font-bold px-4 py-2 border"
        >
          Post
        </button>
      </div>
      <div
        v-else-if="
          !textarea.trim() &&
          photos &&
          (photos[0].name.includes('webp') ||
            photos[0].name.includes('jpeg') ||
            photos[0].name.includes('mp4') ||
            photos[0].name.includes('jpg') ||
            photos[0].name.includes('png'))
        "
        class="pt-2"
      >
        <button
          @click="userpost"
          data-bs-dismiss="modal"
          class="rounded-full ms-1 bg-blue-600 text-white font-bold px-4 py-2 border"
        >
          Post
        </button>
      </div>
      <div v-else class="pt-2">
        <button
          class="rounded-full ms-1 bg-gray-300 text-white font-bold px-4 py-2 border"
        >
          Post
        </button>
      </div>
    </div>
  </modal>
</template>