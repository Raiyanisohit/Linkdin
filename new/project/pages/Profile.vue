<script setup>
// import {getprofiledata} from '../assets/js/userprofile'
// const {Data} = getprofiledata()
import {getconnection,postdata} from '../services/fetch.js'
const getUserData = await postdata("getUserData");
definePageMeta({
  middleware: "auth"
})
</script>
<template>
    <div>
<userProfile :post="getUserData ? getUserData : ''"/>
    </div>
</template>