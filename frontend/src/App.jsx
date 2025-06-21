import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DriverPanel from "./components/DriverPanel";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import UserLogin from "./components/UserLogin/UserLogin"
import UserRegistration from "./components/UserRegistration/UserRegistration";
import UserHome from "./components/UserHome/UserHome";
import UserMainHome from "./components/UserMainHome/UserMainHome";
// import NewPage from "./components/NewPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/driver" element={<DriverPanel />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/userhomemain" element={<UserMainHome />} />
        
        <Route path="/" element={<UserLogin />} />
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
