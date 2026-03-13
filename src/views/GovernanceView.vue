<template>
  <section class="grid">
    <article class="card"><h2>Queue depth</h2><p>{{ snapshot.queueDepth }}</p></article>
    <article class="card"><h2>SLA breaches (24h)</h2><p>{{ snapshot.slaBreaches24h }}</p></article>
    <article class="card"><h2>503 rejected (24h)</h2><p>{{ snapshot.rejected50324h }}</p></article>
    <article class="card"><h2>Site scope</h2><p>{{ snapshot.siteId }}</p></article>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getGovernanceSnapshot, type GovernanceSnapshot } from "../services/api";

const snapshot = ref<GovernanceSnapshot>({
  siteId: "site-1",
  queueDepth: 0,
  slaBreaches24h: 0,
  rejected50324h: 0
});

onMounted(async () => {
  snapshot.value = await getGovernanceSnapshot("site-1");
});
</script>
