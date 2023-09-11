<script setup>
const props = defineProps(['id','title','skillerror'])
const inputskill = ref("")
</script>

<template>
<modal :id="id" :title="title">
<form @submit.prevent="addskill">
        <label for="" class="font-bold my-1 ps-1">Add skill*</label>
        <input
          class="form-control border-2"
          placeholder="Add skill"
          v-model="inputskill"
          cols="30"
          rows="10"
        />
        <p class="text-red-600 pt-1 absolute" v-if="skillerror">{{ skillerror }}</p>
        <div v-if="inputskill.trim()" class="py-2 ">
          <button
            data-bs-dismiss="modal"
            class="float-right rounded border-2 hover:bg-blue-600 btn btn-outline-dark hover:text-white px-3 py-1 border-primary  font-bold"
            @click="submitSkill"
          >
            Save
          </button>
        </div>
        <div v-else class="py-4 ">
          <button
            class="float-right rounded border-2 hover:bg-blue-600 btn btn-outline-dark hover:text-white px-3 py-1 border-primary  font-bold "
          >
            Save
          </button>
        </div>
      </form>
</modal>
    
</template>