<template>
  <section class="card">
    <h2>Incidents</h2>
    <p>Incident feed with severity and reason context.</p>
    <table class="table">
      <thead><tr><th>Incident</th><th>Site</th><th>Severity</th><th>Reason</th><th>Created</th></tr></thead>
      <tbody>
        <tr v-if="items.length === 0"><td colspan="5">No incidents.</td></tr>
        <tr v-for="item in items" :key="item.event_id">
          <td>{{ item.event_id }}</td><td>{{ item.site_id }}</td>
          <td><span :class="item.severity === 'critical' ? 'badge badge-danger' : 'badge'">{{ item.severity }}</span></td>
          <td>{{ item.reason }}</td><td>{{ item.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { listIncidents, type IncidentItem } from "../services/api";

const items = ref<IncidentItem[]>([]);

onMounted(async () => {
  items.value = await listIncidents();
});
</script>
