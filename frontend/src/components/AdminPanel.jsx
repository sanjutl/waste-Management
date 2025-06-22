import { useEffect, useState } from "react";
import { api } from "../api";
import "./AdminPanel.css";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [partners, setPartners] = useState([]);
  const [pickups, setPickups] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    fetchPartners();
    fetchPickups();
  }, []);

  const fetchPartners = async () => {
    const res = await api.get("/partners/pending");
    setPartners(res.data);
  };

  const fetchPickups = async () => {
    const res = await api.get("/pickups?status=Pending");
    setPickups(res.data);
  };

  const approvePartner = async (id) => {
    await api.put(`/partners/approve/${id}`);
    fetchPartners();
  };

  const logout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    window.location.href = "/";
  };

  return (
    <div className="admin-container">
      <div className="top-bar">
        <div>
          <button
            className="nav-btn"
            onClick={() => navigate("/userlist")}
          >
            USER
          </button>
          <button
            className="nav-btn"
            onClick={() => navigate("/driverregister")}
          >
            DRIVER
          </button>
        </div>
        <button className="nav-btn" onClick={logout}>
          LOGOUT
        </button>
      </div>

      {/* Partner Requests Section */}
      <h2 className="section-title">Pending Partner Requests</h2>
      <div className="partner-list">
        {partners.map((p) => (
          <div key={p._id} className="partner-card">
            <h3>{p.companyName}</h3>
            <p>
              <strong>Email:</strong> {p.email}
            </p>
            <p>
              <strong>Contact Person:</strong> {p.contactPerson}
            </p>
            <p>
              <strong>Area:</strong> {p.serviceArea}
            </p>
            <p>
              <strong>Services:</strong> {p.services.join(", ")}
            </p>
            {p.additionalInfo && (
              <p>
                <strong>Note:</strong> {p.additionalInfo}
              </p>
            )}
            <button
              className="approve-btn"
              onClick={() => approvePartner(p._id)}
            >
              Approve
            </button>
          </div>
        ))}
      </div>

      {/* Pickup Requests Section */}
      <h2 className="section-title">Pending Pickup Requests</h2>
      <div className="pickup-list">
        {pickups.map((p) => (
          <div key={p._id} className="pickup-card">
            <h3>{p.wasteType}</h3>
            <p>
              <strong>Address:</strong> {p.address}
            </p>
            <p>
              <strong>Time:</strong> {p.pickupTime}
            </p>
            <p>
              <strong>Payment:</strong> {p.paymentMethod}
            </p>
            <p className={`status ${p.status.toLowerCase()}`}>
              <strong>Status:</strong> {p.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
