<script setup>
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import VTooltip from 'v-tooltip'
import {postdata,UpdateData,postdataImg} from '../../../services/api'
import {useprofileStore} from '../../../store/getprofile'
const store = useprofileStore()
const totalConnection = ref("");
const imgurl = ref("");
const imgurll = ref("");
const backgroundImageimgurl = ref("");
const backgroundImageimgurll = ref("");
const post = ref([])
const route = useRoute();
const router = useRouter()
const checkConnectionRequest = ref("")
const showfunction = ref("");
const routeparams = ref(route.params.id);
const firstname = ref("")
const lastname = ref("")
const hadline = ref("")
const country = ref("")
const city = ref("")
const industry = ref("")
const connectionbutton = ref("")
const regex = ref(/^[a-zA-Z._]+$/);
const error = reactive({
firstname:"",
lastname:"",
hadline:"",
city:"",
country:"",
industry:""
})
// --------------------------checkconnectionButton-------------------------------

watchEffect(()=>{
 const edit =  store.profileid == route.params.id 
 if(store.profileid == route.params.id){
  connectionbutton.value = false
 }else if(route.params.id){
   connectionbutton.value = true
 }else{
   connectionbutton.value = false
 }
 showfunction.value = edit
})


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

    post.value = userprofile.Message
  }
}
getconnection();



// ----------------------Update Info-----------------------------//

function editintro(){
  close()
firstname.value = post.value.firstName
lastname.value = post.value.lastName
hadline.value = post.value.profileHeadline
city.value =  post.value.city
country.value = post.value.country
industry.value =  post.value.industry
  
}

async function handlesubmit(){
if(firstname.value == ""){
  error.firstname = "First-name is required"
}
if(lastname.value == ""){
  error.lastname = "Last-name is required"
}
if(city.value == ""){
  error.city = "City is required"
}
if(country.value == ""){
  error.country = "Country is required"
}
if(industry.value == ""){
  error.industry = "Industry is required"
}
if(firstname.value != "" && lastname.value != "" && city.value != "" && country.value != "" && industry.value != ""){
  if (regex.value.test(firstname.value) == false) {
      error.firstname = "Please enter a valid first name.";
      }
     else if (regex.value.test(lastname.value) == false) {
      error.lastname = "Please enter a valid last name.";
    } else {
   const data = JSON.stringify({
  "profileHeadline": hadline.value ,
   "firstName": firstname.value ,
   "lastName": lastname.value ,
   "city": city.value ,
   "country": country .value,
   "industry": industry.value 
 });

const Newdata = await UpdateData("updateUserProfile",data)
await getconnection()

       var myModalEl = document.getElementById('exampleModal');
       var modal = bootstrap.Modal.getInstance(myModalEl)
       modal.hide();
       }
  }

}

// ---------------------------------------modelImgshow-----------------------------//

function imgdata(event) {
  const file = event.target.files[0];
  imgurl.value = event.target.files;
  if (file) {
    imgurll.value = URL.createObjectURL(file);
  }
}
function backgroundImagedata(event) {
  const file = event.target.files[0];
  backgroundImageimgurl.value = event.target.files;
  if (file) {
    backgroundImageimgurll.value = URL.createObjectURL(file);
  }
}
  
// --------------------------------------------uploadUserProfile----------------------//

async function issubmit(){
  if (imgurl.value == "") {
  } else {
    const data = new FormData();
    for (const element of imgurl.value) {
      data.append("userImage", element);
    }
    const img = await postdataImg('uploadUserProfile',data)
      await  getconnection()
}
}

// -----------------------userBackgroundImage----------------------------------//

async function backgroundimgsubmit(){
   if (backgroundImageimgurl.value == "") {
  } else {
    const data = new FormData();
    for (const element of backgroundImageimgurl.value) {
      data.append("userImage", element);
    }
    
    const img = await postdataImg('userBackgroundImage',data)
      await  getconnection()
}
}

// --------------------------------checkConnectionRequest--------------------//

async function checkconnection(){
     var data = JSON.stringify({
  "requestId": route.params.id
});
const response = await postdata("checkConnectionRequest",data)
 if(response.Message.includes("In Connection")){
    checkConnectionRequest.value = "connection"
  }else if(response.Message.includes("Not Accepted Yet")){
     checkConnectionRequest.value = "pending"
  }else{
     checkConnectionRequest.value = ""
  }
}
checkconnection()

// ----------------------------------sendConnectionRequest---------------------//

async function connect(){
  const data = JSON.stringify({
  "requestId":route.params.id
});
  const sendrequest =  await postdata("sendConnectionRequest",data)
    checkconnection()
}

function close(){
backgroundImageimgurl.value = ""
imgurl.value = ""
error.city = ""
error.country = ""
error.firstname = ""
error.lastname =""
error.hadline = ""
error.industry =""
}

