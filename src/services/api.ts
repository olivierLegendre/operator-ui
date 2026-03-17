export type ApprovalItem = {
  run_id: string;
  site_id: string;
  scenario_key: string;
  status: "running" | "completed";
  correlation_id: string;
  outcome: "approved" | "rejected" | null;
};

export type IncidentItem = {
  event_id: string;
  site_id: string;
  severity: "info" | "warning" | "critical";
  reason: string;
  created_at: string;
};

export type ReissueCandidate = {
  command_id: string;
  parent_command_id: string | null;
  status: string;
  site_id: string;
};

export type GovernanceSnapshot = {
  site_id: string;
  queueDepth: number;
  slaBreaches24h: number;
  rejected50324h: number;
};

const automationBase = import.meta.env.VITE_AUTOMATION_API_BASE ?? "http://localhost:8102";
const routerBase = import.meta.env.VITE_CHANNEL_ROUTER_API_BASE ?? "http://localhost:8103";

function bearerHeader(): HeadersInit {
  const token = window.localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return fallback;
    }
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export async function listApprovals(siteId: string): Promise<ApprovalItem[]> {
  const body = await safeFetch<{ items: ApprovalItem[] }>(
    `${automationBase}/api/v1/workflows/runs?site_id=${encodeURIComponent(siteId)}&limit=25`,
    { items: [] }
  );
  return body.items;
}

export async function completeApprovalTask(
  runId: string,
  actorUserId: string,
  decision: "approved" | "rejected",
  comment: string
): Promise<boolean> {
  const response = await fetch(`${automationBase}/api/v1/workflows/runs/${runId}/tasks/manual_approval/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader()
    },
    body: JSON.stringify({ actor_user_id: actorUserId, decision, comment })
  });
  return response.ok;
}

export async function listIncidents(): Promise<IncidentItem[]> {
  return safeFetch<IncidentItem[]>(`${routerBase}/api/v1/incidents/hooks?limit=25`, []);
}

export async function listReissueCandidates(siteId: string): Promise<ReissueCandidate[]> {
  const body = await safeFetch<{ items: ReissueCandidate[] }>(
    `${routerBase}/api/v1/commands?site_id=${encodeURIComponent(siteId)}&status=failed&limit=25`,
    { items: [] }
  );
  return body.items;
}

export async function reissueCommand(commandId: string, reason: string): Promise<boolean> {
  const response = await fetch(`${routerBase}/api/v1/commands/${commandId}/reissue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader()
    },
    body: JSON.stringify({ actor_role: "org_admin", reason })
  });
  return response.ok;
}

export async function getGovernanceSnapshot(siteId: string): Promise<GovernanceSnapshot> {
  const body = await safeFetch<Partial<GovernanceSnapshot>>(
    `${routerBase}/api/v1/governance/snapshot?site_id=${encodeURIComponent(siteId)}`,
    {}
  );
  return {
    site_id: siteId,
    queueDepth: body.queueDepth ?? 0,
    slaBreaches24h: body.slaBreaches24h ?? 0,
    rejected50324h: body.rejected50324h ?? 0
  };
}
