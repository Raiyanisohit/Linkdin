<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
definePageMeta({
  middleware: "auth",
});
// import { usealluserpostdataStore } from "../store/Alluserpostdata";
//   const storeallpost = usealluserpostdataStore();
import { DeleteData, getconnection, postdata,UpdateData } from "../../services/fetch.js";

const postdata1 = ref([]);
const AllUserpost = ref([]);
const getUserData = await postdata("getUserData");
const editpost = ref("")

// -----------------------------alluserpost-----------------//
// -----------------------------alluserpost-----------------//

onMounted(async() => {
  const posts = await postdata("allUserpost");
  AllUserpost.value = posts.reverse();
});

// -----------------------------deleteUserPost--------------------------------//
// -----------------------------deleteUserPost--------------------------------//

const userdeletpost =async(e)=> {
    const res = await DeleteData(`deleteUserPost?postId=${e}`);
    console.log(res.data)
     toast.success('Post deleted successfully');

  const index = AllUserpost.value.findIndex((i) => i._id == e);
  AllUserpost.value.splice(index, 1);
}

const newpostdata = ref("")
const postedit = (e)=>{
newpostdata.value = e.target.value
} 

// -------------------------------------------editUserPost-------------------------//
// -------------------------------------------editUserPost-------------------------//

async function savepost(){
  const data = JSON.stringify({
    postId:editpost.value._id,
    postText: newpostdata.value ,
  })
  if(newpostdata.value != ""){
    const newdata = await UpdateData("editUserPost",data)
    const edit = newdata.text
    const index = AllUserpost.value.findIndex((d)=>d._id === editpost.value._id)
    AllUserpost.value[index].text = edit
}
}


const handleChildDataChanged = async(newData) => {
  console.log("image",newData)
   toast.success('New post created successfully');
   const data = { ...newData.Data };

  data.userName = {
    _id:getUserData.Message._id,
    firstName:getUserData.Message.firstName,
    lastName: getUserData.Message.lastName,
    userImage:getUserData.Message.userImage
  };

  AllUserpost.value.unshift(data);
};

 async function editpostt(e){
 const edit =  AllUserpost.value.find((i)=>i._id == e)
 editpost.value = edit
}


</script>
<template>
  <!-- ------------------profile--------------- -->
  <div class="flex flex-wrap relative justify-center">
    <div>
      <userprofile :post="getUserData ? getUserData : ''" />
    </div>
    <div>
      <div>
        <PostCreatedata
          :post="getUserData ? getUserData : ''"
          @childDataChanged="handleChildDataChanged"
        />
      </div>
      <div v-for="(m) in AllUserpost" :key="m">
        <PostAlldata
          :list="m ? m.userName : ''"
          :post="m ? m.post : ''"
          :text="m ?  m.text :'' "
          :postId="m._id ? m._id : ''"
          :editpostt="editpostt"
          :getuserdata="getUserData.Message"
          :deletepost="userdeletpost"
        />
      </div>
    </div>
    <div>
      <News />
    </div>
  </div>

  
 <modal id="edit" title="Edit your Post">
<form action="" @submit.prevent="savepost">
  <textarea @input="postedit" class="border w-full p-2" type="text" :value="editpost.text" />
  <button  data-bs-dismiss="modal" class="me-1 float-right text-white rounded border-2  bg-green-600 hover:bg-green-700  px-3 py-1 border-success font-bold">SAVE</button>
</form>
 </modal>
</template>

<style >
body {
  background-color: #f3f2ef;
}
.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 30px;
}
.lds-spinner div {
  transform-origin: 36px 36px;
  animation: lds-spinner 1s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 35px;
  width: 4px;
  height: 15px;
  border-radius: 30%;
  background: #353a4a;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>