<template>
  <main>
    <h1>Operator UI</h1>
    <p>API-only operational workflows (no direct SQL access).</p>
    <NavBar />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>
