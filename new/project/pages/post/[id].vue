<script setup>
import axios from "axios";
const route = useRoute()
let Data = ref("")
 async function getprofile(){
    var  data = JSON.stringify({
      });
      
      var config = {
        method: 'post',
        url: 'http://localhost:3010/getUserData?id=' + route.params.id,
        headers: { 
          'token': localStorage.getItem('token') , 
          'Content-Type': 'application/json'
        },
        data : data
      };
    
      axios(config)
      .then(function (response) {
          Data.value = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
}
getprofile()
definePageMeta({
  middleware: "auth"
})
</script>
<template>
    <div>
<userProfile :post="Data ? Data : '' "/>
    </div>
</template>