</script>
<template>
  <div 
    href="#"
    class="block mt-3 bg-white border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="relative ">
      <img
        v-if="post ? post.backgroundImage : ''"
        :src="post ? post.backgroundImage : ''"
        alt=""
        class="w-full h-52 rounded-t-lg"
      />
      <img
        v-else
        src="https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq"
          class="w-full rounded-t-lg  h-46"
        alt=""
      />
      <div v-if="showfunction"  data-bs-toggle="modal"
        data-bs-target="#backgroundimg"  class="absolute right-1 top-1  text-white">
        <img   @click="close" class="w-10 rounded-xl hover:cursor-pointer" src="https://t3.ftcdn.net/jpg/06/19/47/34/240_F_619473489_FWZe141MgfERRd4zR0F3SsDGZkeRCgUp.jpg" alt="">
      </div>
      <div v-if="!routeparams"  data-bs-toggle="modal"
        data-bs-target="#backgroundimg"  class="absolute right-1 top-1  text-white">
        <img   @click="close" class="w-10 rounded-xl hover:cursor-pointer" src="https://t3.ftcdn.net/jpg/06/19/47/34/240_F_619473489_FWZe141MgfERRd4zR0F3SsDGZkeRCgUp.jpg" alt="">
      </div>
      
      <div 
        data-bs-toggle="modal"
        data-bs-target="#profile"
        @click="close"
        class="absolute md:-bottom-16 -bottom-20  md:left-5 left-24"
      >
        <img
          class="w-36 h-36 mb-3 rounded-full border-2 shadow-lg "
          :src="post ? post.userImage : ''"
          alt=""
        />
      </div>
    </div>
    <div>
      <div  class="float-right mx-3 p-2 hover:bg-gray-300 rounded-full my-4 hover:cursor-pointer">
        <img  v-if="showfunction"
          class="w-5"
           @click="editintro"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
          alt=""
        />
        <img  v-if="!routeparams"
        @click="editintro"
          class="w-5"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
          alt=""
        />
      </div>
      
      <div class=" px-4 py-16 flex justify-between">
        <div>
        <p class="text-2xl font-bold">
          {{post ?  post.firstName : ''}} {{post ?  post.lastName : '' }}
        </p>
        <p>{{post ? post.profileHeadline :'' }}</p>
        <p class="text-gray-500">
          {{post ? post.city : '' }},{{post ?  post.country : '' }} &middot;
          <span
            class="text-blue-700 hover:text-blue-900 hover:underline  hover:cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target="#contact"
            >contact info</span
          >
        </p>
        <p v-if="totalConnection > 0" class="text-blue-500 font-bold">{{ totalConnection }} Connections</p>
        <div class=" pt-2  md:pe-5">
     <div v-if="connectionbutton" >
      <div v-if="checkConnectionRequest == 'connection'"></div>
      <div v-else-if="checkConnectionRequest !== 'pending'" >
        <button @click="connect" class="px-3 bg-blue-600 py-2 border text-white font-bold hover:bg-blue-700 rounded-full">Connect</button>
      </div>
      <div v-else >
        <button  @click="connect" class="px-3 border-blue-600 py-2 border-2  font-bold  rounded-full">Pending</button>
      </div>
        </div>
        </div>
     </div>
     <div  class="font-bold text-gray-600   md:pe-4">{{post && post.industry}}</div>
      </div>
    </div>
  </div>

<!-- -----------------------------------edit intro -------------------------------- -->

