
<script setup>
definePageMeta({
  layout: "custome",
});
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import {postdata} from '../services/api'
const input = reactive({ email: "", password: "" });
const required = reactive({ email: "", password: "" });
const error = ref("");
const router = useRouter();
const showpassword = ref(true);
const emailpatten = ref(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
const passwordPattern = ref(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@).{6,}$/);

watchEffect(() => {
  if (input.email == "") {
    required.email = false;
  } else {
    required.email = "";
  }
});

watchEffect(() => {
  if (input.password == "") {
    required.password = false;
  } else {
    required.password = "";
  }
});

// async function handleLogin(){
//   if (input.email.trim() === "") {
//     required.email = "* Please enter your email address.";
//   }
//   if (input.password.trim() === "") {
//     required.password = "* Please enter your password.";
//   }
//   if (input.email.trim() != "" && input.password.trim() != "") {
//     if (emailpatten.value.test(input.email) != true) {
//       required.email = "Please enter a valid email address.";
//     } else if (passwordPattern.value.test(input.password) != true) {
//       required.password = "Please enter a valid password.";
//     } else {
//       const data = JSON.stringify({
//           email: input.email,
//           password: input.password,
//   })
//       const response = await postdata("LogIn",data)
//       console.log(response)
//       if(response.token){
//         localStorage.setItem('token',response.token)
//         router.push('/feed')
//       }else if (response.status == 204) {
//             toast.error("User Not Found", {
//               position: "top-center",
//               autoClose: 1500,
//             });
//       }
//     }
//     }
// }

function handleLogin() {
  if (input.email.trim() === "") {
    required.email = "* Please enter your email address.";
  }
  if (input.password.trim() === "") {
    required.password = "* Please enter your password.";
  }
  if (input.email.trim() != "" && input.password.trim() != "") {
    if (emailpatten.value.test(input.email) != true) {
      required.email = "Please enter a valid email address.";
    } else if (passwordPattern.value.test(input.password) != true) {
      required.password = "Please enter a valid password.";
    } else {
      axios
        .post("http://192.168.100.221:3010/LogIn", {
          email: input.email,
          password: input.password,
        })
        .then((response) => {
          const token = response.data.token;
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("email", input.email);
            router.push("/feed");
          } else if (response.status == 204) {
            toast.error("User Not Found", {
              position: "top-center",
              autoClose: 1500,
            });
          } else if (response.data.includes("email")) {
            required.email = "Invalid Email";
          } else if (
            response.data.includes("length must be at least 6 characters long")
          ) {
            required.password =
              "password  length must be at least 6 characters long";
          } else if (response.data.includes("[0-9]")) {
            required.password = "Password must contain at least one number";
          } else if (response.data.includes("[A-Z]")) {
            required.password = "Password must contain at least 1 upper case ";
          } else if (response.data.includes("[a-z]")) {
            required.password = "Password must contain at least 1 lower case";
          } else if (response.data.includes("password")) {
            required.password = "Password must contain at least one symbole";
          } else if (response.data.includes("Wrong Password")) {
            required.password = "Wrong Password";
          }
        })
        .catch(function (error) {
          if (error) {
            console.log(error);
          }
        });
    }
  }
}
const showpasswordd = () => {
  showpassword.value = !showpassword.value;
};
const inputType = computed(() => {
  return showpassword.value ? "password" : "text";
});
</script>

<template>
  <div class="flex justify-center mt-32 flex-wrap">
    <div
      href="#"
      class="block max-w-sm px-10 p-7 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <form action="POST" @submit.prevent="handleLogin">
        <div class="text-3xl flex justify-center font-bold">Login</div>
        <div class="pt-7">
          <label for="ID">Email*</label>
          <input
            class="border-dark border py-3 rounded px-2 w-80 hover:border-2 h-[32px] mt-1"
            type="text"
            placeholder="Email"
            v-model="input.email"
          />

          <p
            v-if="required.email"
            class="text-red-600 absolute font-semibold font-serif"
          >
            {{ required.email }}
          </p>
        </div>

        <div class="pt-[35px] relative">
          <label for="email">Password*</label>
          <div
            @click="showpasswordd"
            v-if="showpassword"
            class="absolute pt-[13px] right-0"
          >
            <img
              class="w-5 hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/128/10812/10812267.png"
              alt=""
            />
          </div>
          <div @click="showpasswordd" class="absolute pt-[13px] right-0">
            <img
              class="w-5 hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/128/11502/11502541.png"
              alt=""
            />
          </div>
          <input
            class="border-dark py-3 border rounded px-2 w-80 h-[32px] mt-1 hover:border-2"
            :type="inputType"
            placeholder="Password"
            v-model="input.password"
          />

          <p
            v-if="required.password"
            class="text-red-600 font-semibold absolute font-serif"
          >
            {{ required.password }}
          </p>
        </div>
        <div class="pt-5 flex justify-center">
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




