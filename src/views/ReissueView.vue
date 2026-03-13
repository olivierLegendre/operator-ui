<template>
  <section class="card">
    <h2>Reissue</h2>
    <p>Held commands eligible for cancel-and-reissue with lineage tracking.</p>
    <table class="table">
      <thead><tr><th>Command</th><th>Root lineage</th><th>Status</th><th>Site</th></tr></thead>
      <tbody>
        <tr v-if="items.length === 0"><td colspan="4">No reissue candidates.</td></tr>
        <tr v-for="item in items" :key="item.commandId">
          <td>{{ item.commandId }}</td><td>{{ item.rootId }}</td><td>{{ item.status }}</td><td>{{ item.siteId }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { listReissueCandidates, type ReissueCandidate } from "../services/api";

const items = ref<ReissueCandidate[]>([]);

onMounted(async () => {
  items.value = await listReissueCandidates("site-1");
});
</script>
