import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- You missed this import!
import video from "../../assets/banner-two-video.mp4";
import styles from "./userhome.module.css";
import axios from "axios";

function UserHome() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    state: "",
    city: "",
  });

  const navigate = useNavigate(); // <-- Add this line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isRegister) {
      const res = await axios.post("http://localhost:5000/api/user/register", form);
      if (res.status === 201) {
        alert("Registration successful. Redirecting to login...");
        setForm({ name: "", email: "", password: "", state: "", city: "" });
        setIsRegister(false);
      } else {
        alert(res.data.message || "Registration failed");
      }
    } else {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email: form.email,
        password: form.password,
      });

      if (res.status === 200) {
        alert("Login successful");
        localStorage.setItem("userToken", res.data.token); // Save token (optional)
        navigate("/home"); // Redirect after login
      } else {
        alert(res.data.message || "Login failed");
      }
    }
  } catch (err) {
    console.error("Auth error:", err);
    alert(
      err.response?.data?.message || "An error occurred during authentication"
    );
  }
};


  return (
    <div className={styles.heroSection}>
      <div className={styles.videoContainer}>
        <video src={video} autoPlay muted loop playsInline />
      </div>

      <div className={styles.appointmentBox}>
        <h3>{isRegister ? "📝 Register" : "🔐 Login"}</h3>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Name"
                className={styles.input}
                value={form.name}
                name="name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="State"
                className={styles.input}
                required
                name="state"
                onChange={handleChange}
                value={form.state}
              />
              <input
                type="text"
                placeholder="City"
                className={styles.input}
                name="city"
                onChange={handleChange}
                value={form.city}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            name="email"
            onChange={handleChange}
            value={form.email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.button}>
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p
          className={styles.linkText}
          style={{ cursor: "pointer", color: "#74c043" }}
        >
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className={styles.toggleLink}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>

      <div className={styles.heroText}>
        <h5>Turning Waste Into New Possibilities</h5>
        <h1>
          Smart Disposal <br /> For Cleaner World
        </h1>
        <p>
          Delivering smart waste solutions for homes, businesses & industries to
          keep communities clean and protect the environment every day.
        </p>
      </div>
    </div>
  );
}

export default UserHome;
