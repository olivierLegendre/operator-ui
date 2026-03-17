<template>
  <section class="card">
    <h2>Approvals</h2>
    <p>Workflow runs waiting for user actions (site scope).</p>
    <table class="table">
      <thead><tr><th>Run</th><th>Scenario</th><th>Status</th><th>Correlation</th><th>Action</th></tr></thead>
      <tbody>
        <tr v-if="items.length === 0"><td colspan="5">No approval items.</td></tr>
        <tr v-for="item in items" :key="item.run_id">
          <td>{{ item.run_id }}</td>
          <td>{{ item.scenario_key }}</td>
          <td><span class="badge">{{ item.status }}</span></td>
          <td>{{ item.correlation_id }}</td>
          <td>
            <button @click="transition(item.run_id, 'approved')" :disabled="item.status === 'completed'">Approve</button>
            <button @click="transition(item.run_id, 'rejected')" :disabled="item.status === 'completed'">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>{{ message }}</p>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { completeApprovalTask, listApprovals, type ApprovalItem } from "../services/api";

const items = ref<ApprovalItem[]>([]);
const message = ref("");

async function refresh(): Promise<void> {
  items.value = await listApprovals("site-1");
}

async function transition(runId: string, decision: "approved" | "rejected"): Promise<void> {
  const ok = await completeApprovalTask(runId, "ui-actor", decision, `Decision from UI: ${decision}`);
  message.value = ok ? `Task ${decision} for ${runId}` : `Failed to ${decision} ${runId}`;
  await refresh();
}

onMounted(async () => {
  await refresh();
});
</script>
