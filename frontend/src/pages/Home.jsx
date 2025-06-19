import { useState } from "react";
import RequestPickupForm from "../components/RequestPickupForm";
import PartnerForm from "../components/PartnerForm";
import "./Home.css";

export default function Home() {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <>
      <div className="home-container">
        <div className="top-cards">
          <div
            className="small-card"
            onClick={() => (window.location.href = "/admin")}
          >
            Admin
          </div>
          <div
            className="small-card"
            onClick={() => (window.location.href = "/driver")}
          >
            Driver
          </div>
        </div>
        <div className="home-home">
          <h1 className="home-home1">Enviro Track</h1>
          <p className="tagline">Smart Waste Management Starts Here</p>
        </div>
        <div className="card-container">
          <div className="form-card" onClick={() => setActiveForm("pickup")}>
            <h3>Request Waste Pickup</h3>
            <p>
              Schedule a convenient pickup of your waste with just a few clicks.
            </p>
          </div>
          <div className="form-card" onClick={() => setActiveForm("partner")}>
            <h3>Become a Partner</h3>
            <p>Join our mission in managing waste smartly and sustainably.</p>
          </div>
        </div>

        <div className="form-display">
          {activeForm === "pickup" && <RequestPickupForm />}
          {activeForm === "partner" && <PartnerForm />}
        </div>
      </div>
      
    </>
  );
}
