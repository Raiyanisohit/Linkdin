  <script setup>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { usesignupdataStore } from "../../store/signupdata";
const store = usesignupdataStore();
const router = useRouter();
const status = ref("");
const signupdata = reactive({ email: "", password: "" });
const validation = reactive({ email: "", password: "" });


// watchEffect(()=>{
//   if(signupdata.email == ""){
// validationemail.value = fa
//   }else{
//       validation.email = ""
//     validationemail.value = emailPattern.test(signupdata.email);
//   }
// })
// watchEffect(()=>{
//   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@).{6,}$/;
//   if(signupdata.password == ""){
// validationpassword.value = true
//   }else{
//     validation.password = ""
//     validationpassword.value = passwordPattern.test(signupdata.password);
//   }
// })

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
const emailpatten = ref(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const passwordPattern = ref(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@).{6,}$/);

function handlesignup() {
  if (signupdata.email.trim() === "") {
    validation.email = "* Email is Required ";
  }
  if (signupdata.password.trim() === "") {
    validation.password = "* Password is Required";
  }

  if (signupdata.email != "" && signupdata.password != "") {
    if (emailpatten.value.test(signupdata.email) != true) {
      validation.email = "Inavalid Email";
    } else if (passwordPattern.value.test(signupdata.password) != true) {
      validation.password = "Invalid Password";
    } else {
      var data = JSON.stringify({
        email: signupdata.email,
        password: signupdata.password,
      });

      var config = {
        method: "post",
        url: "http://localhost:3010/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.Message.includes("email")) {
            validation.email = "Invalid Email";
          } else if (response.data.Message.includes("User already Exist")) {
            toast.info("User already Exist", {
              position: "top-center",
            });
          } else if (
            response.data.Message.includes(
              "length must be at least 6 characters long"
            )
          ) {
            validation.password =
              "Password length must be at least 6 characters long";
          } else if (response.data.Message.includes("[0-9]")) {
            validation.password = "Password must contain at least one number";
          } else if (response.data.Message.includes("[A-Z]")) {
            validation.password = "Password must contain at least 1 upper case";
          } else if (response.data.Message.includes("[a-z]")) {
            validation.password = "Password must contain at least 1 lower case";
          } else if (response.data.Message.includes("[^\\w]")) {
            validation.password = "Password must contain at least one symbole";
          } else if (response.data.Message.includes("New User")) {
            store.data.email = signupdata.email;
            store.data.password = signupdata.password;
            router.push("/register/username");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
  <!-- <div v-if="validationerror" class="alert absolute text-center alert-danger alert-dismissible fade show" role="alert">
  <strong class="text-xl ">{{validationerror}}</strong> 
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
    <img src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png" alt="">
  </button>
</div> -->

  <div class="w-max-[1128px] mb-2 md:pb-12 flex md:pt-[100px] flex-wrap justify-evenly">
    <div>
      <div>
        <p class="text-[56px] text-[#8f5849] font-extralight">
          Welcome to <br />
          your <br />
          professional <br />
          community
        </p>
      </div>
      <div class="flex flex-col">
        <div>
          <form action="" @submit.prevent="handlesignup">
            <div class="mt-1.5">
              <div class="flex flex-col">
                <label for="" class="mb-1">Email*</label>
                <div class="relative mt-1 mb-2">
                  <input
                    v-model="signupdata.email"
                    type="text"
                    class="border-dark border lg:w-[390px] w-[320px] h-12"
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
                  <label for="" class="mb-1">Password*</label>
                  <p
                    @click="showpasswordd"
                    v-if="showpassword"
                    class="absolute pt-[20px] pe-3  right-0"
                  >
                    <img
                      class="w-5"
                      src="https://cdn-icons-png.flaticon.com/128/10812/10812267.png"
                      alt=""
                    />
                  </p>
                  <p
                    @click="showpasswordd"
                    class="absolute pt-[20px] pe-3 right-0"
                  >
                    <img
                      class="w-5"
                      src="https://cdn-icons-png.flaticon.com/128/11502/11502541.png"
                      alt=""
                    />
                  </p>
                  </div>
                  <div class=" mt-1  mb-1">
                    <input
                      v-model="signupdata.password"
                      :type="inputType"
                      class="border-dark border ps-2 lg:w-[390px] w-[320px] h-12"
                    />

                    <p
                      v-if="validation.password"
                      class="text-red-600 absolute font-semibold font-serif"
                    >
                      {{ validation.password }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col mt-7">
              <div class="mt-1.5">
                <button
                  class="border-dark border rounded-full bg-blue-600 hover:bg-blue-700 text-light font-bold text-[18px] lg:w-[390px] w-[320px] h-12"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="md:mt-5 mt-2">
      <img
        class="lg:w-[700px] w-[400px] md:mt-10"
        src="	https://media.licdn.com/media//AAYQAgSrAAgAAQAAAAAAAF28luld64NDRCi0l6N4Bki57w.png"
        alt=""
      />
    </div>
  </div>
</template>


<style scoped>
body {
  background-color: white;
}
</style>