import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteReader, getReaders } from "../api/readersApi.js";
import { getOrders } from "../api/ordersApi.js";

function ReadersPage() {
    const [ readers, setReaders ] = useState([]);
    const [ orders, setOrders ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getReaders().then(setReaders);
        getOrders().then(setOrders);
    }, []);

    function handleDelete(id) {
        deleteReader(id).then(() => {
            setReaders((prevReaders) => prevReaders.filter((reader) => reader.id !== id));
        });
    }

    return (
        <div className="container my-5">
            <h1 className="mb-4">Reader List</h1>
            <Link className="btn btn-primary mb-3" to="/readers/add">Add Reader</Link>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Year of Birth</th>
                        <th>Email</th>
                        <th>Orders</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {readers.map((reader) => (
                        <tr key={reader.id}>
                            <td>{reader.id}</td>
                            <td>{reader.firstName}</td>
                            <td>{reader.lastName}</td>
                            <td>{reader.yearOfBirth}</td>
                            <td>{reader.email}</td>
                            <td>
                                {orders
                                    .filter((order) => order.reader?.id === reader.id)
                                    .map((order) => order.book ? order.book.title : '-')
                                    .join(', ')
                                }
                            </td>
                        <td>
                            <button className="btn btn-sm btn-warning" onClick={() => navigate(`/readers/edit/${reader.id}`)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(reader.id)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReadersPage;