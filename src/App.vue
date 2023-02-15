<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg" id="navbar">
    <div class="container-lg">
      <RouterLink class="navbar-brand" to="/" style="margin-left: 250px;">IT Department Task Board</RouterLink>
    </div>
    <div class="navbar-collapse ms-5" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/employees">Employees</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  
<RouterView />
</template>

<style scoped>
#navbar {
  background-color: 	#4682B4 !important;
}
</style>