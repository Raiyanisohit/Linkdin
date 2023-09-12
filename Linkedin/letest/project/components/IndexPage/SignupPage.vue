  <script setup>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { usesignupdataStore } from "../../store/signupdata";
import { postdata } from "../../services/api";
const store = usesignupdataStore();
const router = useRouter();
const status = ref("");
const signupdata = reactive({ email: "", password: "" });
const validation = reactive({ email: "", password: "" });

watchEffect(() => {
  if (signupdata.email == "") {
    validation.email = false;
  } else {
    validation.email = "";
  }
});
watchEffect(() => {
  if (signupdata.password == "") {
    validation.password = false;
  } else {
    validation.password = "";
  }
});
const emailpatten = ref(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
const passwordPattern = ref(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@).{6,}$/);

// -----------------------------------signupdata--------------------------------//

async function handlesignup() {
  if (signupdata.email.trim() === "") {
    validation.email = "* Please enter your email address.";
  }
  if (signupdata.password.trim() === "") {
    validation.password = "Please enter your Password.";
  }
  if (signupdata.email != "" && signupdata.password != "") {
    if (emailpatten.value.test(signupdata.email) != true) {
      validation.email = "Please enter a valid email address.";
    } else if (passwordPattern.value.test(signupdata.password) != true) {
      validation.password = "Password must contain at least one lowercase letter,one uppercase letter,one digit,one special character and be at least 6 characers long..";
    } else {
      var data = JSON.stringify({
        email: signupdata.email,
        password: signupdata.password,
      });
      const response = await postdata("", data);
      if (response.Message.includes("email")) {
        validation.email = "Invalid Email";
      } else if (response.Message.includes("User already Exist")) {
        toast.info("User already Exist", {
          position: "top-center",
          autoClose: 1500,
        });
      } else if (response.Message.includes("New User")) {
        store.data.email = signupdata.email;
        store.data.password = signupdata.password;
        router.push("/register/username");
      }
    }
  }
}

const showpassword = ref("");
const showpasswordd = () => {
  showpassword.value = !showpassword.value;
};
const inputType = computed(() => {
  return showpassword.value ? "text" : "password";
});
</script>

<template>
  <div
    class="w-max-[1128px] px-2 mb-2 md:pb-12 flex md:pt-[100px] flex-wrap justify-evenly"
  >
    <div>
      <div>
        <p class="text-[56px] px-2 text-[#8f5849] font-extralight">
          Welcome to <br />
          your <br />
          professional <br />
          community
        </p>
      </div>
      <div class="flex flex-col">
        <div>
          <form action="" @submit.prevent="handlesignup">
            <div class="mt-1.5 ">
              <div class="flex flex-col">
                <label for="" class="mb-1 px-2">Email*</label>
                <div class="relative mt-1 mb-2">
                  <input
                    v-model="signupdata.email"
                    type="text"
                    placeholder="Email"
                    class="border-dark border lg:w-[390px] w-[300px] mx-2 h-12"
                  />

                  <p
                    v-if="validation.email"
                    class="text-red-600 absolute font-serif font-semibold"
                  >
                    {{ validation.email }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-col mt-3">
              <div class="mt-1.5">
                <div class="flex flex-col">
                  <div class="relative">
                    <label for="" class="mb-1 px-2">Password*</label>
                    <p
                      @click="showpasswordd"
                      v-if="showpassword"
                      class="absolute pt-[20px] pe-3 right-0"
                    >
                      <img
                        class="w-5 hover:cursor-pointer"
                        src="https://cdn-icons-png.flaticon.com/128/10812/10812267.png"
                        alt=""
                      />
                    </p>
                    <p
                      @click="showpasswordd"
                      class="absolute pt-[20px] pe-3 right-0"
                    >
                      <img
                        class="w-5 hover:cursor-pointer"
                        src="https://cdn-icons-png.flaticon.com/128/11502/11502541.png"
                        alt=""
                      />
                    </p>
                  </div>
                  <div class="mt-1 mb-1">
                    <input
                      v-model="signupdata.password"
                      :type="inputType"
                      placeholder="Password"
                      class="border-dark border ps-2 lg:w-[390px] w-[300px] mx-2 h-12"
                    />

                    <p
                      v-if="validation.password"
                      class="text-red-600  font-semibold font-serif w-96 ps-2"
                    >
                      {{ validation.password }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col mt-4">
              <div class="mt-1.5 px-2">
                <button
                  class="border-dark border rounded-full bg-blue-600 hover:bg-blue-700 text-light font-bold text-[18px] lg:w-[390px] w-[300px] h-12"
                >
                  Agree & Join
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="md:mt-5 mt-3">
      <img
        class="lg:w-[700px] w-[400px] md:mt-10"
        src="	https://media.licdn.com/media//AAYQAgSrAAgAAQAAAAAAAF28luld64NDRCi0l6N4Bki57w.png"
        alt=""
      />
    </div>
  </div>
</template>

