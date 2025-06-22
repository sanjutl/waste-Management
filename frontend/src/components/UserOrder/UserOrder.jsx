import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserOrder.module.css";
import { useParams } from "react-router-dom";
import UserNav from "../UserNav/UserNav";

function UserOrder() {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [review, setReview] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/getUser/${userId}`
        );
        setOrders(res.data.data || []); // Assuming data structure contains orders here
        console.log("Orders:", res.data.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };
    fetchOrders();
  }, [userId]);

  useEffect(() => {
    const getDrivers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/driver/alldrivers");
        setDrivers(res.data.data);
        console.log("Drivers:", res.data.data);
      } catch (error) {
        console.log("Error fetching drivers", error);
      }
    };
    getDrivers();
  }, []);

  const handleSubmit = () => {
    console.log("Review submitted:", review);
    setShowPopup(false);
    setReview("");
  };

  return (
    <div className={styles.orderPage}>
      <UserNav />
      <h1 style={{ marginTop: "30px" }}>Order Details</h1>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Recyclable</th>
            <th>Non-Recyclable</th>
            <th>Pickup Time</th>
            <th>Address</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Driver</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => {
              // Find matching driver by name
              const matchedDriver = drivers.find((d) => d.name === order.driver);
              return (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>
                    {order.recyclable?.item} - {order.recyclable?.kg}kg
                  </td>
                  <td>
                    {order.nonRecyclable?.item} - {order.nonRecyclable?.kg}kg
                  </td>
                  <td>{new Date(order.pickupTime).toLocaleString()}</td>
                  <td>{order.address}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.status}</td>
                  <td>
                    {matchedDriver
                      ? `${matchedDriver.name} (${matchedDriver.phone})`
                      : order.driver || "Not Assigned"}
                  </td>
                  <td>
                    <button onClick={() => setShowPopup(true)}>Add Review</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showPopup && (
        <div className={styles.popupBackdrop}>
          <div className={styles.popupBox}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <h3>Write your Review</h3>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience..."
              rows={5}
              className={styles.reviewInput}
            />
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrder;
