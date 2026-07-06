import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BooksPage() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/books")
            .then((response) => response.json())
            .then((data) => setBooks(data))
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost:8080/api/books/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        });
    }

    return (
        <div className="container my-5">
            <h1 className="mb-4">Books Catalog</h1>
            <a className="btn btn-primary mb-3" href="/books/add">Add Book</a>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.year}</td>
                            <td>{book.category}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() => navigate(`/books/edit/${book.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(book.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BooksPage;