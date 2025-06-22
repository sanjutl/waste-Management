import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (isRegister) {
        const cleanedForm = {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password.trim(),
          state: form.state.trim(),
          city: form.city.trim(),
        };

        const res = await axios.post(
          "http://localhost:5000/api/user/register",
          cleanedForm,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 201) {
          alert("Registration successful. Redirecting to login...");
          setForm({ name: "", email: "", password: "", state: "", city: "" });
          setIsRegister(false);
        }
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: form.email.trim(),
          password: form.password,
        });

        if (res.status === 200 && res.data.token) {
          localStorage.setItem("token", res.data.token);
          const userId = res.data.user.id;
          const roleNum = Number(res.data.user.role);

          if (roleNum === 400) {
            navigate("/admin/dashboard");
          } else if (roleNum === 500) {
            const driverId = res.data.user.name; // Assuming user.id is the driver's ObjectId string
            navigate(`/driver/${driverId}`);
          } else {
            navigate(`/userhomemain/${userId}`);
          }
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setErrorMsg(
        err.response?.data?.message ||
          "An error occurred. Please check your input and try again."
      );
    } finally {
      setLoading(false);
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
                name="state"
                onChange={handleChange}
                value={form.state}
                required
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
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete={isRegister ? "new-password" : "current-password"}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading
              ? isRegister
                ? "Registering..."
                : "Logging in..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

        <p
          className={styles.linkText}
          style={{ cursor: "pointer", color: "#74c043" }}
        >
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className={styles.toggleLink}
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMsg("");
            }}
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
