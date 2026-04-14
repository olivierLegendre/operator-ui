import { useEffect, useState } from "react";

import { listReissueCandidates, reissueCommand, type ReissueCandidate } from "../services/api";

function ReissueView() {
  const [items, setItems] = useState<ReissueCandidate[]>([]);
  const [message, setMessage] = useState("");

  const refresh = async () => {
    setItems(await listReissueCandidates("site-1"));
  };

  const onReissue = async (commandId: string) => {
    const ok = await reissueCommand(commandId, "reissue requested from operator-ui");
    setMessage(ok ? `Reissued ${commandId}` : `Failed to reissue ${commandId}`);
    await refresh();
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <section className="card">
      <h2>Reissue</h2>
      <p>Failed commands eligible for reissue with lineage tracking.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Command</th>
            <th>Parent</th>
            <th>Status</th>
            <th>Site</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={5}>No reissue candidates.</td>
            </tr>
          )}
          {items.map((item) => (
            <tr key={item.command_id}>
              <td>{item.command_id}</td>
              <td>{item.parent_command_id ?? "-"}</td>
              <td>{item.status}</td>
              <td>{item.site_id}</td>
              <td>
                <button onClick={() => void onReissue(item.command_id)}>Reissue</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{message}</p>
    </section>
  );
}

export default ReissueView;
