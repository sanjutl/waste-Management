import { React, useState } from "react";
import axios from 'axios'
import styles from "./userReg.module.css"
import loginImage from "../../assets/kerala.jpg"; // Adjust the path as per your folder structure

function UserRegistration() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
    // API logic here
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSide}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
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
        <img src={loginImage} alt="Login Visual" className={styles.image} />
      </div>
    </div>
  );
}

export default UserRegistration
