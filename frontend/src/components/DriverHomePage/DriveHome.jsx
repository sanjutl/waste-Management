import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Driver.module.css";
import { useParams } from "react-router-dom";

function DriveHome() {
  const  driverName = useParams();
  const driveNam=driverName.userName  ||""
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
const [selectUserId,setSelectUserId]=useState(null)
const [newStatus, setNewStatus] = useState("");
  useEffect(() => {
    const fetchDriverOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/driver/orders/${driveNam}`
        );
        console.log(res);
        
        setOrders(res.data.orders);
        setLoading(false);
      } catch (error) {
        setError("Failed to load orders.");
        setLoading(false);
      }
    };

    fetchDriverOrders();
  }, [driverName]);

  const handleApproveClick = (orderId,userId,status) => {
    setSelectedOrderId(orderId);
    setSelectUserId(userId)
    setNewStatus(status);
    console.log(orderId,userId);
    
    setShowPopup(true);
  };

  const handleConfirmApprove = async () => {
    try {
     const response= await axios.put(
        `http://localhost:5000/api/user/update-status/${selectUserId}/${selectedOrderId}`,{ status: newStatus },
        
        
      );
      console.log(response)
      // Refresh orders after approval
      const res = await axios.get(
        `http://localhost:5000/api/driver/orders/${driverName}`
      );
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error approving order", err);
      setError("Could not approve order.");
    }
    setShowPopup(false);
    setSelectedOrderId(null);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setSelectedOrderId(null);
  };

  if (loading) return <div className={styles.loading}>Loading orders...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>My Assigned Orders</h1>
      {orders.length === 0 ? (
        <p>No orders assigned to you yet.</p>
      ) : (
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Pickup Time</th>
              <th>Address</th>
              <th>Recyclable</th>
              <th>Non-Recyclable</th>
              <th>Status</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order._id}>
                <td>{idx + 1}</td>
                <td>{order.userName}</td>
                <td>{new Date(order.pickupTime).toLocaleString()}</td>
                <td>{order.address}</td>
                <td>
                  {order.recyclable?.item} - {order.recyclable?.kg} kg
                </td>
                <td>
                  {order.nonRecyclable?.item} - {order.nonRecyclable?.kg} kg
                </td>
                <td>{order.status}</td>
                <td>{order.userPhone || order.userEmail}</td>
                <td>
                  {order.status === "Pending" && (
                    <button
                      className={styles.approveBtn}
                      onClick={() => handleApproveClick(order._id,order.userId,"Accepted")}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Popup */}
      {showPopup && (
        <div className={styles.popupBackdrop}>
          <div className={styles.popupBox}>
            <h3>Confirm Approval</h3>
            <p>Are you sure you want to approve this order?</p>
            <div className={styles.popupActions}>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.confirmBtn} onClick={handleConfirmApprove}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriveHome;
