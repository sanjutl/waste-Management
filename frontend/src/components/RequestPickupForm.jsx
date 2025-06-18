import { useState } from 'react';
import { api } from '../api';
import './style.css'; // Import the CSS file

export default function RequestPickupForm() {
  const [form, setForm] = useState({
    wasteType: '',
    pickupTime: 'string',
    address: '',
    paymentMethod: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/pickups', form);
    alert('Pickup Requested!');
    window.location.reload();
  };

  return (
    <div className="pickup-form-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>Request Waste Pickup</h2>
        <input name="wasteType" placeholder="Waste Type" onChange={handleChange} />
        <input name="pickupTime" placeholder="Preferred Pickup Time" onChange={handleChange} />
        <textarea name="address" placeholder="Pickup Address" onChange={handleChange} />
        <input name="paymentMethod" placeholder="Payment Method" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
