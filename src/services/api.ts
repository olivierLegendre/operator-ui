export type ApprovalItem = {
  runId: string;
  siteId: string;
  scenarioKey: string;
  status: "running" | "completed";
  correlationId: string;
};

export type IncidentItem = {
  incidentId: string;
  siteId: string;
  severity: "info" | "warning" | "critical";
  reason: string;
  createdAt: string;
};

export type ReissueCandidate = {
  commandId: string;
  rootId: string;
  status: string;
  siteId: string;
};

export type GovernanceSnapshot = {
  siteId: string;
  queueDepth: number;
  slaBreaches24h: number;
  rejected50324h: number;
};

const automationBase = import.meta.env.VITE_AUTOMATION_API_BASE ?? "http://localhost:8102";
const routerBase = import.meta.env.VITE_CHANNEL_ROUTER_API_BASE ?? "http://localhost:8103";

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

export async function listIncidents(): Promise<IncidentItem[]> {
  const body = await safeFetch<{ items: IncidentItem[] }>(
    `${routerBase}/api/v1/incidents/hooks?limit=25`,
    { items: [] }
  );
  return body.items;
}

export async function listReissueCandidates(siteId: string): Promise<ReissueCandidate[]> {
  const body = await safeFetch<{ items: ReissueCandidate[] }>(
    `${routerBase}/api/v1/commands?site_id=${encodeURIComponent(siteId)}&status=held&limit=25`,
    { items: [] }
  );
  return body.items;
}

export async function getGovernanceSnapshot(siteId: string): Promise<GovernanceSnapshot> {
  const body = await safeFetch<Partial<GovernanceSnapshot>>(
    `${routerBase}/api/v1/governance/snapshot?site_id=${encodeURIComponent(siteId)}`,
    {}
  );
  return {
    siteId,
    queueDepth: body.queueDepth ?? 0,
    slaBreaches24h: body.slaBreaches24h ?? 0,
    rejected50324h: body.rejected50324h ?? 0
  };
}
