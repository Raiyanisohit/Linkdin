<script setup>
import { usedataStore } from "~/store/userdata";
import {usealluserpostdataStore} from '../store/Alluserpostdata'
const storeallpost = usealluserpostdataStore()
const store = usedataStore() 
definePageMeta({
  middleware: "auth",
});
</script>
<template>
  <!-- ------------------profile--------------- -->

  <div class="flex flex-wrap relative justify-center">
    <div v-if="storeallpost.Data">
      <profile :post="storeallpost.Data ? storeallpost.Data : ''" />
    </div>
    <div>
      <div>
        <postdata :post="storeallpost.Data ? storeallpost.Data : ''" />
      </div>
      <!-- ----------main---------- -->
      <div v-if="storeallpost.loding">
        <div v-for="(m,index) in storeallpost.data" :key="m">
          <postAlldata :list="m ? m.userName : ''" :post="m ? m.post : ''" :text="m ? m.text : ''"
            :user="Data ? Data : ''" :usercomment="m ? m : ''" :postId="m._id ? m._id : ''" :in="index" />
        </div>
      </div>
      <div v-else class="w-max mx-auto mt-2">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
    <div>
      <news />
    </div>
  </div>
</template>

<style >
body {
  background-color: #f3f2ef;
}
.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 30px;
}
.lds-spinner div {
  transform-origin: 36px 36px;
  animation: lds-spinner 1s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 35px;
  width: 4px;
  height: 15px;
  border-radius: 30%;
  background: #353a4a;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>