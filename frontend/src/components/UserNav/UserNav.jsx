import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./UserNav.module.css";
import logo  from "../../assets/logo.jpg"

function Navbar() {
  const {userId}=useParams()
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/"); // Redirect to login
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}><img src={logo} alt="" /></div>
      <ul className={styles.navLinks}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to={`/userorder/${userId}`}>Orders</Link></li>
        <li><button onClick={handleLogout} className={styles.logoutBtn}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
