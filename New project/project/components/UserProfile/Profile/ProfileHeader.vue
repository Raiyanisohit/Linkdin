<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from "axios";
import {postdata,UpdateData} from '../../../services/fetch'
import {useprofileStore} from '../../../store/getprofile'
const store = useprofileStore()
const route = useRoute();
const checkConnectionRequest = ref("")
const showfunction = ref("");
const routeparams = ref(route.params.id);
const postdata1 = reactive({
  firstname: "",
  lastname: "",
  hadline: "",
  country: "",
  city: "",
  industry:"" 
});

watchEffect(()=>{
 const edit =  store.profileid == route.params.id
 showfunction.value = edit
})

const totalConnection = ref("");
const imgurl = ref("");
const imgurll = ref("");
const backgroundImageimgurl = ref("");
const backgroundImageimgurll = ref("");
const post = ref([])

// --------------------------------All_Conation-------------------//

async function gettotalno(){
    if(route.params.id){
const totalno = await postdata("getTotalConnectionNo?id=" + route.params.id)
totalConnection.value = totalno
  }else{
    const totalno = await postdata("getTotalConnectionNo")

    totalConnection.value = totalno
  }
}
gettotalno()

// ----------------------------Getuserdata-----------------------//

async function getconnection() {
  if(route.params.id){
const userprofile = await postdata("getUserData?id=" + route.params.id)
post.value = userprofile.Message
  }else{
    const userprofile = await postdata("getUserData")
    console.log(userprofile.Message)

    post.value = userprofile.Message
  }
}
getconnection();

const  introfirstname =(e)=> {
  postdata1.firstname = e.target.value;
}
const introlastname =(e)=> {
  postdata1.lastname = e.target.value;
}
const introcity =(e)=> {
  postdata1.city = e.target.value;
}
const introhadline =(e)=> {
  postdata1.hadline = e.target.value;
}
const introcountry =(e)=> {
  postdata1.country = e.target.value;
}

// ----------------------Update Info-----------------------------//
// ----------------------Update Info-----------------------------//

async function handlesubmit(){
   const data = JSON.stringify({
  "profileHeadline": postdata1.hadline || post.value.profileHeadline,
   "firstName": postdata1.firstname || post.value.firstName,
   "lastName": postdata1.lastname || post.value.lastname,
   "city": postdata1.city || post.value.city,
   "country": postdata1.country || post.value.country,
   "industry": postdata1.industry
 });

const Newdata = await UpdateData("updateUserProfile",data)
await getconnection()

}


function imgdata(event) {
  const file = event.target.files[0];
  imgurl.value = event.target.files;
  if (file) {
    imgurll.value = URL.createObjectURL(file);
  }
}

function backgroundImagedata(event) {
  console.log(event.target.files)
  const file = event.target.files[0];
  backgroundImageimgurl.value = event.target.files;
  if (file) {
    backgroundImageimgurll.value = URL.createObjectURL(file);
    console.log(backgroundImageimgurll.value)
  }
}

