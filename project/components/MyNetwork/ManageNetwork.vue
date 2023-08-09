<script setup>
import axios from 'axios'
// import {usenetworkStore} from '../../store/mynetwork'
// const store = usenetworkStore()
// console.log(store.allrequest)
const allrequest = ref("")
function getAllConnectionRequest(){
  var config = {
  method: 'get',
  url: 'http://localhost:3010/getAllConnectionRequest',
  headers: { 
    'token': localStorage.getItem('token')
  },
};

axios(config)
.then(function (response) {
  console.log(response.data)
  allrequest.value = response.data
})
.catch(function (error) {
  console.log(error);
});
} 
getAllConnectionRequest()
</script>
<template>
    <div >
    <div class="lg:flex flex-wrap justify-center">
      <div>
    <Manage :Data={allrequest} />
      </div>
      <div>
        <Manageinvitations :data={allrequest} class="ps-[20px]" />
      </div>
    </div>
  </div>
</template>
