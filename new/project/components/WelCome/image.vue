  <script setup>
import axios from "axios";
import { usesignupdataStore } from "../../store/signupdata";
const store = usesignupdataStore();
const router = useRouter();
const status = ref("")
const signupdata = reactive({ email: "", password: "" });
const validation = reactive({email:"",password:""})
const validationemail = ref("")
const validationpassword = ref("")

watchEffect(()=>{
  const emailPattern = /^\S+@\S+\.\S+$/;
  if(signupdata.email == ""){
validationemail.value = true
  }else{
      validation.email = ""
    validationemail.value = emailPattern.test(signupdata.email);
  }
})
watchEffect(()=>{
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@).{6,}$/;
  if(signupdata.password == ""){
validationpassword.value = true
  }else{
    validation.password = ""
    validationpassword.value = passwordPattern.test(signupdata.password);
  }
})


function handlesignup() {
  if(signupdata.email == "" ){
  validation.email = "Required !!"
  }
  else if(signupdata.password == "") {
   validation.password = "Required !!"
  }else{
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
      console.log((response.status));
      console.log((response.data));
      if(response.data.Message.includes("email must be a valid emai")){
        validationemail.value = true
      }
      else if(response.data.Message.includes("New User")){
        store.data.email = signupdata.email
       store.data.password = signupdata.password
      router.push('/username')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
      }
}

</script>

<template>
  <div class="w-max-[1128px] flex pt-[40px] flex-wrap justify-evenly">
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
              <label for="" class="mb-1">Email or Phone</label>
              <div>
                <input
                  v-model="signupdata.email"
                  type="text"
                  class="border-dark border lg:w-[390px] w-[320px] h-12"
                />
                <p v-if="!validationemail" class="text-red-600">
                  Invalid Email 
                </p>
                <p v-if="validation.email" class="text-red-600">
                 {{validation.email}}
                </p>
               
              </div>
            </div>
          </div>
          <div class="flex flex-col mt-2">
            <div class="mt-1.5">
              <div class="flex flex-col">
                <label for="" class="mb-1">Password</label>
                <div>
                  <input
                    v-model="signupdata.password"
                    type="text"
                    class="border-dark border lg:w-[390px] w-[320px] h-12"
                  />
                     <p v-if="!validationpassword" class="text-red-600">
                  Invalid Password 
                </p>
                 <p v-if="validation.password" class="text-red-600">
                 {{validation.password}}
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
                Sign in
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
      <div class="flex flex-col mt-7">
        <div class="mt-1.5">
          <button
            class="border-dark border rounded-full lg:w-[390px] w-[320px] h-12"
          >
            Sign in With Google
          </button>
        </div>
      </div>
      <div class="flex flex-col mt-7">
        <div class="mt-1.5">
          <button
            class="border-dark border rounded-full lg:w-[390px] w-[320px] h-12"
          >
            New to Linksdin? Join now
          </button>
        </div>
      </div>
    </div>
    <div>
      <img
        class="lg:w-[700px] w-[400px] md:mt-28 mt-10"
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