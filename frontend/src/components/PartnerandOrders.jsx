import React, { useState, useEffect } from 'react'
import "./PartnerandOrders.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function PartnerandOrders() {

    const navigate = useNavigate()

    const [partners, setPartners] = useState([]);

    const logout = () => {
        localStorage.removeItem("isAdminAuthenticated");
        window.location.href = "/";
    };

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/partners/pending");
                console.log("res", res)
                setPartners(res.data);
            } catch (err) {
                console.error("Error fetching partners:", err);
            }
        };

        fetchPartners();
    }, []);

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
                                <button className="contact">Approve</button>
                                <button className="remove">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PartnerandOrders