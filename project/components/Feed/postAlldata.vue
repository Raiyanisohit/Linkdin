<script setup>
import axios from "axios";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { postcomment } from "../../assets/js/alluserspost";
import { usedataStore } from "../../store/userdata";
import {usealluserpostdataStore} from '../../store/Alluserpostdata'
const storeallpost = usealluserpostdataStore()
const store = usedataStore();
const props = defineProps([
  "list",
  "post",
  "text",
  "user",
  "usercomment",
  "postId",
]);
const commentbox = ref(false);
const delet = ref(props.list._id == storeallpost.userid);
const likeshow = ref(true);
const commentlikeshow = ref(true);
const totalcomment = ref([]);
const showallcomment = ref("");
const commentlike = ref("")
const postLikeCalculatee = ref("");
const inputcomment = ref("");
const jj = ref("");

function deletepost(id) {
  var data = JSON.stringify({
    postId: id,
  });

  var config = {
    method: "delete",
    url: "http://localhost:3010/deleteUserPost",
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      storeallpost.getdata()
    })
    .catch(function (error) {
      console.log(error);
    });
}

watchEffect(() => {
  if (jj.value > 0) {
    likeshow.value = false;
    commentlikeshow.value = false;
    
  }
});

function commentlikepost(e){
commentlikeshow.value = !commentlikeshow.value
}

// -------------------------------------Like Post -----------------------------//
// -------------------------------------Like Post -----------------------------//
// -------------------------------------Like Post -----------------------------//
function likebutton(e) {
  console.log(e);
  likeshow.value = !likeshow.value;

  var data = JSON.stringify({
    postId: e,
  });

  var config = {
    method: "post",
    url: "http://localhost:3010/postLike",
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      postLikeCalculatee.value = response.data.Length;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// ---------------------------------CommentLikeShow-----------------------//
// ---------------------------------CommentLikeShow-----------------------//
// ---------------------------------CommentLikeShow-----------------------//

function commentlikeunshow(e){
var data = JSON.stringify({
  "commentId": e,
  "userId": props.postId
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/checkCommentLike',
  headers: { 
    'token': localStorage.getItem('token'), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  jj.value = response.data.Message.length;
})
.catch(function (error) {
  console.log(error);
});

}

// ---------------------------------LikeShow-----------------------//
// ---------------------------------LikeShow-----------------------//
// ---------------------------------LikeShow-----------------------//

function likeunshow(e) {
  var data = JSON.stringify({
    postId: e,
  });

  var config = {
    method: "post",
    url: "http://localhost:3010/checkUserLikePost",
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      jj.value = response.data.Message.length;
    })
    .catch(function (error) {
      console.log(error);
    });
}
likeunshow(props.postId);

// ----------------------------------------------CommentLike Count---------------------------------------//
// ----------------------------------------------CommentLike Count---------------------------------------//
// ----------------------------------------------CommentLike Count---------------------------------------//
function commentikeCalculate(e){
  console.log(e[0]._id)
var data = JSON.stringify({
  "commentId": e
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/getCommentLikes',
  headers: { 
    'token': localStorage.getItem('token'), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  commentlike.value = response.data
})
.catch(function (error) {
  console.log(error);
});
}
// ----------------------------------------------Like Count---------------------------------------//
// ----------------------------------------------Like Count---------------------------------------//
// ----------------------------------------------Like Count---------------------------------------//
function postLikeCalculate(e) {
  var data = JSON.stringify({
    postId: e,
  });

  var config = {
    method: "post",
    url: "http://localhost:3010/postLikeCalculate",
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      postLikeCalculatee.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
// --------------------------------------------------Total Comment Number -------------------------------//
// --------------------------------------------------Total Comment Number -------------------------------//
// --------------------------------------------------Total Comment Number -------------------------------//
function totalnum(e) {
  const data = JSON.stringify({
    postId: e,
  });

  const config = {
    method: "post",
    url: "http://localhost:3010/getPostCommentNo",
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      totalcomment.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function iscomment() {
  commentbox.value = "valid";
}

// --------------------------------------------------Post Comment-----------------------------------//
// --------------------------------------------------Post Comment-----------------------------------//
// --------------------------------------------------Post Comment-----------------------------------//
// --------------------------------------------------Post Comment-----------------------------------//

function usercommentt(id) {
  //  commentbox.value = true;
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
      showallcomment.value = response.data;
      inputcomment.value = ""
      
    })
    .catch(function (error) {
      console.log(error);
    });
    
}

// --------------------------------------------------Show Comment------------------------------------//
// --------------------------------------------------Show Comment------------------------------------//
// --------------------------------------------------Show Comment------------------------------------//
// --------------------------------------------------Show Comment------------------------------------//

function showcommentt(id) {
  commentbox.value = true
  var data = JSON.stringify({
    postId: id,
  });

  var config = {
    method: "post",
    url: "http://localhost:3010/getPostComments",
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      showallcomment.value = response.data.Data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// const isImage = computed(()=>{
//   return /\.(jpeg|jpg|gif|png)$/.test(props.post);
// })
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
            <button @click.prevent="deletepost(postId)" class="dropdown-item flex">
              <img
                class="w-[25px] mr-2"
                src="https://cdn-icons-png.flaticon.com/128/10147/10147931.png"
                alt=""
              />
              Delete
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
          {{ postLikeCalculate(postId) }}
          <p>{{ postLikeCalculatee }} Like</p>
        </div>
        <div class="pr-3" v-if="postId">
          {{ totalnum(postId) }}
          <button
            @click="showcommentt(usercomment._id)"
            class="hover:text-blue-600 hover:underline"
          >
            {{ totalcomment }} Comments
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
        <div class="flex hover:bg-gray-200 rounded p-2">
          <img
            class="w-[28px]"
            src="https://cdn-icons-png.flaticon.com/128/1388/1388895.png"
            alt=""
          />
          <p class="ps-2 min-[480px]:block hidden">Repost</p>
        </div>
        <div class="flex hover:bg-gray-200 p-2 rounded">
          <img
            class="w-[28px]"
            src="https://cdn-icons-png.flaticon.com/128/1933/1933005.png"
            alt=""
          />
          <p class="ps-2 min-[500px]:block hidden">Send</p>
        </div>
      </div>
      <div v-if="commentbox">
        <form method="post" @submit.prevent="usercommentt(usercomment._id)">
          <div class="flex">
            <img
              class="w-[42px] m-2 mx-2 rounded-full"
              :src="storeallpost.Data.Message.userImage"
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
        <div v-if="commentbox">
          <div  v-for="m in showallcomment" :key="m">
            <div class="flex">
            <img
              class="w-[42px] m-3 rounded-full"
              :src="m.userId ? m.userId.userImage : ''"
              alt=""
            />
            <p class="bg-[#f2f2f2] my-1 p-2 leading-6 w-3/4 rounded">
              <span class="font-bold"
                >{{m.userId ?  m.userId.firstName : ''}} {{m.userId ? m.userId.lastName : '' }}</span
              >
              <br />
              <span>{{ m.text }}</span>
            </p>
            </div>
          <!-- <div
            class="flex py-1 rounded ps-20"
          >
           {{commentlikeunshow(showallcomment)}}
            <button v-if="commentlikeshow" @click="commentlikepost(m._id)" class="ps-1  text-sm ">Like {{ commentikeCalculate(m._id) }} </button>
            <button v-else  @click="commentlikepost(m._id)" class="ps-1 text-blue-500 text-sm ">Like </button>
           <p class="text-sm ps-1">{{commentlike}}</p> 
          </div> -->
        </div>
          </div>
      </div>
    </div>
  </div>
</template>

