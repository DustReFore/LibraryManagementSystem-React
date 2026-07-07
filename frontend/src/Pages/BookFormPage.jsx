import { getBookById, createBook, updateBook } from "../api/booksApi.js";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthors } from "../api/authorsApi.js";

function BookFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [authors, setAuthors] = useState([]);

    const [form, setForm] = useState({
        title: "",
        authorId: "",
        year: "",
        categoryName: "",
    });

    useEffect(() => {
        getAuthors().then(setAuthors);

        if (isEdit) {
            getBookById(id).then((book) => {
                setForm({
                    title: book.title || "",
                    authorId: book.author?.id || "",
                    year: book.year || "",
                    categoryName: book.category?.name || "",
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

        const book = {
            title: form.title,
            author: {
                id: Number(form.authorId),
            },
            year: Number(form.year),
            category: {
                name: form.categoryName,
            },
        };

        const request = isEdit ? updateBook(id, book) : createBook(book);

        request.then(() => {
            navigate("/books");
        });
    }

    return (
        <div>
            <div className="container my-5">
                <h1>{isEdit ? "Edit book" : "Add book"}</h1>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name={"title"}
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <select
                            className="form-select"
                            id="author"
                            name="authorId"
                            value={form.authorId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choose author</option>

                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.firstName} {author.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="year" className="form-label">Year</label>
                        <input
                            type="number"
                            className="form-control"
                            id="year"
                            name="year"
                            value={form.year}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            id="categoryName"
                            name="categoryName"
                            value={form.categoryName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success">
                        {isEdit ? "Save changes" : "Save book"}
                    </button>
                    <Link to="/books" className="btn btn-secondary ms-2">Cancel</Link>
                </form>
            </div>
        </div>
    )
}
export default BookFormPage;