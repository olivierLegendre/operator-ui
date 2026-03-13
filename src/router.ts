import { createRouter, createWebHistory } from "vue-router";

import ApprovalsView from "./views/ApprovalsView.vue";
import GovernanceView from "./views/GovernanceView.vue";
import HomeView from "./views/HomeView.vue";
import IncidentsView from "./views/IncidentsView.vue";
import ReissueView from "./views/ReissueView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/approvals", name: "approvals", component: ApprovalsView },
    { path: "/incidents", name: "incidents", component: IncidentsView },
    { path: "/reissue", name: "reissue", component: ReissueView },
    { path: "/governance", name: "governance", component: GovernanceView }
  ]
});
