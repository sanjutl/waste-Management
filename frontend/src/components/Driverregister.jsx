import React, { useState } from 'react'
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/api/v1/user/login`, form);
            if (response) {
                navigate('/admindashboard')

            }
        } catch (error) {
            console.log("Error Loging In", error);

        }
    }

    const logout = () => {
        localStorage.removeItem("isAdminAuthenticated");
        window.location.href = "/";
    };


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
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <div className="adminput-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your Name"
                            value={form.email}
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
                </form>
            </div>
        </div>
    )
}

export default Driverregister