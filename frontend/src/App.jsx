import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DriverPanel from "./components/DriverPanel";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driver" element={<DriverPanel />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
