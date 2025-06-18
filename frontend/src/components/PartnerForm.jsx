import { useState } from 'react';
import { api } from '../api';
import './style.css'; // Import the CSS file

export default function PartnerForm() {
  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    serviceArea: '',
    services: '',
    additionalInfo: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const servicesArray = form.services.split(',').map(s => s.trim());
    await api.post('/partners', { ...form, services: servicesArray });
    alert('Partnership Request Sent!');
    window.location.reload(); 
  };

  return (
    <div className="partner-form-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>Join as a Partner</h2>
        <input name="companyName" placeholder="Company Name" onChange={handleChange} />
        <input name="contactPerson" placeholder="Contact Person" onChange={handleChange} />
        <input name="email" placeholder="Business Email" onChange={handleChange} />
        <input name="serviceArea" placeholder="Service Area (City/Region)" onChange={handleChange} />
        <input name="services" placeholder="Service Provided (comma-separated)" onChange={handleChange} />
        <textarea name="additionalInfo" placeholder="Additional Info" onChange={handleChange} />
        <button type="submit">Submit Partnership Request</button>
      </form>
    </div>
  );
}
