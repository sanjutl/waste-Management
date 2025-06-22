import React, { useEffect, useState } from "react";
import styles from "./UserMainHome.module.css";
import doctorImg from "../../assets/pic.jpg";
import UserNav from "../UserNav/UserNav";
import WastePickUp from "../WastePickUp/WastePickUp";
import axios from "axios";
import { useParams } from "react-router-dom";
function UserMainHome() {
  const { userId } = useParams();
  console.log("oknjc", userId);

  const [pickUpForm, setPickUpForm] = useState(false);
  const [recyclableItem, setRecyclableItem] = useState("");
  const [recyclableKg, setRecyclableKg] = useState("");
  const [nonRecyclableItem, setNonRecyclableItem] = useState("");
  const [nonRecyclableKg, setNonRecyclableKg] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [driver, setDrivers] = useState([]);
  const [form, setForm] = useState({
    address: "",
    pickupTime: "",
    phone: "",
    paymentMethod: ""

  });
  const [selectedDriver, setSelectedDriver] = useState("");

  // Reset form and state
  const resetForm = () => {
    setForm({
      address: "",
      pickupTime: "",
      phone: "",
      paymentMethod: "",
    });
    setRecyclableItem("");
    setRecyclableKg("");
    setNonRecyclableItem("");
    setNonRecyclableKg("");
  };

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

  // Ensure numbers for calculation
  const priceUser =
    (parseFloat(recyclableKg) || 0) * (rates.recyclable[recyclableItem] || 0);
  const priceDriver =
    (parseFloat(nonRecyclableKg) || 0) *
    (rates.nonRecyclable[nonRecyclableItem] || 0);
  const driverAmount = priceDriver;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecyclableItemChange = (value) => setRecyclableItem(value);
  const handleRecyclableKgChange = (value) => setRecyclableKg(value);
  const handleNonRecyclableItemChange = (value) => setNonRecyclableItem(value);
  const handleNonRecyclableKgChange = (value) => setNonRecyclableKg(value);

  const validateForm = () => {
    if (
      !form.address ||
      !form.pickupTime ||
      !form.phone ||
      !form.paymentMethod
    ) {
      alert("All fields are required.");
      return false;
    }
    // Validate at least one waste entry
    if (
      (!recyclableItem || !recyclableKg) &&
      (!nonRecyclableItem || !nonRecyclableKg)
    ) {
      alert("Please provide at least one waste entry.");
      return false;
    }
    if (recyclableKg && (isNaN(recyclableKg) || Number(recyclableKg) <= 0)) {
      alert("Recyclable KG must be a positive number.");
      return false;
    }
    if (
      nonRecyclableKg &&
      (isNaN(nonRecyclableKg) || Number(nonRecyclableKg) <= 0)
    ) {
      alert("Non-recyclable KG must be a positive number.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (form.paymentMethod === "UPI") {
      setShowScanner(true);
    } else {
      submitPickupRequest();
    }
  };
  useEffect(() => {
    getDrivers();
  }, []);
  const getDrivers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/driver/verified-drivers"
      );
      if (res.status === 200) {
        setDrivers(res.data.drivers);
      }
      console.log("fioj", res);
    } catch (error) {}
  };

  const submitPickupRequest = async () => {
    try {
      // Convert pickup time to proper Date object
      const [hours, minutes] = form.pickupTime.split(":");
      const pickupDate = new Date();
      pickupDate.setHours(hours, minutes, 0, 0);

      const payload = {
        address: form.address,
        pickupTime: pickupDate.toISOString(), // Send as ISO string
        phone: form.phone,
        paymentMethod: form.paymentMethod,
        driver: selectedDriver || "Pending",
        recyclable:
          recyclableItem && recyclableKg
            ? {
                item: recyclableItem,
                kg: Number(recyclableKg),
              }
            : undefined,
        nonRecyclable:
          nonRecyclableItem && nonRecyclableKg
            ? {
                item: nonRecyclableItem,
                kg: Number(nonRecyclableKg),
              }
            : undefined,
      };

      // Remove undefined fields to avoid validation issues
      const cleanPayload = JSON.parse(JSON.stringify(payload));

      const response = await axios.patch(
        `http://localhost:5000/api/user/edituser/${userId}`, // Updated endpoint
        cleanPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Pickup request submitted successfully!");
        setPickUpForm(false);
        setShowScanner(false);
        resetForm();
      }
    } catch (error) {
      console.error("Full error details:", error);
      let errorMessage = "Failed to submit pickup request";

      if (error.response) {
        if (error.response.status === 400) {
          errorMessage =
            "Invalid data: " +
            (error.response.data.message || "Please check your input");
        } else if (error.response.status === 404) {
          errorMessage = "User not found";
        }
      }

      alert(errorMessage);
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
          drivers={driver}
          onClose={() => {
            setPickUpForm(false);
            resetForm();
          }}
          submitPickupRequest={submitPickupRequest}
          selectedDriver={selectedDriver}
          setSelectedDriver={setSelectedDriver}
        />
      )}
    </>
  );
}

export default UserMainHome;
