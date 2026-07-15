import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAuthor, getAuthors } from "../api/authorsApi.js";
import { getBooks } from "../api/booksApi.js";

function AuthorsPage() {
    const [authors, setAuthors] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAuthors().then(setAuthors);
        getBooks().then(setBooks);
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
                                {books
                                    .filter((book) => book.author?.id === author.id)
                                    .map((book) => book.title)
                                    .join(', ')
                                }
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