import { useEffect, useState } from "react";
import { api } from "../api";
import "./DriverPanel.css";

export default function DriverPanel() {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    // Fetch only pending pickups
    api
      .get("/pickups?status=Pending")
      .then((res) => setPickups(res.data))
      .catch((err) => console.error("Failed to fetch pickups:", err));
  }, []);

  useEffect(() => {
    console.log("Fetched pickups:", pickups);
  }, [pickups]);

  const handleAccept = async (id) => {
    try {
      await api.patch(`/pickups/accept/${id}`);
      setPickups((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error accepting pickup", err);
    }
  };

  return (
    <div className="driver-container">
      <div className="top-bar">
        <button className="nav-btn" onClick={() => (window.location.href = "/")}>
          USER
        </button>
      </div>

      <h2 className="section-title">Pickup Requests</h2>

      <div className="pickup-list">
        {pickups.length === 0 ? (
          <p>No pickup requests at the moment.</p>
        ) : (
          pickups.map((p) => (
            <div key={p._id} className="pickup-card">
              <h3>{p.recyclable?.item || p.nonRecyclable?.item || "Waste"}</h3>
              <p><strong>Address:</strong> {p.address}</p>
              <p><strong>Time:</strong> {p.pickupTime}</p>
              <p><strong>Payment:</strong> {p.paymentMethod}</p>
              <p className={`status ${p.status.toLowerCase()}`}>
                <strong>Status:</strong> {p.status}
              </p>

              <div className="pickup-actions">
                <button onClick={() => handleAccept(p._id)} className="accept-btn">
                  Accept
                </button>

                {p.phone && (
                  <div className="whatsapp-btn">
                    <a
                      href={`https://wa.me/91${p.userPhone}?text=Hello%2C%20I%20have%20a%20question%20about%20your%20pickup%20request.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-whatsapp"></i> Chat with User
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
