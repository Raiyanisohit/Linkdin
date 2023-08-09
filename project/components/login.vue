<script setup>
import axios from "axios";
import {usedataStore} from '../store/userdata'
import {usealluserpostdataStore} from '../store/Alluserpostdata'
const storeallpost = usealluserpostdataStore()
const store = usedataStore()
const input = reactive({ email: "", password: "" });
const status = ref("");
const error = ref([]);
const router = useRouter();
const showpassword = ref(true)


function islogin() {
  if (input.email != "" && input.password != "") {
    console.log(input.email);
    axios
      .post("http://localhost:3010/LogIn", {
        email: input.email,
        password: input.password,
      })
      .then((response) => {
        console.log(response.data)
        error.value = response;
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("email", input.email);
           storeallpost.getdata()
          storeallpost.getprofiledata()
          router.push("/feed");
        } else {
          status.value = "invalid";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
 console.log(store.profileData)
function showpasswordd(){
  showpassword.value = !showpassword.value
}
const inputType = computed(()=>{
return showpassword.value ? "password" : "text"
})
</script>

<template>
  <div class="animation mt-2" v-if="status">
    <div
      id="toast-default"
      class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-zinc-300 border-l-[10px] border-red-600 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200"
      >
        <span class="sr-only">Fire icon</span>
        <img
          src="https://cdn-icons-png.flaticon.com/128/5320/5320926.png"
          alt=""
        />
      </div>
      <div v-if="error.data" class="ml-3 text-black text-xl font-serif font-normal">
        {{
          error.data.includes("must be a valid email")
            ? "Invalid Email"
            : error.data.includes("length must be at least 6 characters long")
            ? "Password Must be 6 Characters long !!"
            : error.data.includes("[0-9]")
            ? "required pattern: /[0-9]/"
            : error.data.includes("[a-z]")
            ? "required pattern: /[a-z]/"
            : error.data.includes("[A-Z]")
            ? "required pattern: /[A-Z]/"
            : error.data  
           
        }}
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-32 flex-wrap">
    <div
      href="#"
      class="block max-w-sm px-10 p-7 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <form action="POST" @submit.prevent="islogin">
        <div class="text-3xl font-bold">Login...</div>
        <div class="pt-7">
          <label for="ID">Email</label>
          <input
            class="border-dark border py-3 rounded px-2 w-80 hover:border-2 h-[32px] mt-2"
            type="text"
            v-model="input.email"
          />
          <p v-if="error.data" class="text-red-500">{{  error.data.includes("must be a valid email") ? "Invalid Email" : ''}}
          </p>
        </div>
        <div class="pt-3 relative">
          <label for="email">Password</label>
          <div @click="showpasswordd" v-if="showpassword" class="absolute pt-[14px] right-0 ">
            <img class="w-5" src="https://cdn-icons-png.flaticon.com/128/4230/4230235.png" alt="">
          </div>
          <div @click="showpasswordd" v-else class="absolute pt-[14px] right-0 ">
            <img class="w-5" src="https://cdn-icons-png.flaticon.com/128/10812/10812267.png" alt="">
          </div>
          <input
            class="border-dark py-3 border rounded px-2 w-80 h-[32px] mt-2 hover:border-2"
            :type="inputType"
            v-model="input.password"
          />
           <p v-if="error.data" class="text-red-500">{{ error.data.includes("length must be at least 6 characters long") ? "Password Must be 6 Characters long !!" : error.data.includes("Wrong Password") ? "Wrong Password!!" : error.data.includes("[A-Z]") ? "required pattern: [A-Z]" :  error.data.includes("[a-z]") ? "required pattern: [a-z]" : error.data.includes("[0-9]") ? "required pattern: [0-9]" : '' }}</p>
        </div>
        <div class="pt-4 flex justify-center">
          <button
            class="border text-center px-[105px] py-[13px] rounded-3xl bg-blue-700 hover:bg-blue-900 text-white font-semibold"
          >
            login
          </button>
        </div>
        <div class="pt-3">
          <div class="separator">or</div>
        </div>
        <div class="pt-3">
          <p class="text-center text-blue-800 font-bold">
            <nuxt-link class="hover:border-b-2 border-blue-500" to="/"
              >Signup in using another account</nuxt-link
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>




