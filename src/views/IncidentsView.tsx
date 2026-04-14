import { useEffect, useState } from "react";

import { listIncidents, type IncidentItem } from "../services/api";

function IncidentsView() {
  const [items, setItems] = useState<IncidentItem[]>([]);

  useEffect(() => {
    const run = async () => {
      setItems(await listIncidents());
    };
    void run();
  }, []);

  return (
    <section className="card">
      <h2>Incidents</h2>
      <p>Incident feed with severity and reason context.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Incident</th>
            <th>Site</th>
            <th>Severity</th>
            <th>Reason</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={5}>No incidents.</td>
            </tr>
          )}
          {items.map((item) => (
            <tr key={item.event_id}>
              <td>{item.event_id}</td>
              <td>{item.site_id}</td>
              <td>
                <span className={item.severity === "critical" ? "badge badge-danger" : "badge"}>{item.severity}</span>
              </td>
              <td>{item.reason}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default IncidentsView;
