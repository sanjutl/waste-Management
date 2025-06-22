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
import UserOrder from "./components/UserOrder/UserOrder";
// import NewPage from "./components/NewPage";
import DriveHome from "./components/DriverHomePage/DriveHome";
import UserList from "./components/UserList";
import Driverregister from "./components/Driverregister";
import PartnerRegister from "./components/PartnerRegister/PartnerRegister";
import PartnerandOrders from "./components/PartnerandOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/driver" element={<DriverPanel />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/" element={<UserHome />} />
        <Route path="/userhomemain/:userId" element={<UserMainHome />} />
        <Route path="/userorder/:userId" element={<UserOrder />} />
        <Route path="/driver/:userName" element={<DriveHome />} />
        <Route path="/partner-register" element={<PartnerRegister />} />




        {/* <Route path="/" element={<UserLogin />} /> */}
        <Route path="/userreg" element={<UserRegistration />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/driverregister" element={<Driverregister />} />
        <Route path="/admindash" element={<PartnerandOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
