<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg" id="navbar">
    <div class="container-lg">
      <a class="navbar-brand" href="#">Prelim Project</a>
    </div>
  </nav>
  
<RouterView />
</template>

<style scoped>
#navbar {
  background-color: 	#4682B4 !important;
}
</style>