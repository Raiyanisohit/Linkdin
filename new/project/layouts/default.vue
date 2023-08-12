<script setup>
import {usenetworkStore} from '../store/mynetwork'
import {usealluserpostdataStore} from '../store/Alluserpostdata'
const storedata = usealluserpostdataStore()
const store = usenetworkStore()
</script>

<template>
    <div class="sticky top-0 z-10">
       <Navbar />
    </div>

    <slot></slot>


</template>