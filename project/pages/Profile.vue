<script setup>
import {getprofiledata} from '../assets/js/userprofile'
const {Data} = getprofiledata()
definePageMeta({
  middleware: "auth"
})
</script>
<template>
    <div>
<userProfile :post="Data ? Data : ''"/>
    </div>
</template>