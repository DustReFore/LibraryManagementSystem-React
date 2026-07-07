import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAuthor, getAuthors } from "../api/authorsApi.js";

function AuthorsPage() {
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAuthors().then(setAuthors);
    }, []);

    function handleDelete(id) {
        deleteAuthor(id).then(() => {
            setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
        });
    }

    return (
        <div className="container my-5">
            <h1 className="mb-4">Authors Catalog</h1>
            <Link className="btn btn-primary mb-3" to="/authors/add">Add Author</Link>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Year of Birth</th>
                    <th>Country</th>
                    <th>Books</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.id}>
                            <td>{author.id}</td>
                            <td>{author.firstName}</td>
                            <td>{author.lastName}</td>
                            <td>{author.yearOfBirth}</td>
                            <td>{author.country}</td>
                            <td>
                                {(author.books ?? []).map((book, index, books) => (
                                    <span key={book.id}>
                                        {book.title}
                                        {index < books.length - 1 && ", "}
                                    </span>
                                ))}
                            </td>

                            <td>
                                <button className="btn btn-sm btn-warning" onClick={() => navigate(`/authors/edit/${author.id}`)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(author.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AuthorsPage;