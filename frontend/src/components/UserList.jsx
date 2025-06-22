import React from 'react'
import "./UserList.css"
import { useNavigate } from 'react-router-dom';

function UserList() {


    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("isAdminAuthenticated");
        window.location.href = "/";
    };

    const userData = [
        { id: 1, name: "Vishva", email: "vishva@gmail.com", address: "Palayam", phone: "9999999999" },
        { id: 2, name: "Sanju", email: "sanju@gmail.com", address: "vjmd", phone: "8888888888" },
        { id: 3, name: "Adithya", email: "adithya@gmail.com", address: "vjmd", phone: "7777777777" },
        { id: 4, name: "Gokul", email: "gokul@gmail.com", address: "kollam", phone: "66666666" },
        { id: 5, name: "Aksahy", email: "akshay@gmail.com", address: "attingal", phone: "55555555" }
    ]

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
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    )
}

export default UserList