<script setup>
import { postdata, getconnection, DeleteData } from "../../services/api";
import axios from "axios";
const props = defineProps(["post"]);
const commentlikeshow = ref(true);
const commentlike = ref("");
const conditioncheck = ref("");

// ------------getCommentLikes & checkCommentLike-------------//

const data = JSON.stringify({
  commentId: props.post._id,
});
const TotalCommentNo = await postdata("getCommentLikes", data);
commentlike.value = TotalCommentNo;
const checkcommentlike = await postdata("checkCommentLike", data);
conditioncheck.value = checkcommentlike.Message.length;

// --------------------postcommentlike-------------------------//

async function postcommentlike(e){
  const data = JSON.stringify({
    commentId: e,
  });
  commentlikeshow.value = !commentlikeshow.value;
  const postcommentlike = await postdata("commentLike", data);
  commentlike.value = postcommentlike.Length;
}

// ------------------------checkcommentlike-----------------------//

watchEffect(() => {
  if (conditioncheck.value > 0) {
    commentlikeshow.value = false;
  }
});
</script>
<template>
  <div class="flex">
    <img 
      class="w-[42px] m-3 rounded-full"
      :src="post.userId ? post.userId.userImage : ''"
      alt=""
    />
 
    <img v-if="userId"
      class="w-[42px] m-3 rounded-full"
      :src="post.userId ? post.userId.userImage : ''"
      alt=""
    />
 
    <p class="bg-[#f2f2f2] my-1 p-2 leading-6 w-3/4  rounded">
      <span class="font-bold"
        >{{ post.userId ? post.userId.firstName : "" }}
        {{ post.userId ? post.userId.lastName : "" }}</span
      >
      <br />
      <span>{{ post.text }}</span>
    </p>
  </div>
  <div class="flex py-1 rounded ps-20">
    <button
      v-if="commentlikeshow"
      @click="postcommentlike(post._id)"
      class="ps-1 text-sm"
    >
      Like
    </button>
    <button
      v-else
      @click="postcommentlike(post._id)"
      class="ps-1 text-blue-500 text-sm"
    >
      Like
    </button>
    <p v-if="commentlike > 0" class="text-sm ps-1">{{ commentlike }}</p>
  </div>
</template>