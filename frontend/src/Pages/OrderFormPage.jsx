import { getOrderById, createOrder, updateOrder } from "../api/ordersApi.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooks } from "../api/booksApi.js";
import { getReaders } from "../api/readersApi.js";

function OrderFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [books, setBooks] = useState(null);
    const [readers, setReaders] = useState([]);

    const [form, setForm] = useState({
        bookId: "",
        readerId: "",
        dateIssued: "",
        dateReturned: "",
    })

    useEffect(() => {
        getBooks().then(setBooks);
        getReaders().then(setReaders);

        if (isEdit) {
            getOrderById(id).then((order) => {
                setForm({
                    bookId: order.book?.id || "",
                    readerId: order.reader?.id || "",
                    dateIssued: order.dateIssued || "",
                    dateReturned: order.dateReturned || "",
                });
            });
        }
    }, [id, isEdit]);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const order = {
            book: {
                id: Number(form.bookId),
            },
            reader: {
                id: Number(form.readerId),
            },
            dateIssued: form.dateIssued,
            dateReturned: form.dateReturned || null,
        };

        const request = isEdit ? updateOrder(id, order) : createOrder(order);

        request.then(() => {
            navigate("/orders");
        });
    }

    return (
        <div className="container my-5">
            <h1>{isEdit ? "Edit Order" : "Add Order"}</h1>

            <form onSubmit={handleSubmit} className="mt-4">

                <div className="mb-3">
                    <label className="form-label">Book</label>
                    <select
                        className="form-select"
                        id="bookId"
                        name="bookId"
                        value={form.bookId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a book</option>
                        {books && books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Reader</label>
                    <select
                        className="form-select"
                        id="readerId"
                        name="readerId"
                        value={form.readerId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a reader</option>
                        {readers && readers.map((reader) => (
                            <option key={reader.id} value={reader.id}>
                                {reader.firstName} {reader.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Date Issued</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateIssued"
                        name="dateIssued"
                        value={form.dateIssued}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Date Returned</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateReturned"
                        name="dateReturned"
                        value={form.dateReturned}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    {isEdit ? "Save changes" : "Save Order"}
                </button>
                <Link to="/orders" className="btn btn-secondary">Cancel</Link>
            </form>
        </div>
    )
}
export default OrderFormPage;