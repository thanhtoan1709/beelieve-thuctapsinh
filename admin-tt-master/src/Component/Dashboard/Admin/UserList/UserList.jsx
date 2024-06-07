// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const UserList = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/v1/user/get-all'); // URL API mới
//                 const data = response.data;                
//                 if (Array.isArray(data.userData)) {
//                     setUsers(data.userData);
//                 } else {
//                     throw new Error('Expected an array of users');
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };

//         fetchUsers();
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error.message}</p>;
//     }

//     return (
//         <div>
//         <h2>User List</h2>
//         <table className="table table-bordered table-striped">
//             <thead>
//                 <tr>                    
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Address</th>
//                     <th>Mobile</th>
//                     <th>Type Login</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {users.map(user => (
//                     <tr key={user.id}>
//                         <td>{user.name}</td>
//                         <td>{user.email}</td>
//                         <td>{user.address}</td>
//                         <td>{user.mobile}</td>
//                         <td>{user.typeLogin}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
//     );
// };

// export default UserList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "../UserForm/UserForm";
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/user/get-all'); // URL API mới
                const data = response.data;
                // console.log(data); // Log dữ liệu để kiểm tra định dạng
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

    const handleAddUser = () => {
        navigate("/admin/userform");
        console.log("Add user");
    };

    const handleEditUser = (id) => {
        // Implement logic to edit a user
        console.log("Edit user with id:", id);
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/user/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("There was an error deleting the user!", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>User List</h2>
            <button onClick={handleAddUser}>Thêm User</button>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>                        
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Mobile</th>
                        <th>Type Login</th>
                        <th>Actions</th>
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
                            <td>
                                <button onClick={() => handleEditUser(user.id)}>Sửa</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
