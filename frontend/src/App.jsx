import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BulkPredict from "./pages/BulkPredict";
<Route path="/bulk" element={<BulkPredict />} />


export default function App() {
  const [logged, setLogged] = useState(false);

  return logged ? (
    <Dashboard />
  ) : (
    <Login onLogin={() => setLogged(true)} />
  );
}
