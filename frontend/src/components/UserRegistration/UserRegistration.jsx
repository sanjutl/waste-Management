import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from "./userReg.module.css";
import loginImage from "../../assets/kerala.jpg";

function UserRegistration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/register", form); // 🔁 Update if needed

      if (res.status === 201) {
        alert("Registration successful. Redirecting to login...");
        navigate("/userlogin"); // ✅ Navigate on success
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data?.message || "An error occurred during registration");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSide}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>State</label>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
          />

          <label>City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
          />

          <button type="submit" className={styles.submitBtn}>Create</button>
        </form>
      </div>
      <div className={styles.rightSide}>
        <img src={loginImage} alt="Registration Visual" className={styles.image} />
      </div>
    </div>
  );
}

export default UserRegistration;
