import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route shows DashboardScreen */}
        <Route path="/" element={<DashboardScreen />} />
        {/* You can add more routes later */}
      </Routes>
    </Router>
  );
}

export default App;