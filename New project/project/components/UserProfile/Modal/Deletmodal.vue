<script setup>
const props = defineProps(['id','title'])
console.log(props.id)
</script>

<template>
     <div
    class="modal"
    :id="id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content lg:w-[700px]">
          <div class="modal-header">
           <header>
            <h5 class="modal-title text-2xl font-bold font-serif" id="exampleModalLabel">
            {{title}}
            </h5>
          </header>
            <button class="float-right" type="button" data-bs-dismiss="modal">
              <img
                class="w-8"
                src="https://cdn-icons-png.flaticon.com/128/10412/10412365.png"
                alt=""
              />
            </button>
          </div>
          <hr>
          <div class="modal-body">
           <slot>
           </slot>
          </div>
        </div>
    </div>
  </div>
</template>