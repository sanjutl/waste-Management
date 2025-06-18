import { useEffect, useState } from "react";
import { api } from "../api";
import "./DriverPanel.css";

export default function DriverPanel() {
  const [pickups, setPickups] = useState([]);

  // Fetch only "Pending" pickups
  useEffect(() => {
    api.get("/pickups?status=Pending").then((res) => setPickups(res.data));
  }, []);

  const handleAccept = async (id) => {
    try {
      await api.patch(`/pickups/accept/${id}`);
      // Remove from local state so it disappears
      setPickups((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error accepting pickup", err);
    }
  };
console.log(pickups);

  return (
    <div className="driver-container">
      <div className="top-bar">
        <button
          className="nav-btn"
          onClick={() => (window.location.href = "/")}
        >
          USER
        </button>
      </div>

      <h2 className="section-title">Pickup Requests</h2>
      <div className="pickup-list">
        {pickups.map((p) => (
          <div key={p._id} className="pickup-card">
            <h3>{p.wasteType}</h3>
            <p><strong>Address:</strong> {p.address}</p>
            <p><strong>Time:</strong> {p.pickupTime}</p>
            <p><strong>Payment:</strong> {p.paymentMethod}</p>
            <p className={`status ${p.status.toLowerCase()}`}>
              <strong>Status:</strong> {p.status}
            </p>
            <button onClick={() => handleAccept(p._id)} className="accept-btn">
              Accept
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
