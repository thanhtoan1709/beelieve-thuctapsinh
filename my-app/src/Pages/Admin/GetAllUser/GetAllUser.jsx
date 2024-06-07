import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/user/get-all'); // URL API mới
                const data = response.data;                
                if (Array.isArray(data.userData)) {
                    setUsers(data.userData);
                } else {
                    throw new Error('Expected an array of users');
                }
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
        <h2>User List</h2>
        <table className="table table-bordered table-striped">
            <thead>
                <tr>                    
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Mobile</th>
                    <th>Type Login</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.mobile}</td>
                        <td>{user.typeLogin}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default UserList;
