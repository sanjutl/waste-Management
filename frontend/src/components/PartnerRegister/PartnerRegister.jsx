import React, { useState } from "react";
import styles from "./Patner.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PartnerRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    serviceArea: "",
    password: "",
    additionalInfo: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
      };

      const res = await axios.post("http://localhost:5000/api/partners/register", payload);
      console.log(res);
      
      if (res.status === 201) {
        alert("Partner registered successfully!");
        navigate("/"); // back to login or home
      }
    } catch (err) {
      setError(err.response?.data?.message );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.patnerMain}>
        <div className={styles.partnerContainer}>
      <h2 className={styles.head}>🤝 Register as a Partner</h2>
      <form onSubmit={handleSubmit} className={styles.partnerForm}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactPerson"
          placeholder="Contact Person"
          value={form.contactPerson}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="serviceArea"
          placeholder="Service Area"
          value={form.serviceArea}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <textarea
          name="additionalInfo"
          placeholder="Additional Info"
          rows="4"
          value={form.additionalInfo}
          onChange={handleChange}
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register as Partner"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
    </div>
  );
}

export default PartnerRegister
