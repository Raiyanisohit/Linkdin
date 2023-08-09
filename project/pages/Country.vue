<script setup>
definePageMeta({
layout: "custome"
})
const router = useRouter()
import {usesignupdataStore} from '../store/signupdata'
const store = usesignupdataStore()
 console.log(store.data)

watchEffect(()=>{
    if(store.data.email === ""){
    router.push('/')
    }
})
</script>


<template>
<country/>
</template>


<style>

</style>