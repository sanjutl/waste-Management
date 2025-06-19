import { useState } from "react";
import axios from "axios";
import "./style.css";
import qr from "../assets/qr.png";

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

export default function RequestPickupForm() {
  const [form, setForm] = useState({
    address: "",
    pickupTime: "",
    paymentMethod: "",
  });

  const [recyclableItem, setRecyclableItem] = useState("");
  const [recyclableKg, setRecyclableKg] = useState("");
  const [nonRecyclableItem, setNonRecyclableItem] = useState("");
  const [nonRecyclableKg, setNonRecyclableKg] = useState("");

  const [priceUser, setPriceUser] = useState(0);
  const [priceDriver, setPriceDriver] = useState(0);
  const [driverAmount, setDriverAmount] = useState(0);
  const [showScanner, setShowScanner] = useState(false);

  const calculatePrices = (
    recItem,
    recKg,
    nonRecItem,
    nonRecKg,
    paymentMethod
  ) => {
    let userAmount = 0;
    let driverAmt = 0;

    if (recItem && recKg) {
      const rate = rates.recyclable[recItem] || 0;
      userAmount = rate * parseFloat(recKg || 0);
    }

    if (nonRecItem && nonRecKg) {
      const rate = rates.nonRecyclable[nonRecItem] || 0;
      driverAmt = rate * parseFloat(nonRecKg || 0);
    }

    setPriceUser(userAmount);
    setPriceDriver(driverAmt);

    if (paymentMethod === "UPI" && driverAmt > 0) {
      setDriverAmount(driverAmt);
      setShowScanner(true);
    } else {
      setShowScanner(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const newForm = { ...prev, [name]: value };

      if (name === "paymentMethod") {
        calculatePrices(
          recyclableItem,
          recyclableKg,
          nonRecyclableItem,
          nonRecyclableKg,
          value
        );
      }

      return newForm;
    });
  };

  const handleRecyclableItemChange = (value) => {
    setRecyclableItem(value);
    calculatePrices(value, recyclableKg, nonRecyclableItem, nonRecyclableKg, form.paymentMethod);
  };

  const handleRecyclableKgChange = (value) => {
    setRecyclableKg(value);
    calculatePrices(recyclableItem, value, nonRecyclableItem, nonRecyclableKg, form.paymentMethod);
  };

  const handleNonRecyclableItemChange = (value) => {
    setNonRecyclableItem(value);
    calculatePrices(recyclableItem, recyclableKg, value, nonRecyclableKg, form.paymentMethod);
  };

  const handleNonRecyclableKgChange = (value) => {
    setNonRecyclableKg(value);
    calculatePrices(recyclableItem, recyclableKg, nonRecyclableItem, value, form.paymentMethod);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.address || !form.pickupTime || !form.paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }

    const recyclableKgParsed = parseFloat(recyclableKg);
    const nonRecyclableKgParsed = parseFloat(nonRecyclableKg);

    const payload = {
      address: form.address,
      pickupTime: form.pickupTime,
      paymentMethod: form.paymentMethod,
    };

    if (recyclableItem && !isNaN(recyclableKgParsed) && recyclableKgParsed > 0) {
      payload.recyclable = {
        item: recyclableItem,
        kg: recyclableKgParsed,
        amount: priceUser,
      };
    }

    if (nonRecyclableItem && !isNaN(nonRecyclableKgParsed) && nonRecyclableKgParsed > 0) {
      payload.nonRecyclable = {
        item: nonRecyclableItem,
        kg: nonRecyclableKgParsed,
        amount: priceDriver,
      };
    }

    if (!payload.recyclable && !payload.nonRecyclable) {
      alert("Please provide at least one valid waste type with weight.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/pickups", payload);
      alert("Pickup requested successfully!");
      console.log("Saved:", res.data);
      window.location.reload();
    } catch (error) {
      console.error("Submit error:", error?.response?.data || error.message);
      alert("Submission failed: " + (error?.response?.data?.error || "Server error."));
    }
  };

  return (
    <div className="pickup-form-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>Request Waste Pickup</h2>

        <h4>Recyclable Waste</h4>
        <select
          value={recyclableItem}
          onChange={(e) => handleRecyclableItemChange(e.target.value)}
          
        >
          <option value="">Select Recyclable Item</option>
          {Object.keys(rates.recyclable).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Kilograms"
          value={recyclableKg}
          onChange={(e) => handleRecyclableKgChange(e.target.value)}
          min="0"
          step="any"
        />

        <h4>Non-Recyclable Waste</h4>
        <select
          value={nonRecyclableItem}
          onChange={(e) => handleNonRecyclableItemChange(e.target.value)}
        >
          <option value="">Select Non-Recyclable Item</option>
          {Object.keys(rates.nonRecyclable).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Kilograms"
          value={nonRecyclableKg}
          onChange={(e) => handleNonRecyclableKgChange(e.target.value)}
          min="0"
          step="any"
        />

        <textarea
          name="address"
          placeholder="Pickup Address"
          onChange={handleChange}
          value={form.address}
          required
        />
        <input
          name="pickupTime"
          placeholder="Preferred Pickup Time"
          onChange={handleChange}
          value={form.pickupTime}
          required
        />
        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="">Select Payment Method</option>
          <option value="UPI">UPI</option>
          <option value="COD">Cash on Delivery</option>
        </select>

        {priceUser > 0 && <p>You will receive ₹{priceUser.toFixed(2)}</p>}
        {priceDriver > 0 && <p>Driver will receive ₹{priceDriver.toFixed(2)}</p>}

        <button type="submit">Submit</button>
      </form>

      {showScanner && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Scan to Pay</h3>
            <img src={qr} alt="Scan QR" className="qr-image" />
            <p>Amount to pay: ₹{driverAmount.toFixed(2)}</p>
            <button onClick={() => setShowScanner(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
