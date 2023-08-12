<script setup>
import axios from 'axios'
const props = defineProps([
  "post",
]);
const commentlikeshow = ref(true)
const commentlike = ref("")
const conditioncheck = ref("")
watchEffect(() => {
  if (conditioncheck.value > 0) {
    commentlikeshow.value = false;
    
  }
});
function totalcommentno(){
    var data = JSON.stringify({
     "commentId": props.post._id
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
    console.log((response.data))
    commentlike.value = response.data
})
.catch(function (error) {
    console.log(error);
});
}
    totalcommentno()


function postcommentlike(e){
    commentlikeshow.value = !commentlikeshow.value
        var data = JSON.stringify({
        "commentId": e
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/commentLike',
  headers: { 
      'token': localStorage.getItem('token'), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
    console.log((response.data))
    commentlike.value = response.data.Length
})
.catch(function (error) {
    console.log(error);
});
}

function checkcommentlike(e){
    var data = JSON.stringify({
     "commentId": e
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
    conditioncheck.value = response.data.Message.length

})
.catch(function (error) {
    console.log(error);
});
}
checkcommentlike(props.post._id)

</script>
<template>
    <div class="flex">
            <img
              class="w-[42px] m-3 rounded-full"
              :src="post.userId ? post.userId.userImage : ''"
              alt=""
            />
            <p class="bg-[#f2f2f2] my-1 p-2 leading-6 w-3/4 rounded">
              <span class="font-bold"
                >{{post.userId ?  post.userId.firstName : ''}} {{post.userId ? post.userId.lastName : '' }}</span
              >
              <br />
              <span>{{ post.text }}</span>
            </p>
            </div> 
         <div
            class="flex py-1 rounded ps-20"
          >
            <button v-if="commentlikeshow" @click="postcommentlike(post._id)" class="ps-1  text-sm ">Like  </button>
            <button v-else  @click="postcommentlike(post._id)" class="ps-1 text-blue-500 text-sm ">Like </button>
           <p class="text-sm ps-1">{{commentlike}}</p> 
          </div>
</template>