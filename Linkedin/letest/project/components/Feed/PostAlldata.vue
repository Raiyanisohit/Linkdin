<script setup>
import axios from "axios";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { postdata, getconnection, DeleteData } from "../../services/api";
let postLike;
let Allshowcomment;
let deletepostee;
const TotalLikeno = ref("");
const conditioncheck = ref("");
const TotalComment = ref("")
const imgurl = ref("")
const commentbox = ref(false);
const likeshow = ref(true);
const totalcomment = ref([]);
const showallcomment = ref([]);
const inputcomment = ref("");
const showimg = ref("")
const props = defineProps([
  "usercomment",
  "postId",
  "list",
  "post",
  "text",
  "user",
  "allpost",
  "editpostt",
  "deletepost",
  "getuserdata",
]);


const data = JSON.stringify({
  postId: props.postId,
});
 const TotalLike = await postdata("postLikeCalculate", data);
const LikeShowlist = await postdata("checkUserLikePost", data);

// ----------------------------getPostCommentNo------------------------------//

async function getcommentno(){
const data = JSON.stringify({
  postId: props.postId,
});
  const TotalCommentNo = await postdata("getPostCommentNo", data);
  TotalComment.value = TotalCommentNo
}
getcommentno()


TotalLikeno.value = TotalLike;

// --------------------------------------delet_function------------------------//

const delet = ref(props.list._id === props.getuserdata._id)


// --------------------------------Like-----------------------------------//

async function likebutton(e) {
  likeshow.value = !likeshow.value;
  const data = JSON.stringify({
    postId: e,
  });
  postLike = await postdata("postLike", data);
  TotalLikeno.value = postLike.Length;
}

// ----------------------------------checklikecondition-----------------------//

watchEffect(() => {
  if (conditioncheck.value < LikeShowlist?.Message?.length) {
    likeshow.value = false;
  }
});

// ---------------------------------------------------showcomment---------------------------------//

async function showcomment(id) {
   commentbox.value = "valid";
  const data = JSON.stringify({
    postId: id,
  });
  Allshowcomment = await postdata("getPostComments", data);
  showallcomment.value = Allshowcomment.Data;
}

// --------------------------------------------------Post Comment-----------------------------------//

async function usercommentt(id) {
  const data = JSON.stringify({
    postId: id,
    comment: inputcomment.value,
  });
  if(inputcomment.value.trim()){
    const userCommentpost = await postdata("userComment", data);
  const comment = userCommentpost.Data;
  comment.userId={
    firstName: props.getuserdata.firstName,
    lastName: props.getuserdata.lastName,
    userImage: props.getuserdata.userImage,
  }
  inputcomment.value = "";
  showallcomment.value.unshift(comment)
  await getcommentno()
    }
}


function iscomment() {
  commentbox.value = "valid";
  showcomment(props.postId)
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
          <ul class="dropdown-menu absolute mt-3 left-5 ">
            <button @click="deletepost(postId)"  data-bs-toggle="modal" data-bs-target="#deletepost" class="dropdown-item hover:text-white hover:text-bold flex hover:bg-red-400">
              <img
                class="w-[25px] mr-2"
                src="https://cdn-icons-png.flaticon.com/128/10147/10147931.png"
                alt=""
              />
              Delete
            </button>
            <button
            @click="editpostt(postId)"
              data-bs-toggle="modal"
              data-bs-target="#edit"
              class="dropdown-item pt-2 flex hover:text-white hover:bg-sky-300"
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
      <p class="mt-2 mb-2 ps-4">
        {{text ?  text : '' }}
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

      <div class="flex mt-4 mb-1 justify-between">
        <div class="ps-8 " v-if="postId">
          <p v-if="TotalLikeno > 0">{{ TotalLikeno }} Likes</p>
        </div>
        <div  class="pr-3" >
          <button 
            @click.prevent="showcomment(postId)"
            class="hover:text-blue-600 pe-2 hover:underline"
          >
          <span v-if="TotalComment > 0"> {{ TotalComment }} Comments</span> 
          </button>
        </div>
      </div>
      <hr />
      <div class="flex justify-between px-3 py-2 ">
        <div
          @click="likebutton(postId)"
          v-if="likeshow"
          class="flex hover:bg-gray-200 rounded p-2 hover:cursor-pointer"
        >
          <img
            class="w-[28px]"
            src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
            alt=""
          />
          <p class="ps-2 pt-1 ">Like</p>
        </div>
        <div
          v-else
          @click="likebutton(postId)"
          class="flex hover:bg-gray-200 rounded p-2 hover:cursor-pointer"
        >
          <img
            class="w-[28px]"
            src="https://cdn-icons-png.flaticon.com/128/4926/4926585.png"
            alt=""
          />
          <p class="ps-2 pt-1 text-blue-600">Like</p>
        </div>
        <div @click="iscomment" class="flex hover:bg-gray-200 rounded p-2 hover:cursor-pointer">
          <img
            class="w-[28px]"
            src="https://cdn-icons-png.flaticon.com/128/9710/9710511.png"
            alt=""
          />
          <p class="ps-2">Comment</p>
        </div>
      </div>
      <div v-if="commentbox">
        <form method="post" @submit.prevent="usercommentt(postId)">
          <div class="flex">
            <img
              class="w-[42px] m-2 ms-3 mb-3  rounded-full"
              :src="getuserdata ? getuserdata.userImage : '' "
              alt=""
            />
            <div class=" ps-1 mt-2  mb-3 relative   text-gray-600">
              <input
                type=""
                placeholder="Add a comment..."
                v-model="inputcomment"
                class="bg-white w-[20px] md:w-[400px]  border-secondary border h-10 px-7 pr-10 rounded-full text-sm focus:outline-none"
              />
              <button v-if="inputcomment.trim()" class="rounded-e-full  outline-1  border-s-2    absolute right-0 font-bold border-dark  px-3 sm:px-2 p-2  ">POST</button>
            </div>
            <div>
            </div>
          </div>
        </form>
      </div>

<!-- ---------------------------------Comment_Component------------------------------------ -->

        <div v-for="m in showallcomment ? showallcomment : ''" :key="m">
          <Comment :post="m" />
        </div>
    </div>
  </div>

</template>

