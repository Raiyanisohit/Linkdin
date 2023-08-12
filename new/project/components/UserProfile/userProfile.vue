
<script setup>
const props = defineProps(["post"]);
</script>
<template>
  <div v-if="post">
    <div class="lg:flex flex-wrap justify-center">
      <div>
        <profileHeader :post="post ? post : ''" />
        <profileActivity :post="post ? post : ''"/>
        <profileAbout :post="post ? post : ''" />
        <profileproject :post="post ? post : ''" />
        <profileExperience :post="post ? post : ''" />
        <profileEducation :post="post ? post : ''" />
        <profileHonor :post="post ? post : ''" />
        <profileSkill :post="post ? post : ''" />
      </div>
      <div>
        <profileLanguage />
        <sidebarImg />
      </div>
    </div>
  </div>
</template>
