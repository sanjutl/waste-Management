import React from 'react'
import './Driverregister.css'
import { useNavigate } from 'react-router-dom';

function Driverregister() {

    const navigate = useNavigate()

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

            driver
        </div>
    )
}

export default Driverregister