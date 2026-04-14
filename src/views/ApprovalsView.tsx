import { useEffect, useState } from "react";

import { completeApprovalTask, listApprovals, type ApprovalItem } from "../services/api";

function ApprovalsView() {
  const [items, setItems] = useState<ApprovalItem[]>([]);
  const [message, setMessage] = useState("");

  const refresh = async () => {
    setItems(await listApprovals("site-1"));
  };

  const transition = async (runId: string, decision: "approved" | "rejected") => {
    const ok = await completeApprovalTask(runId, "ui-actor", decision, `Decision from UI: ${decision}`);
    setMessage(ok ? `Task ${decision} for ${runId}` : `Failed to ${decision} ${runId}`);
    await refresh();
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <section className="card">
      <h2>Approvals</h2>
      <p>Workflow runs waiting for user actions (site scope).</p>
      <table className="table">
        <thead>
          <tr>
            <th>Run</th>
            <th>Scenario</th>
            <th>Status</th>
            <th>Correlation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={5}>No approval items.</td>
            </tr>
          )}
          {items.map((item) => (
            <tr key={item.run_id}>
              <td>{item.run_id}</td>
              <td>{item.scenario_key}</td>
              <td>
                <span className="badge">{item.status}</span>
              </td>
              <td>{item.correlation_id}</td>
              <td>
                <button onClick={() => void transition(item.run_id, "approved")} disabled={item.status === "completed"}>
                  Approve
                </button>
                <button onClick={() => void transition(item.run_id, "rejected")} disabled={item.status === "completed"}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{message}</p>
    </section>
  );
}

export default ApprovalsView;
