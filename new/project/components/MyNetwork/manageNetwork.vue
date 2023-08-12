<script setup>
// import {usealluserpostdataStore} from '../../store/Alluserpostdata'
// const storedata = usealluserpostdataStore()
import {getconnection,postdata} from '../../services/fetch.js'
// const allconnection = await getconnection("getAllConnectionRequest");
const allconnection = ref([])

onMounted(async () => {
  const posts= await getconnection("getAllConnectionRequest");
  allconnection.value = posts
});


async function getaccept(e) {
     var data = JSON.stringify({
      "id": e.slice(0, 24),
      "status": e.slice(24)
    });
  let deletepostee = await postdata("acceptOrDeclineRequest", data);
  const index =  allconnection.value.findIndex((i) => i._id == e);
  allconnection = allconnection.value.splice(index, 1);
}



</script>
<template>
    <div >
    <div class="lg:flex flex-wrap justify-center">
      <div>
    <Manage  />
      </div>
      <div>
        <Manageinvitations :data="allconnection" :getaccept="getaccept"  class="ps-[20px]" />
      </div>
    </div>
  </div>
</template>
