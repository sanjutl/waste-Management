import React, { useState, useEffect } from 'react'
import './Driverregister.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Driverregister() {

    let field = {
        name: "",
        email: "",
        password: "",
        phone: "",
        vehicleNumber: ""
    };

    const navigate = useNavigate()
    const [form, setForm] = useState(field);
    const [drivers, setDrivers] = useState([]);
    const [selectedDriverId, setSelectedDriverId] = useState(null);
    const [driverReviews, setDriverReviews] = useState([]);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic front-end validation
        if (!form.name || !form.email || !form.password || !form.phone || !form.vehicleNumber) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            console.log("form", form)
            const response = await axios.post("http://localhost:5000/api/driver/registerdriver", form,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response)
            console.log("form", form)
            setForm(field)

        } catch (error) {
            console.log("Error", error);

        }
    }

    const logout = () => {
        localStorage.removeItem("isAdminAuthenticated");
        window.location.href = "/";
    };

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/driver/alldrivers");
                setDrivers(response.data.data);
            } catch (error) {
                console.error("Error fetching drivers:", error);
            }
        };

        fetchDrivers();
    }, []);

    const getReview = async (driverName) => {
        if (selectedDriverId === driverName) {
            // Collapse if same driver is clicked again
            setSelectedDriverId(null);
            setDriverReviews([]);
            return;
        }

        try {
            const reviewRes = await axios.get(`http://localhost:5000/api/user/driver-reviews/${driverName}`)
            console.log("res", reviewRes)
            setDriverReviews(reviewRes.data.reviews || []); // Assuming response is { reviews: [...] }
            setSelectedDriverId(driverName);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='driverregister'>
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

            <div className='driverform'>
                <form className='form'>
                    <h2 className='headform'>Driver Registeration</h2>
                    <div className="adminput-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="adminput-group">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="adminput-group">
                        <label>Password</label>
                        <div className="input-span-btn23">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your Password"
                                value={form.password}
                                onChange={handleChange}

                            />
                        </div>
                    </div>
                    <div className="adminput-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter your Number"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="adminput-group">
                        <label>Vehicle Number</label>
                        <input
                            type="text"
                            name="vehicleNumber"
                            placeholder="Enter your VehicleNumber"
                            value={form.vehicleNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='driversub'>
                        <button className='subbutton' onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>

            <div className="driver-list-container">
                <h2 style={{ textAlign: "center" }}>Driver Details</h2>
                <div className="driver-cards">
                    {drivers.map((driver) => (
                        <div key={driver._id} className="driver-card">
                            <h3>{driver.name}</h3>
                            <p><strong>Email:</strong> {driver.email}</p>
                            <p><strong>Phone:</strong> {driver.phone}</p>
                            <p><strong>Vehicle:</strong> {driver.vehicleNumber}</p>
                            <div className='actionbutton'>
                                <button className='reject'>Reject</button>
                                <button className='review' onClick={() => getReview(driver.name)}>
                                    {selectedDriverId === driver.name ? "Hide Reviews" : "Review"}
                                </button>
                            </div>

                            {selectedDriverId === driver.name && (
                                <div className="reviews-container">
                                    {driverReviews.length > 0 ? (
                                        driverReviews.map((review, index) => (
                                            <div key={index} className="review-card">
                                                <p><strong>By:</strong> {review.userName}</p>
                                                <p><strong>Comment:</strong> {review.comment}</p>
                                                <p><strong>Rating:</strong>
                                                    <span className="stars">
                                                        {review.rating ? "⭐".repeat(Math.min(review.rating, 5)) : "Not rated"}
                                                    </span>
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-review">No reviews available.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Driverregister