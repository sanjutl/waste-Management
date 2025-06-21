import React, { useState } from "react";
import styles from "./UserMainHome.module.css";
import doctorImg from "../../assets/pic.jpg";
import UserNav from "../UserNav/UserNav";
import WastePickUp from "../WastePickUp/WastePickUp";
import qr from "../../assets/qr.png"; // If needed for payment scan
import axios from "axios";

function UserMainHome() {
  const [pickUpForm, setPickUpForm] = useState(false);

  const [recyclableItem, setRecyclableItem] = useState("");
  const [recyclableKg, setRecyclableKg] = useState("");
  const [nonRecyclableItem, setNonRecyclableItem] = useState("");
  const [nonRecyclableKg, setNonRecyclableKg] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const [form, setForm] = useState({
    address: "",
    pickupTime: "",
    phone: "",
    paymentMethod: "",
  });

  const rates = {
    recyclable: {
      plastic: 10,
      iron: 20,
      paper: 10,
      clothes: 5,
    },
    nonRecyclable: {
      "medical waste": 1,
      "e-waste": 1,
      "clinic waste": 1,
      "glass waste": 1,
    },
  };

  const priceUser = recyclableKg * (rates.recyclable[recyclableItem] || 0);
  const priceDriver =
    nonRecyclableKg * (rates.nonRecyclable[nonRecyclableItem] || 0);
  const driverAmount = priceDriver;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecyclableItemChange = (value) => setRecyclableItem(value);
  const handleRecyclableKgChange = (value) => setRecyclableKg(value);
  const handleNonRecyclableItemChange = (value) => setNonRecyclableItem(value);
  const handleNonRecyclableKgChange = (value) => setNonRecyclableKg(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pickup form submitted:", {
      ...form,
      recyclableItem,
      recyclableKg,
      nonRecyclableItem,
      nonRecyclableKg,
    });

    if (form.paymentMethod === "UPI") {
      setShowScanner(true);
    } else {
      alert("Pickup request submitted successfully!");
      setPickUpForm(false);
    }
  };
  const submitPickupRequest = async () => {
    try {
      const payload = {
        address: form.address,
        pickupTime: form.pickupTime,
        phone: form.phone,
        paymentMethod: form.paymentMethod,
        recyclableItem,
        recyclableKg,
        nonRecyclableItem,
        nonRecyclableKg,
      };

      const response = await axios.post(
        "http://localhost:5000/api/pickups",
        payload
      );

      if (response.status === 201) {
        alert("Pickup request submitted successfully!");
        setPickUpForm(false);
        setShowScanner(false);
        // optionally reset form here
      } else {
        alert("Failed to submit pickup request.");
      }
    } catch (error) {
      console.error("Error submitting pickup:", error);
      alert("Error submitting pickup request. Please try again.");
    }
  };
  return (
    <>
      <UserNav />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h5>We Are Here For a Cleaner Tomorrow</h5>
            <h1>
              Smart Disposal &<br />
              Sustainable Solutions
            </h1>
            <p>
              Connected Waste empowers individuals, businesses, and communities
              with efficient waste collection, recycling, and disposal services—
              all from a single platform.
            </p>
            <div className={styles.oderButton}>
              <button onClick={() => setPickUpForm(true)}>
                Place An Order
              </button>
            </div>
          </div>
          <div className={styles.imageSection}>
            <img src={doctorImg} alt="Smart Waste Service" />
          </div>
        </div>
      </div>

      {pickUpForm && (
        <WastePickUp
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          form={form}
          handleRecyclableItemChange={handleRecyclableItemChange}
          handleRecyclableKgChange={handleRecyclableKgChange}
          handleNonRecyclableItemChange={handleNonRecyclableItemChange}
          handleNonRecyclableKgChange={handleNonRecyclableKgChange}
          recyclableItem={recyclableItem}
          recyclableKg={recyclableKg}
          nonRecyclableItem={nonRecyclableItem}
          nonRecyclableKg={nonRecyclableKg}
          rates={rates}
          priceUser={priceUser}
          priceDriver={priceDriver}
          showScanner={showScanner}
          setShowScanner={setShowScanner}
          driverAmount={driverAmount}
          onClose={() => setPickUpForm(false)}
        />
      )}
    </>
  );
}

export default UserMainHome;
