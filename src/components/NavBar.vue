<template>
  <nav class="card nav">
    <RouterLink v-for="link in links" :key="link.href" :to="link.href">{{ link.label }}</RouterLink>
  </nav>
</template>

<script setup lang="ts">
const links = [
  { href: "/", label: "Overview" },
  { href: "/approvals", label: "Approvals" },
  { href: "/incidents", label: "Incidents" },
  { href: "/reissue", label: "Reissue" },
  { href: "/governance", label: "Governance" }
];
</script>
