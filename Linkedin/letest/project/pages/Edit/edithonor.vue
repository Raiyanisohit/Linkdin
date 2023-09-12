<script setup>
definePageMeta({
  middleware: "auth",
});
import axios from "axios";
import {
  postdata,
  getconnection,
  DeleteData,
  UpdateData,
} from "../../services/api";
import { usemonthStore } from "../../store/Month";
import { useprofileStore } from "../../store/getprofile";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const storeid = useprofileStore();
const route = useRoute();
const store = usemonthStore();
const honortitle = ref("");
const honordescprition = ref("");
const honorassociatewith = ref("");
const honorissuer = ref("");
const honorissuerDateMonth = ref("");
const honorDateYear = ref("");
const honorerror = ref("");
const post = ref([]);
const router = useRouter();
// --------------------------------getHonorsAndAwars------------------------//

async function gethonor() {
  const honor = await getconnection("getHonorsAndAwars");
  post.value = honor.Message.reverse();
}
gethonor();

const deletid = ref("");

// --------------------------------------editmodal----------------------------//

function editmodal(id) {
  deletid.value = id;
  honortitle.value = post.value.find((i) => i._id == id).titel;
  honordescprition.value = post.value.find((i) => i._id == id).description;
  honorassociatewith.value = post.value.find((i) => i._id == id).associateWith;
  honorissuer.value = post.value.find((i) => i._id == id).issuer;
  honorissuerDateMonth.value = postdata.value.find(
    (i) => i._id == id
  ).issueDateMonth;
  honorDateYear.value = post.value.find((i) => i._id == id).issueDateYear;
}

// ---------------------------------editHonorsAndAwars----------------------------//

async function handlesubmithonor() {
  if (honortitle.value.trim() == "") {
    honorerror.value = "Title is Required";
  }
  if (honortitle.value.trim() != "") {
    const data = JSON.stringify({
      id: deletid.value,
      titel: honortitle.value,
      description: honordescprition.value,
      associateWith: honorassociatewith.value,
      issuer: honorissuer.value,
      issueDateMonth: honorissuerDateMonth.value,
      issueDateYear: honorDateYear.value,
    });
    const updatedata = await UpdateData("editHonorsAndAwars", data);
    toast.success("Honor & Awards updated Successfully", {
      autoClose: 1500,
    });
    await gethonor();
  }
}

// ---------------------------------deleteHonorsAndAwards----------------------------//

async function removehonor() {
  const deletdata = await DeleteData(
    `deleteHonorsAndAwards?id=${deletid.value}`
  );
  toast.success("Project deleted successfully", {
    autoClose: 1500,
  });
  await gethonor();
}
</script>
<template>
  <div class="flex justify-center">
    <div
      href="#"
      class="block mt-2 bg-white lg:me-7 border border-gray-200 mx-2 w-[780px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="pe-4 flex justify-between py-2">
        <div class="flex">
          <button>
            <img
              class="w-[50px] me-2"
              @click="router.push('/profile')"
              src="https://cdn-icons-png.flaticon.com/128/5720/5720446.png"
              alt=""
            />
          </button>
          <p class="text-[25px] pt-2 font-bold font-ui-sans-serif,">
            Honor & Award
          </p>
        </div>
      </div>

      <div class="pl-6 flex justify-between" v-for="honor in post" :key="honor">
        <ul class="py-2">
          <li class="text-[17px] font-bold">{{ honor.titel }}</li>
          <li v-if="honor.associateWith" class="text-[16px]">
            associateWith :{{ honor.associateWith }}
          </li>
          <li v-if="honor.issuer" class="text-[16px]">
            issuer:{{ honor.issuer }}
          </li>
          <li class="text-[16px]">{{ honor.description }}</li>
          <li class="text-[16px]">
            {{ honor.issueDateMonth }}{{ honor.issueDateYear }}
          </li>
        </ul>
        <ul>
          <li class="pe-5 hover:cursor-pointer">
            <p
              @click="editmodal(honor._id)"
              class="w-5 ms-2"
              data-bs-toggle="modal"
              data-bs-target="#honor"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/61/61456.png"
                alt=""
              />
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <modal id="honor" title=" Edit Honor & Award">
    <form @submit.prevent="handlesubmithonor">
      <p class="text-xs mb-2">* Indicates required</p>
      <div class="mb-3">
        <label for="recipient-name" class="col-form-label font-bold"
          >Title *</label
        >
        <input
          v-model="honortitle"
          class="form-control border-2"
          id="recipient-name"
        />
        <p class="text-red-500 absolute">{{ honorerror }}</p>
      </div>
      <div>
        <label for="recipient-name" class="col-form-label font-bold"
          >AssociateWith
        </label>
        <input
          v-model="honorassociatewith"
          class="form-control border-2"
          id="recipient-name"
        />
      </div>
      <div>
        <label for="recipient-name" class="col-form-label font-bold"
          >Descprition
        </label>
        <textarea
          v-model="honordescprition"
          class="form-control border-2"
          id="recipient-name"
          rows="3"
        />
      </div>

      <div>
        <label for="recipient-name" class="col-form-label font-bold"
          >Issuer
        </label>
        <input
          v-model="honorissuer"
          class="form-control border-2"
          id="recipient-name"
        />
      </div>

      <div class="mb-3">
        <label for="message-text" class="col-form-label font-bold"
          >Start date
        </label>
        <div class="flex">
          <div class="w-full pe-2">
            <select
              v-model="honorissuerDateMonth"
              class="form-control border-2"
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="list in store.month" :key="list" :value="list">
                {{ list }}
              </option>
            </select>
            <p class="text-red-500">{{ honorerror.issueDateMonth }}</p>
          </div>
          <div class="w-full">
            <select
              v-model="honorDateYear"
              class="form-control border-2"
              name=""
              id=""
            >
              <option value="" disabled>Select option</option>
              <option v-for="list in store.year" :key="list" :value="list">
                {{ list }}
              </option>
            </select>
            <p class="text-red-500">{{ honorerror.issueDateYear }}</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="py-3 flex justify-between">
        <div
          data-bs-dismiss="modal"
          data-bs-toggle="modal"
          data-bs-target="#deletehonor"
          class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700 px-3 py-1 border-danger font-bold"
        >
          DELETE
        </div>
        <button
          v-if="honortitle.trim()"
          data-bs-dismiss="modal"
          class="me-1 float-right text-white rounded border-2 bg-green-600 hover:bg-green-700 px-3 py-1 border-success font-bold"
        >
          SAVE
        </button>
        <button
          v-else
          class="me-1 float-right text-white rounded border-2 bg-green-600 hover:bg-green-700 px-3 py-1 border-success font-bold"
        >
          SAVE
        </button>
      </div>
    </form>
  </modal>

  <deletmodal id="deletehonor" title="Delete Honor & Award?">
    <ul class="justify-between">
      <li class="text-[18px] pb-3">
        Are you sure you want to delete your {{ honortitle }} honor?
      </li>
    </ul>
    <button
      data-bs-dismiss="modal"
      @click="removehonor()"
      class="me-1 float-right text-white rounded border-2 bg-red-600 hover:bg-red-700 px-3 py-1 border-danger font-bold"
    >
      DELETE
    </button>
    <button
      data-bs-dismiss="modal"
      class="me-1 float-right border-dark rounded border-2 hover:bg-blue-400 px-3 py-1 font-bold"
    >
      No thanks
    </button>
  </deletmodal>
</template>
