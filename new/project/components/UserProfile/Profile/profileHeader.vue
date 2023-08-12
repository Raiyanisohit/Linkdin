<script setup>
import axios from "axios";
import {usealluserpostdataStore} from '../../../store/Alluserpostdata'
const storeallpost = usealluserpostdataStore()
const props = defineProps(["post"]);
console.log(props.post, "Profile id");
const route = useRoute();
const checkConnectionRequest = ref("")
const showfunction = ref(route.params.id);
const postdata = reactive({
  firstname: "",
  lastname: "",
  hadline: "",
  country: "",
  city: "",
  industry:"" 
});
const totalConnection = ref("");
const imgurl = ref("");
const imgurll = ref("");
function getconnection() {
  var config = {
    method: "post",
    url: "http://localhost:3010/getTotalConnectionNo",
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  axios(config)
    .then(function (response) {
      totalConnection.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
getconnection();

function introfirstname(e) {
  postdata.firstname = e.target.value;
}
function introlastname(e) {
  postdata.lastname = e.target.value;
}
function introcity(e) {
  postdata.city = e.target.value;
}
function introhadline(e) {
  postdata.hadline = e.target.value;
}
function introcountry(e) {
  postdata.country = e.target.value;
}

function handlesubmit() {
  console.log(postdata)
  var data = JSON.stringify({
  "firstName": postdata.firstname,
  "lastName": postdata.lastname,
  "city": postdata.city,
  "country": postdata.country,
  "profileHeadline": postdata.hadline,
  "industry": postdata.industry
});

var config = {
  method: 'put',
  url: 'http://localhost:3010/updateUserProfile',
  headers: { 
    'token': localStorage.getItem('token'), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}

function imgdata(event) {
  const file = event.target.files[0];
  imgurl.value = event.target.files;
  if (file) {
    imgurll.value = URL.createObjectURL(file);
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
      .then((res) => console.log(res.data))
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

function connect(){
  var data = JSON.stringify({
  "requestId":route.params.id
});

var config = {
  method: 'post',
  url: 'http://localhost:3010/sendConnectionRequest',
  headers: { 
    'token': localStorage.getItem('token'), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log((response.data));
})
.catch(function (error) {
  console.log(error);
});

}

</script>
<template>
  <div
    href="#"
    class="block mt-4 bg-white border border-gray-200 lg:w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="relative">
      <img
        v-if="post.Message.backgroundImage"
        :src="post.Message.backgroundImage"
        alt=""
        class="w-full h-52"
      />
      <img
        v-else
        src="https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq"
        alt=""
      />
      <div 
        data-bs-toggle="modal"
        data-bs-target="#profile"
        class="absolute -bottom-14 left-5"
      >
        <img
          class="w-36 h-36 mb-3 rounded-full shadow-lg"
          :src="post.Message.userImage"
          alt=""
        />
      </div>
    </div>
    <div>
      <div v-if="!showfunction" class="float-right px-3 py-4">
        <img
          class="w-5"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
          alt=""
        />
        <p></p>
      </div>
      <div class="px-4 py-14">
        <p class="text-2xl font-bold">
          {{ post.Message.firstName }} {{ post.Message.lastName }}
        </p>
        <p>{{ post.Message.profileHeadline }}</p>
        <p class="text-gray-500">
          {{ post.Message.city }},{{ post.Message.country }} &middot;
          <span
            class="text-blue-700 hover:text-blue-900 hover:underline"
            data-bs-toggle="modal"
            data-bs-target="#contact"
            >contact info</span
          >
        </p>
        <p class="text-blue-500 font-bold">{{ totalConnection }} Connections</p>
      <div v-if="checkConnectionRequest == 'connection'"></div>
      <div v-else-if="checkConnectionRequest !== 'pending'" class="pt-2">
        <button v-if="showfunction" @click="connect" class="px-3 bg-blue-600 py-2 border text-white font-bold hover:bg-blue-700 rounded-full">Connect</button>
      </div>
      <div v-else class="pt-2">
        <button v-if="showfunction" @click="connect" class="px-3 border-blue-600 py-2 border-2  font-bold hover:bg-blue-700 rounded-full">Pending</button>
      </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="handlesubmit">
        <div class="modal-content lg:w-[700px]">
          <div class="modal-header">
            <h5 class="modal-title text-xl" id="exampleModalLabel">
              Edit intro
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
            <p class="text-xs mb-2">* Indicates required</p>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label"
                >First name*:</label
              >
              <input
                class="form-control"
                :value="post.Message.firstName"
                @input="introfirstname"
                id="recipient-name"
              />
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label"
                >Last name*</label
              >
              <input
                class="form-control"
                :value="post.Message.lastName"
                @input="introlastname"
                id="message-text"
              />
            </div>

            <div class="mb-3">
              <label for="message-text" class="col-form-label">Headline</label>
              <input
                class="form-control"
                :value="post.Message.profileHeadline"
                @input="introhadline"
                id="message-text"
              />
            </div>

            <div class="mb-3">
              <label
                for="message-text"
                class="col-form-label font-bold text-2xl"
                >Location</label
              ><br />
              <label for="message-text" class=" ">Country/Region*</label>
              <input
                class="form-control"
                :value="post ? post.Message.country : ''"
                @input="introcountry"
                id="message-text"
              />
            </div>
            <div class="mb-3">
              <label for="message-text" class=" ">City</label>
              <input
                class="form-control"
                :value="post ? post.Message.city : ''"
                @input="introcity"
                id="message-text"
              />
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label"
                >Industry *:</label
              >
              <input
                class="form-control"
                v-model="postdata.industry"
                id="recipient-name"
              />
            </div>
          </div>
          <hr />
          <div class="py-2 px-3">
            <button
              data-bs-dismiss="modal"
              class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white px-3 py-1 border-info font-bold"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- -----------------------------------------contact info --------------------------------------------- -->
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
            {{ post.Message.firstName }} {{ post.Message.lastName }}
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
                  linkedin.com/{{ post.Message.firstName }}-{{
                    post.Message.lastName
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
                <p class="text-[16px]">{{ post.Message.email }}</p>
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
            <h5 class="modal-title text-2xl font-bold" id="exampleModalLabel">
              {{ post.Message.firstName }} {{ post.Message.lastName }}
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
              :src="post.Message.userImage"
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
          <div data-bs-dismiss="modal" class="flex justify-content-end m-2">
            <button
              class="float-right rounded border-2 hover:bg-blue-400 btn btn-outline-dark hover:text-white px-3 py-1 border-info font-bold"
            >
              Post
            </button> 
          </div>
        </form>
      </div>
    </div>
  </div>
</template>