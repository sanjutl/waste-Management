import React, { useState, useEffect } from 'react'
import "./PartnerandOrders.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function PartnerandOrders() {

    const navigate = useNavigate()

    const [partners, setPartners] = useState([]);
    const [orders, setOrders] = useState([])

    const logout = () => {
        localStorage.removeItem("isAdminAuthenticated");
        window.location.href = "/";
    };

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/partners/pending");
                setPartners(res.data);
            } catch (err) {
                console.error("Error fetching partners:", err);
            }
        };

        fetchPartners();
    }, []);

    const approvepartner = async (id) => {
        try {
            const approveRes = await axios.put(`http://localhost:5000/api/partners/approve/${id}`);
            console.log("approveres", approveRes)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getAllOrder = async () => {
            try {
                const orderRes = await axios.get('http://localhost:5000/api/user/all-orders');
                console.log("orderres", orderRes.data.data)
                setOrders(orderRes.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        getAllOrder()
    }, [])

    function convertToIST(utcDateStr) {
        const date = new Date(utcDateStr);

        // Convert to IST using toLocaleString
        return date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);

        return date.toLocaleDateString("en-IN", {
            timeZone: "Asia/Kolkata", // optional: adjusts to IST
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <div className='userlist'>
            <div className="top-bar">
                <div>
                    <button
                        className="nav-btn"
                        onClick={() => navigate("/userlist")}
                    >
                        USER
                    </button>
                    <button
                        className="nav-btn"
                        onClick={() => navigate("/driverregister")}
                    >
                        DRIVER
                    </button>
                </div>
                <button className="nav-btn" onClick={logout}>
                    LOGOUT
                </button>
            </div>

            <div className="partner-section">
                <h2 style={{ textAlign: "center" }}>Partners</h2>
                <div className="partner-cards">
                    {partners.map((partner) => (
                        <div key={partner._id} className="partner-card">
                            <h3>{partner.companyName}</h3>
                            <p><strong>Email:</strong> {partner.email}</p>
                            <p><strong>Contact:</strong> {partner.contactPerson}</p>
                            <p><strong>Service Area:</strong> {partner.serviceArea}</p>
                            <p><strong>Additional Info:</strong> {partner.additionalInfo}</p>

                            {partner.services && partner.services.length > 0 && (
                                <div className="services">
                                    <strong>Services:</strong>
                                    <ul>
                                        {partner.services.map((service, index) => (
                                            <li key={index} className="service-tag">{service}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="actionbutton">
                                <button className="contact" onClick={() => approvepartner(partner._id)}>Approve</button>
                                <button className="remove">Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="partner-section">
                <h2 style={{ textAlign: "center" }}>Orders</h2>
                <div className="partner-cards">
                    {orders.map((order) => (
                        <div key={order._id} className="partner-card">
                            <h3>{order.userName}</h3>
                            <p><strong>Address:</strong> {order.address}</p>
                            <p><strong>Driver:</strong> {order.driver}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>Email:</strong> {order.userEmail}</p>
                            <p><strong>Ordered Date:</strong> {formatDate(order.createdAt)}</p>
                            <p><strong>Pick Up Time:</strong> {convertToIST(order.pickupTime)}</p>



                            <div className="actionbutton">
                                <button className="remove">Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PartnerandOrders