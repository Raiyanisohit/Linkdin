
<script setup>
import { getconnection, postdata, DeleteData } from "../services/api.js";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const allconnection = ref([]);
const allconnection1 = ref([]);
const allconnectionNo = ref(0);
const Toster = ref("");

// --------------------------------getTotalConnectionNo--------------------------------------//

async function Totalno() {
  const data = await postdata("getTotalConnectionNo");
  allconnectionNo.value = data;
}
Totalno();

// ----------------------------------userConnections-----------------------------------------//

async function userconnection() {
  const connection = await getconnection("userConnections");
  allconnection1.value = connection.Message;
}
userconnection();

// ----------------------------------------GetAllconnecton----------------------------------//

async function getconnectionn() {
  const posts = await getconnection("getAllConnectionRequest");
  allconnection.value = posts;
}
getconnectionn();

// --------------------------------------AcceptOrDeclineRequest----------------------------//

async function getaccept(e) {
  var data = JSON.stringify({
    id: e.slice(0, 24),
    status: e.slice(24),
  });
  let deletepostee = await postdata("acceptOrDeclineRequest", data);
  if (deletepostee.Message.includes("Connected to Each Other")) {
    toast.success("Connection added successfully",{
      autoClose:1500
    });
  } else {
    toast.success("Connection Ignore successfully",{
      autoClose:1500
    });
  }
  const index = allconnection.value.findIndex((i) => i._id == e);
  allconnection.value.splice(index, 1);
  await getconnectionn();
  await Totalno();
  await userconnection();
}
// ----------------------------Removeconnection---------------------------------//

async function removeconnection(e) {
  let deletepostee = await DeleteData(`removeConnection?userId=${e}`);
  toast.success("Connection Remove successfully",{
    autoClose:1500
  });
  await Totalno();
  const index = allconnection1.value.findIndex((i) => i._id == e);
  allconnection1.value.splice(index, 1);
}
</script>
<template>
  <div>
    <div class="lg:flex flex-wrap justify-center px-2">
      <div>
        <ManageConnection
          :data1="allconnectionNo"
          :post="allconnection1"
          :remove="removeconnection"
        />
      </div>
      <div>
        <ManageInvitations
          :data="allconnection"
          :getaccept="getaccept"
        />
      </div>
    </div>
  </div>

</template>



