import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteOrder, getOrders } from "../api/ordersApi.js";

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getOrders().then(setOrders);
    }, [])

    function handleDelete(id) {
        deleteOrder(id).then(() => {
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
        });
    }

    return (
        <div className="container my-5">
            <h1 className="mb-4">Order List</h1>
            <Link className="btn btn-primary mb-3" to="/orders/add">Add Order</Link>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Book</th>
                    <th>Reader</th>
                    <th>Date Issued</th>
                    <th>Date Returned</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.book.title}</td>
                            <td>{order.reader?.firstName } { order.reader?.lastName}</td>
                            <td>{order.dateIssued}</td>
                            <td>{order.dateReturned}</td>
                            <td>
                                <button className="btn btn-sm btn-warning" onClick={() => navigate(`/orders/edit/${order.id}`)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(order.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersPage;