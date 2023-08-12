<script setup>
import axios from "axios";

import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { postdata, getconnection, DeleteData } from "../../services/fetch";
import { usealluserpostdataStore } from "../../store/Alluserpostdata";
const data = JSON.stringify({
  postId: props.postId,
});
const TotalLike = await postdata("postLikeCalculate", data);
const LikeShowlist = await postdata("checkUserLikePost", data);
const TotalComment = await postdata("getPostCommentNo", data);
let postLike;
let Allshowcomment;
let deletepostee;
const storeallpost = usealluserpostdataStore();
const TotalLikeno = ref("");
const conditioncheck = ref(LikeShowlist.Message.length);
const delet = ref(props.list._id == storeallpost.userid);
TotalLikeno.value = TotalLike;
const props = defineProps([
  "usercomment",
  "postId",
  "list",
  "post",
  "text",
  "user",
  "allpost",
  "deletepost",
]);
const commentbox = ref(false);
const likeshow = ref(true);
const totalcomment = ref([]);
const showallcomment = ref("");
const inputcomment = ref("");

async function likebutton(e) {
  likeshow.value = !likeshow.value;
  const data = JSON.stringify({
    postId: e,
  });
  postLike = await postdata("postLike", data);
  TotalLikeno.value = postLike.Length;
}

async function showcomment(e) {
  const data = JSON.stringify({
    postId: e,
  });
  Allshowcomment = await postdata("getPostComments", data);
  showallcomment.value = Allshowcomment.Data;
  commentbox.value = true;
}

watchEffect(() => {
  if (conditioncheck.value > 0) {
    likeshow.value = false;
  }
});

// --------------------------------------------------Post Comment-----------------------------------//
// --------------------------------------------------Post Comment-----------------------------------//

function usercommentt(id) {
  var data = JSON.stringify({
    postId: id,
    comment: inputcomment.value,
  });

  var config = {
    method: "post",
    url: "http://localhost:3010/userComment",
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },

    data: data,
  };

  axios(config)
    .then(function (response) {
      inputcomment.value = "";
      showallcomment.value = response.data;
      showcommentt(props.usercomment._id);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function iscomment() {
  commentbox.value = "valid";
}
</script>

<template>
  <div>
    <div
      href="#"
      class="block mt-1 lg:mx-3 bg-white border border-gray-200 md:w-[550px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="flex justify-between px-7 px-2">
        <div class="flex">
          <img class="w-[42px] m-2 rounded-full" :src="list.userImage" alt="" />
          <p class="ps-2 mt-3 font-bold">
            {{ list.firstName }} {{ list.lastName }}
          </p>
        </div>
        <div v-if="delet" class="dropdown dropstart relative">
          <p
            class="btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              class="w-[26px]"
              src="https://cdn-icons-png.flaticon.com/128/3018/3018442.png"
              alt=""
            />
          </p>
          <ul class="dropdown-menu absolute mt-3 left-5">
            <button
              @click.prevent="deletepost(postId)"
              class="dropdown-item flex"
            >
              <img
                class="w-[25px] mr-2"
                src="https://cdn-icons-png.flaticon.com/128/10147/10147931.png"
                alt=""
              />
              Delete
            </button>
            <button
              data-bs-toggle="modal"
              data-bs-target="#edit"
              class="dropdown-item pt-2 flex"
            >
              <img
                class="w-[20px] mr-3"
                src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
                alt=""
              />
              Edit
            </button>
          </ul>
        </div>
      </div>
      <p class="mb-2 px-3">
        {{ text }}
      </p>

      <div>
        <carousel :items-to-show="1">
          <slide v-for="k in post" :key="k">
            <div v-if="!k.substring(51).includes('mp4')">
              <img :src="k" alt="" />
            </div>
            <div v-else>
              <video class="w-full" height="240" controls autoplay muted loop>
                <source :src="k && k" type="video/mp4" />
              </video>
            </div>
          </slide>

          <template v-if="post.length > 1" #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
      <div></div>

      <!-- ______________________________________________________________Show Like & Comment___________________________________________________- -->
      <!-- ______________________________________________________________Show Like & Comment___________________________________________________- -->

      <div class="flex mt-4 mb-1 justify-between">
        <div class="ps-[18px]" v-if="postId">
          <p>{{ TotalLikeno }} Like</p>
        </div>
        <div class="pr-3" v-if="postId">
          <button
            @click="showcomment(usercomment._id)"
            class="hover:text-blue-600 hover:underline"
          >
            {{ TotalComment }} Comments
          </button>
        </div>
      </div>
      <hr />
      <div class="flex justify-between px-3 py-2">
        <div
          @click="likebutton(postId)"
          v-if="likeshow"
          class="flex hover:bg-gray-200 rounded p-2"
        >
          <img
            class="w-[28px]"
            src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
            alt=""
          />
          <p class="ps-2 pt-1 min-[480px]:block hidden">Like</p>
        </div>
        <div
          v-else
          @click="likebutton(postId)"
          class="flex hover:bg-gray-200 rounded p-2"
        >
          <img
            class="w-[28px]"
            src="https://cdn-icons-png.flaticon.com/128/4926/4926585.png"
            alt=""
          />
          <p class="ps-2 pt-1 min-[480px]:block hidden text-blue-600">Like</p>
        </div>
        <div @click="iscomment" class="flex hover:bg-gray-200 rounded p-2">
          <img
            class="w-[28px]"
            src="https://cdn-icons-png.flaticon.com/128/9710/9710511.png"
            alt=""
          />
          <p class="ps-2 min-[480px]:block hidden">Comment</p>
        </div>
      </div>
      <div v-if="commentbox">
        <form method="post" @submit.prevent="usercommentt(usercomment._id)">
          <div class="flex">
            <img
              class="w-[42px] m-2 mx-2 rounded-full"
              :src="list.userImage"
              alt=""
            />
            <div class="relative mt-2 mx-2 text-gray-600">
              <input
                type=""
                placeholder="Add a comment..."
                v-model="inputcomment"
                class="bg-white sm:w-[200px] w-[250px] md:w-[400px] border-secondary border h-10 px-7 pr-10 rounded-full text-sm focus:outline-none"
              />
              <button class="absolute border-l-4 p-2 right-0 mr-4">post</button>
            </div>
          </div>
        </form>
        <div></div>
        <div v-for="m in showallcomment" :key="m">
          <comment :post="m ? m : ''" />
        </div>
      </div>
    </div>
  </div>
</template>

