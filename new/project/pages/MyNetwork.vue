<script setup>
import {usenetworkStore} from '../store/mynetwork'
const store = usenetworkStore()
</script>

<template>
    <div>
  <ManageNetwork :post="store"/>
    </div>
</template>


