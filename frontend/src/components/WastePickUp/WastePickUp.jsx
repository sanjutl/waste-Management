import React from "react";
import styles from "./Waste.module.css";

function WastePickUp({
  handleSubmit,
  handleChange,
  form,
  handleRecyclableItemChange,
  handleRecyclableKgChange,
  handleNonRecyclableItemChange,
  handleNonRecyclableKgChange,
  recyclableItem,
  recyclableKg,
  nonRecyclableItem,
  nonRecyclableKg,
  rates,
  priceUser,
  priceDriver,
  showScanner,
  setShowScanner,
  driverAmount,
  onClose,
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <form onSubmit={handleSubmit} className={styles.form}>
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
            type="time"
            placeholder="Preferred Pickup Time"
            onChange={handleChange}
            value={form.pickupTime}
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            value={form.phone}
            required
            pattern="[0-9]{10}"
            maxLength={10}
            title="Enter a 10-digit phone number"
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
          {priceDriver > 0 && (
            <p>Driver will receive ₹{priceDriver.toFixed(2)}</p>
          )}

          <div className={styles.actions}>
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>
          </div>
        </form>

        {showScanner && (
          <div className={styles.popup}>
            <h3>Scan to Pay</h3>
            <img src={qr} alt="Scan QR" />
            <p>Amount to pay: ₹{driverAmount.toFixed(2)}</p>
            <button onClick={() => setShowScanner(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WastePickUp;
