function HomeView() {
  return (
    <section className="grid">
      <article className="card">
        <h2>Approvals</h2>
        <p>Review and complete workflow-driven approvals.</p>
      </article>
      <article className="card">
        <h2>Incidents</h2>
        <p>Inspect command/safety incidents and delivery state.</p>
      </article>
      <article className="card">
        <h2>Reissue</h2>
        <p>Run cancel-and-reissue with lineage visibility.</p>
      </article>
      <article className="card">
        <h2>Governance</h2>
        <p>View queue pressure, SLA breaches, and policy posture.</p>
      </article>
    </section>
  );
}

export default HomeView;