function backgroundimgsubmit(){
  if (backgroundImageimgurl.value == "") {
    console.log("invlid");
  } else {
    const data = new FormData();
    for (const element of backgroundImageimgurl.value) {
      data.append("userImage", element);
    }
    
    axios
       
      .post("http://localhost:3010/userBackgroundImage", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then(function(res) {
        console.log(res.data)
        toast.success("Background Image Change")
        getconnection()
      })
      .catch((err) => console.log(err));
  }
}

function issubmit() {
  if (imgurl.value == "") {
    console.log("invlid");
  } else {
    const data = new FormData();
    for (const element of imgurl.value) {
      data.append("userImage", element);
    }
    
    axios
       
      .post("http://localhost:3010/uploadUserProfile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then(function(res) {
        console.log(res.data)
        getconnection()
      })
      .catch((err) => console.log(err));
  }
}

  function checkconnection(){
    
    var data = JSON.stringify({
  "requestId": route.params.id
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/checkConnectionRequest',
  headers: { 
    'token': localStorage.getItem('token'), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log((response.data));
  if(response.data.Message.includes("In Connection")){
    checkConnectionRequest.value = "connection"
  }else if(response.data.Message.includes("Not Accepted Yet")){
     checkConnectionRequest.value = "pending"
  }else{
     checkConnectionRequest.value = ""
  }
})
.catch(function (error) {
  console.log(error);
});
}
checkconnection()


async function connect(){
  const data = JSON.stringify({
  "requestId":route.params.id
});
  const sendrequest =  await postdata("sendConnectionRequest",data)
    checkconnection()
}

</script>
<template>
  <div
    href="#"
    class="block mt-4 bg-white border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="relative ">
      <img
        v-if="post ? post.backgroundImage : ''"
        :src="post ? post.backgroundImage : ''"
        alt=""
        class="w-full h-52 rounded-lg"
      />
      <img
        v-else
        src="https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq"
        alt=""
      />
      <div v-if="showfunction"  data-bs-toggle="modal"
        data-bs-target="#backgroundimg"  class="absolute right-1 top-1  text-white">
        <img class="w-10 rounded-xl " src="https://t3.ftcdn.net/jpg/06/19/47/34/240_F_619473489_FWZe141MgfERRd4zR0F3SsDGZkeRCgUp.jpg" alt="">
      </div>
      <div v-if="!routeparams"  data-bs-toggle="modal"
        data-bs-target="#backgroundimg"  class="absolute right-1 top-1  text-white">
        <img class="w-10 rounded-xl " src="https://t3.ftcdn.net/jpg/06/19/47/34/240_F_619473489_FWZe141MgfERRd4zR0F3SsDGZkeRCgUp.jpg" alt="">
      </div>
      <div 
        data-bs-toggle="modal"
        data-bs-target="#profile"
        class="absolute -bottom-16 left-5"
      >
        <img
          class="w-36 h-36 mb-3 rounded-full border-2 shadow-lg"
          :src="post ? post.userImage : ''"
          alt=""
        />
      </div>
    </div>
    <div>
      <div  class="float-right mx-3 p-2 hover:bg-gray-300 rounded-full my-4">
        <img  v-if="showfunction"
          class="w-5"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
          alt=""
        />
        <img  v-if="!routeparams"
          class="w-5"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
          alt=""
        />
      </div>
      
      <div class="px-4 py-14">
        <p class="text-2xl font-bold">
          {{post ?  post.firstName : ''}} {{post ?  post.lastName : '' }}
        </p>
        <p>{{post ? post.profileHeadline :'' }}</p>
        <p class="text-gray-500">
          {{post ? post.city : '' }},{{post ?  post.country : '' }} &middot;
          <span
            class="text-blue-700 hover:text-blue-900 hover:underline"
            data-bs-toggle="modal"
            data-bs-target="#contact"
            >contact info</span
          >
        </p>
        <p v-if="totalConnection > 0" class="text-blue-500 font-bold">{{ totalConnection }} Connections</p>
      <div v-if="checkConnectionRequest == 'connection'"></div>
      <div v-else-if="checkConnectionRequest !== 'pending'" class="pt-2">
        <button v-if="showfunction" @click="connect" class="px-3 bg-blue-600 py-2 border text-white font-bold hover:bg-blue-700 rounded-full">Connect</button>
      </div>
      <div v-else class="pt-2">
        <button v-if="showfunction" @click="connect" class="px-3 border-blue-600 py-2 border-2  font-bold  rounded-full">Pending</button>
      </div>
      </div>
    </div>
  </div>

<modal id="exampleModal" title="Edit Intro">
  <form @submit.prevent="handlesubmit">
            <p class="text-xs mb-2">* Indicates required</p>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label  font-semibold"
                >First name*</label
              >
              <input
                class="form-control border-2"
                :value="post ? post.firstName : ''"
                @input="introfirstname"
                id="recipient-name"
              />
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label  font-semibold"
                >Last name*</label
              >
              <input
                class="form-control border-2"
                :value="post ? post.lastName : ''"
                @input="introlastname"
                id="message-text"
              />
            </div>

            <div class="mb-3">
              <label for="text" class="col-form-label font-semibold">Headline</label>
              <input
                class="form-control border-2"
                :value="post ? post.profileHeadline : ''"
                @input="introhadline"
                id="text"
              />
            </div>

            <div class="mb-3">
              <label
                for="message-text"
                class="col-form-label font-bold text-xl"
                >Location</label
              ><br />
              <label for="message-text" class=" font-semibold ">Country/Region*</label>
              <input
                class="form-control border-2"
                :value=" post ? post.country : ''"
                @input="introcountry"
                id="message-text"
              />
            </div>
            <div class="mb-3">
              <label for="message-text" class=" font-semibold ">City *</label>
              <input
                class="form-control border-2"
                :value="post ? post.city : ''"
                @input="introcity"
                id="message-text"
              />
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label  font-semibold"
                >Industry *</label
              >
              <input
                class="form-control border-2"
                v-model="postdata.industry"
                id="recipient-name"
              />
            </div>
            <hr />
          <div class="py-2 ">
            <button
              data-bs-dismiss="modal"
              class="float-right rounded border-2 hover:bg-blue-500 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
            >
              Save
            </button>
          </div>
         </form>
</modal>
  

  <!-- -----------------------------------------contact info --------------------------------------------- -->
  <!-- -----------------------------------------contact info --------------------------------------------- -->
  <div
    class="modal fade"
    id="contact"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content lg:w-[600px]">
        <div class="modal-header">
          <h5 class="modal-title text-2xl font-bold" id="exampleModalLabel">
            {{post ? post.firstName : '' }} {{post ?  post.lastName : '' }}
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
          <div>
            <p class="text-xl">Contact Info</p>
          </div>
          <div class="p-2">
            <div class="flex">
              <div>
                <img
                  class="w-[50px]"
                  src="https://static.vecteezy.com/system/resources/previews/018/930/585/original/linkedin-logo-linkedin-icon-transparent-free-png.png"
                  alt=""
                />
              </div>
              <div class="ps-1">
                <p class="text-[18px] font-bold">Your Profile</p>
                <p class="text-[16px]">
                  linkedin.com/{{post ?  post.firstName : '' }}-{{
                    post ? post.lastName : ''
                  }}/{{ route.params.name }}
                </p>
              </div>
            </div>
          </div>

          <div class="p-2 ps-3">
            <div class="flex">
              <div>
                <img
                  class="w-[40px]"
                  src="https://cdn-icons-png.flaticon.com/128/2549/2549872.png"
                  alt=""
                />
              </div>
              <div class="ps-1">
                <p class="text-[18px] font-bold">Your Email</p>
                <p class="text-[16px]">{{post ?  post.email : '' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ------------------------Update Profile------------------------------------ -->
  <!-- ------------------------Update Profile------------------------------------ -->
  <div v-if="!showfunction"
    class="modal fade"
    id="profile"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog ">
      <div class="modal-content  lg:w-[600px]">
        <form @submit.prevent="issubmit">
          <div class="modal-header">
            <h5 class="modal-title text-2xl font-bold font-serif" id="exampleModalLabel">
              {{post ? post.firstName : '' }} {{post ?  post.lastName : '' }}
            </h5>
            <button class="float-right" type="button" data-bs-dismiss="modal">
              <img
                class="w-8"
                src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png"
                alt=""
              />
            </button>
          </div>
          <div class="modal-body w-max mx-auto">
            <img
              v-if="!imgurll"
              class="rounded-full w-[250px] h-[250px]"
              :src="post ? post.userImage : ''"
              alt=""
            />
            <img
              v-else
              class="rounded-full w-[250px] h-[250px]"
              :src="imgurll"
              alt=""
            />
          </div>
          <div class="px-3">
            <label for="image" class="flex">
              <img
                class="w-[40px]"
                src="https://cdn-icons-png.flaticon.com/128/83/83574.png"
                alt=""
              />
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              @input="imgdata"
              class="w-0"
            />
          </div>
          <div data-bs-dismiss="modal" class="flex justify-content-end  m-3">
            <button
              class="float-right rounded border-2 hover:bg-blue-500 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
            >
              Save
            </button> 
          </div>
        </form>
      </div>
    </div>
  </div>
 <!-- -----------background img------------- -->
 <!-- -----------background img------------- -->
<modal id="backgroundimg" title="Background Image ">
            <form @submit.prevent="backgroundimgsubmit">
            <img
              v-if="!backgroundImageimgurll"
              class="w-full border-4 border-dark h-96"
              :src="post ? post.backgroundImage : ''"
              alt=""
            />
            <img
              v-else
              class="w-full border-4 border-dark h-[500px]"
              :src="backgroundImageimgurll"
              alt=""
            />
          <div class="px-1 ">
            <label for="backgroundimage" class="flex">
              <img
                class="w-[40px] mt-2 "
                src="https://cdn-icons-png.flaticon.com/128/83/83574.png"
                alt=""
              />
            </label>
            <input
              id="backgroundimage"
              type="file"
              accept="image/*"
              @input="backgroundImagedata"
              class="w-0 "
            />
          </div>
          <div data-bs-dismiss="modal" class="flex justify-content-end ">
            <button
              class="float-right rounded border-2 hover:bg-blue-500 btn btn-outline-dark hover:text-white px-3 py-1 border-primary font-bold"
            >
              Post
            </button> 
          </div>
        </form>
</modal>
 
</template>