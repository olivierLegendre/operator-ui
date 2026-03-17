<template>
  <section class="card">
    <h2>Reissue</h2>
    <p>Failed commands eligible for reissue with lineage tracking.</p>
    <table class="table">
      <thead><tr><th>Command</th><th>Parent</th><th>Status</th><th>Site</th><th>Action</th></tr></thead>
      <tbody>
        <tr v-if="items.length === 0"><td colspan="5">No reissue candidates.</td></tr>
        <tr v-for="item in items" :key="item.command_id">
          <td>{{ item.command_id }}</td>
          <td>{{ item.parent_command_id ?? '-' }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.site_id }}</td>
          <td><button @click="onReissue(item.command_id)">Reissue</button></td>
        </tr>
      </tbody>
    </table>
    <p>{{ message }}</p>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { listReissueCandidates, reissueCommand, type ReissueCandidate } from "../services/api";

const items = ref<ReissueCandidate[]>([]);
const message = ref("");

async function refresh(): Promise<void> {
  items.value = await listReissueCandidates("site-1");
}

async function onReissue(commandId: string): Promise<void> {
  const ok = await reissueCommand(commandId, "reissue requested from operator-ui");
  message.value = ok ? `Reissued ${commandId}` : `Failed to reissue ${commandId}`;
  await refresh();
}

onMounted(async () => {
  await refresh();
});
</script>
