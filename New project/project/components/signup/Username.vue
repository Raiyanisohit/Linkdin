<script setup>
import { usesignupdataStore } from "../../store/signupdata";
const store = usesignupdataStore();
const router = useRouter();
const inputusername = reactive({ firstnamee: "", lastnamee: "" });
const validationrouter = ref("");
const validationerror = reactive({ firstnameerror: "", lastnameerror: "" });

watchEffect(() => {
  if (inputusername.firstnamee != "") {
    validationerror.firstnameerror = "";
  } else {
    validationerror.firstnameerror = "";
  }
});
watchEffect(() => {
  if (inputusername.lastnamee != "") {
    validationerror.lastnameerror = "";
  } else {
    validationerror.lastnameerror = "";
  }
});

const regex = ref(/^[a-zA-Z._]+$/);
function handlesubmit() {
  if (inputusername.firstnamee == "") {
    validationerror.firstnameerror = "* First_Name is Required";
  }
  if (inputusername.lastnamee == "") {
    validationerror.lastnameerror = "* Last_Name is Required";
  }

  if (inputusername.firstnamee != "" && inputusername.lastnamee != "") {
    if (regex.value.test(inputusername.firstnamee) == false) {
      validationerror.firstnameerror = "Invalid First_name";
    } else if (regex.value.test(inputusername.lastnamee) == false) {
      validationerror.lastnameerror = "Invalid Last_name";
    } else {
      store.data.firstname = inputusername.firstnamee
      store.data.lastname = inputusername.lastnamee
      router.push('/register/Country')
    }
  }
}
</script>


<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-xs">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit.prevent="handlesubmit"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-3"
            for="username"
          >
            First Name*
          </label>
          <input
            v-model="inputusername.firstnamee"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            placeholder="First_Name"
          />
          <!-- <p v-if="!isvalidationfirstname" class="text-red-600">only character</p> -->
          <p class="text-red-600 absolute mb-2 font-semibold font-serif">
            {{ validationerror ? validationerror.firstnameerror : "" }}
          </p>
        </div>
        <div class="my-[30px]">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Last Name*
          </label>
          <input
            v-model="inputusername.lastnamee"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            type="text"
            placeholder="Last_Name"
          />
          <!-- <p v-if="!isvalidationlastname" class="text-red-600">only character</p> -->
          <p class="text-red-600 absolute font-semibold font-serif">
            {{ validationerror ? validationerror.lastnameerror : "" }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<style>
</style>