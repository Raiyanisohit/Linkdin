<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { DeleteData, getconnection, postdata,UpdateData } from "../services/api.js";


const router = useRouter()
const postdata1 = ref([]);
const AllUserpost = ref([]);
const editpost = ref("")

  const getUserData = await postdata("getUserData");



watchEffect(()=>{
  if( getUserData === "Unothorized Access" ){
    router.push('/login')
  }
})
// -----------------------------alluserpost-----------------------------//

onMounted(async() => {
  const posts = await postdata("allUserpost");
  AllUserpost.value = posts;
});

// -----------------------------deleteUserPost--------------------------------//

const userdeletpost = async()=> {
    const res = await DeleteData(`deleteUserPost?postId=${deletid.value}`);
     toast.success('Post deleted successfully',{
          autoClose:1500
     });

  const index = AllUserpost.value.findIndex((i) => i._id == deletid.value);
  AllUserpost.value.splice(index, 1);
}

const newpostdata = ref("")
  const errormessage = ref("")

watchEffect(()=>{
  if(editpost.value.trim() === ""){
errormessage.value = ""
  }else{
  errormessage.value == ""
  }
})
// ----------------------------------editUserPost-------------------------//
async function savepost(){
  if((editpost.value != "" || editpost.value == "" ) && img.value == ""){
     if(editpost.value.trim() == ""){
     errormessage.value = "plese Enter your text"
      }else{
    const data = JSON.stringify({
        postId:editid.value,
      postText: editpost.value,
    })
     const newdata = await UpdateData("editUserPost",data)
    const edit = newdata.text
    const index = AllUserpost.value.findIndex((d)=>d._id === editid.value)
    AllUserpost.value[index].text = edit
    toast.success('Post updated successfully',{
      autoClose:1500
   });
     var myModalEl = document.getElementById('edit');
       var modal = bootstrap.Modal.getInstance(myModalEl)
       modal.hide();
    }
}
  if((editpost.value == "" || editpost.value != "" ) && img.value != ""){
    const data = JSON.stringify({
      postId:editid.value,
      postText: editpost.value,
    })
     const newdata = await UpdateData("editUserPost",data)
    const edit = newdata.text
    const index = AllUserpost.value.findIndex((d)=>d._id === editid.value)
    AllUserpost.value[index].text = edit
    toast.success('Post updated successfully',{
      autoClose:1500
   });
     var myModalEl = document.getElementById('edit');
       var modal = bootstrap.Modal.getInstance(myModalEl)
       modal.hide();
}
}

// -------------------------child_Data-------------------------------//

const handleChildDataChanged = async(newData) => {
  let data = { ...newData.Data };

  data.userName = {
    _id:getUserData.Message._id,
    firstName:getUserData.Message.firstName,
    lastName: getUserData.Message.lastName,
    userImage:getUserData.Message.userImage
  };
      AllUserpost.value.unshift(data);
    toast.success('New post created successfully',{
         autoClose:1500
    });

};

// ------------------------------Editpost--------------------//
const img = ref("")
const editid = ref("")
 async function editpostt(e){
  close()
 const edit =  AllUserpost.value.find((i)=>i._id == e)
 img.value = edit.post
 editid.value = edit._id
 editpost.value = edit.text
}

// ---------------------------------deletid ----------------------//

const deletid = ref("")
function deletepost(e){
   const deletdata =  AllUserpost.value.find((i)=>i._id == e)
   deletid.value = deletdata._id
}
const close =()=>{
errormessage.value = ""
}

</script>
<template>
  <!-- ------------------profile--------------- -->
  <div class="flex flex-wrap relative justify-center">
    <div>
      <Profile :post="getUserData ? getUserData : ''" class="sticky top-20 " />
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
          :deletepost="deletepost"
        />
      </div>
    </div>
    <div >
      <News class="sticky top-20 "/>
    </div>
  </div>

<!-- --------------------------------------Editmodal------------------------------- -->
  
 <modal id="edit" title="Edit your Post">
<form action="" @submit.prevent="savepost">
  <textarea v-model="editpost" class=" w-full p-2 border-4" type="text"  />
  <div v-if="img">
        <img class="max-h-[500px] opacity-50 w-full mx-auto" :src="img" alt="" />
      </div>
      <div v-else>
        <video class="w-full h-[500px]" controls autoplay muted loop>
          <source class="w-full mx-auto" :src="img" type="video/mp4" />
        </video>
      </div>  
      <p class="text-red-500">{{errormessage}}</p>
  <button  class="me-1 mt-2 float-right text-white rounded border-2  bg-green-600 hover:bg-green-700  px-3 py-1 border-success font-bold">SAVE</button>
</form>
 </modal>

<!-- -------------------------deletpost--------------------------------- -->

 <deletmodal id="deletepost" title="Delete Post?">
 <p class="pb-2 ">Are you sure you want to permanently remove this post from LinkedIn?</p> 
 <button  data-bs-dismiss="modal"  @click="userdeletpost"  class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700   px-3 py-1 border-danger font-bold">DELETE</button>
 <button data-bs-dismiss="modal"   class="me-1 float-right border-dark rounded border-2  hover:bg-blue-400   px-3 py-1  font-bold">No thanks</button>
</deletmodal>
</template>


<style >
body {
  background-color: #f3f2ef;
}
</style>