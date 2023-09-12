<script setup>
definePageMeta({
  middleware: "auth",
});

</script>
<template>
  <div>
    <div class="lg:flex flex-wrap justify-center">
      <div>
        <ProfileHeader  />
        <ProfileActivity /> 
        <ProfileAbout  />
        <ProfileProject  />
        <ProfileExperience  />
        <ProfileEducation />
        <!-- <ProfileRecomdation/> -->
        <ProfileCourse/>
        <ProfileHonor  />
        <ProfileSkill  />
        <ProfileLang />
      </div>
      <div>
        <SidebarImg class="sticky top-20 "/>
      </div>
    </div>
  </div>
</template>