<modal id="exampleModal" title="Edit Intro">
  <form @submit.prevent="handlesubmit">
            <p class="text-xs mb-2">* Indicates required</p>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label  font-semibold"
                >First name*</label
              >
              <input
                class="form-control border-2 bg-gray-50"
                v-model="firstname"
                id="recipient-name"
              />
                        <p class="text-red-500 absolute">{{error.firstname}}</p>
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label  font-semibold"
                >Last name*</label
              >
              <input
                class="form-control border-2 bg-gray-50"
                v-model="lastname"
                id="message-text"
              />
                <p class="text-red-500 absolute">{{error.lastname}}</p>
            </div>

            <div class="mb-3">
              <label for="text" class="col-form-label font-semibold">Headline</label>
              <input
                class="form-control border-2"
                v-model="hadline"
                id="text"
              />
                <p class="text-red-500 absolute">{{error.hadline}}</p>
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
                v-model="country"
                id="message-text"
              />
                <p class="text-red-500 absolute">{{error.country}}</p>
            </div>
            <div class="mb-3">
              <label for="message-text" class=" font-semibold ">City *</label>
              <input
                class="form-control border-2"
                v-model="city"
                id="message-text"
              />
                <p class="text-red-500 absolute">{{error.city}}</p>
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label  font-semibold"
                >Industry *</label
              >
              <input disabled
                class="form-control border-2"
                v-model="industry"
                id="recipient-name"
              />
                <p class="text-red-500 absolute">{{error.industry}}</p>
            </div>
            <hr />
          <div class="py-2 ">
            <button
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
              <div v-if="route.params.id" class="ps-1 ">
                <p class="text-[18px] font-bold">Your Profile</p>
               <a target="_blank" href="localhost:3000/post/{{route.params.id}}" class=" hover:cursor-pointer">
                <p class="text-[16px]  hover:cursor-pointer">
                  localhost:3000/post/{{route.params.id}}
                </p>
               </a>
              </div>
              <div v-else class="ps-1">
                <p class="text-[18px] font-bold">Your Profile</p>
               <a target="_blank" href="localhost:3000/profile" class=" hover:cursor-pointer">
                <p class="text-[16px]  hover:cursor-pointer">
                  localhost:3000/profile
                </p>
               </a>
              </div>
            </div>
          </div>

          <div class="p-2 ps-3">
            <div class="flex">
              <div >
                <img
                  class="w-[40px] "
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

  <div v-if="!showfunction"
    class="modal fade"
    id="profile"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog ">
      <div class="modal-content  lg:w-[600px]">
          <div class="modal-header">
            <h5 class="modal-title text-2xl font-bold font-serif" id="exampleModalLabel">
              {{post ? post.firstName : '' }} {{post ?  post.lastName : '' }}
            </h5>
            <button class="float-right " type="button" data-bs-dismiss="modal">
              <img
                class="w-8"
                src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png"
                alt=""
              />
            </button>
          </div>
          <div class="modal-body w-max mx-auto">
            <img
              v-if="!(imgurl ? imgurl[0].name.includes('jpeg') || imgurl[0].name.includes('jpg') || imgurl[0].name.includes('png') || imgurl[0].name.includes('webp'): '')"
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
          <div class="px-3 peer ">
            <label for="image" class="flex">
              <img
                class="w-[40px] hover:cursor-pointer "
                src="https://cdn-icons-png.flaticon.com/128/83/83574.png"
                alt=""
              />
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              @input="imgdata"
              class="w-0 "
            />
          </div>
    
          <p v-if="imgurl && (imgurl[0].name.includes('jpeg') || imgurl[0].name.includes('jpg') || imgurl[0].name.includes('png') || imgurl[0].name.includes('webp'))">
          </p>
          <p v-else-if="imgurl" class="text-red-600 px-2 font-bold"> Please insert a valid  file. </p>
          <p v-else class="text-red-600 px-2 font-bold"></p>
          <div  class="flex justify-content-end  m-3">
              <div v-if="imgurl && (imgurl[0].name.includes('jpeg') ||  imgurl[0].name.includes('png') || imgurl[0].name.includes('jpg') || imgurl[0].name.includes('webp') ) " class="pt-2">
                <button 
                @click="issubmit"
                  data-bs-dismiss="modal"
                  class="rounded-full ms-1 bg-blue-600 text-white font-bold px-4 py-2 border"
                >
                  Post
                </button>
              </div>
              <div v-else class="">
                <button class="rounded-full ms-1 bg-gray-300 text-white font-bold px-4 py-2 border" >
                  Post
                </button>
              </div>
          </div>
      </div>
    </div>
  </div>
 <!-- -----------background img------------- -->
 
<modal id="backgroundimg" title="Background Image ">
            <img
              v-if="!(backgroundImageimgurl ? backgroundImageimgurl[0].name.includes('jpeg') || backgroundImageimgurl[0].name.includes('jpg') || backgroundImageimgurl[0].name.includes('png') || backgroundImageimgurl[0].name.includes('webp') : '')"
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
          <div  class="px-1  ">
            <label for="backgroundimage" class="flex">
              <img
                class="w-[40px] mt-2 hover:cursor-pointer"
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
          <p v-if="backgroundImageimgurl && (backgroundImageimgurl[0].name.includes('jpeg') || backgroundImageimgurl[0].name.includes('jpg') || backgroundImageimgurl[0].name.includes('png') || backgroundImageimgurl[0].name.includes('webp'))">
          </p>
          <p v-else-if="backgroundImageimgurl" class="text-red-600 px-2 font-bold">Please Insert a valid  file </p>
          <p v-else class="text-red-600 px-2 font-bold"></p>
          <div  class="flex justify-content-end ">
             <div v-if="backgroundImageimgurl && (backgroundImageimgurl[0].name.includes('jpeg') ||  backgroundImageimgurl[0].name.includes('png') || backgroundImageimgurl[0].name.includes('jpg') || backgroundImageimgurl[0].name.includes('webp') ) " class="pt-2">
                <button 
                @click="backgroundimgsubmit"
                  data-bs-dismiss="modal"
                  class="rounded-full ms-1 bg-blue-600 text-white font-bold px-4 py-2 border"
                >
                  Post
                </button>
              </div>
              <div v-else >
                <button class="rounded-full ms-1 bg-gray-300 text-white font-bold px-4 py-2 border" >
                  Post
                </button>
              </div>
          </div>
</modal>
 
</template>