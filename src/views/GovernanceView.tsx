import { useEffect, useState } from "react";

import { getGovernanceSnapshot, type GovernanceSnapshot } from "../services/api";

function GovernanceView() {
  const [snapshot, setSnapshot] = useState<GovernanceSnapshot>({
    site_id: "site-1",
    queueDepth: 0,
    slaBreaches24h: 0,
    rejected50324h: 0,
  });

  useEffect(() => {
    const run = async () => {
      setSnapshot(await getGovernanceSnapshot("site-1"));
    };
    void run();
  }, []);

  return (
    <section className="grid">
      <article className="card">
        <h2>Queue depth</h2>
        <p>{snapshot.queueDepth}</p>
      </article>
      <article className="card">
        <h2>SLA breaches (24h)</h2>
        <p>{snapshot.slaBreaches24h}</p>
      </article>
      <article className="card">
        <h2>503 rejected (24h)</h2>
        <p>{snapshot.rejected50324h}</p>
      </article>
      <article className="card">
        <h2>Site scope</h2>
        <p>{snapshot.site_id}</p>
      </article>
    </section>
  );
}

export default GovernanceView;
