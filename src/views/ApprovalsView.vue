<template>
  <section class="card">
    <h2>Approvals</h2>
    <p>Workflow runs waiting for user actions (site scope).</p>
    <table class="table">
      <thead><tr><th>Run</th><th>Scenario</th><th>Status</th><th>Correlation</th></tr></thead>
      <tbody>
        <tr v-if="items.length === 0"><td colspan="4">No approval items.</td></tr>
        <tr v-for="item in items" :key="item.runId">
          <td>{{ item.runId }}</td><td>{{ item.scenarioKey }}</td><td><span class="badge">{{ item.status }}</span></td><td>{{ item.correlationId }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { listApprovals, type ApprovalItem } from "../services/api";

const items = ref<ApprovalItem[]>([]);

onMounted(async () => {
  items.value = await listApprovals("site-1");
});
</script>
