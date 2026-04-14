import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import ApprovalsView from "./views/ApprovalsView";
import GovernanceView from "./views/GovernanceView";
import HomeView from "./views/HomeView";
import IncidentsView from "./views/IncidentsView";
import ReissueView from "./views/ReissueView";

function App() {
  return (
    <main>
      <h1>Operator UI</h1>
      <p>API-only operational workflows (no direct SQL access).</p>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/approvals" element={<ApprovalsView />} />
        <Route path="/incidents" element={<IncidentsView />} />
        <Route path="/reissue" element={<ReissueView />} />
        <Route path="/governance" element={<GovernanceView />} />
      </Routes>
    </main>
  );
}

export default App;
