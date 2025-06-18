import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DriverPanel from "./components/DriverPanel";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import UserLogin from "./components/UserLogin/UserLogin"
import UserRegistration from "./components/UserRegistration/UserRegistration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driver" element={<DriverPanel />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userreg" element={<UserRegistration />} />
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
