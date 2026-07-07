import { getAuthorById, createAuthor, updateAuthor } from "../api/authorsApi.js";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AuthorFormPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        yearOfBirth: "",
        country: "",
    });

    useEffect(() => {
        if (isEdit) {
            getAuthorById(id).then((author) => {
                setForm({
                    firstName: author.firstName || "",
                    lastName: author.lastName || "",
                    yearOfBirth: author.yearOfBirth || "",
                    country: author.country || "",
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

        const author = {
            firstName: form.firstName,
            lastName: form.lastName,
            yearOfBirth: form.yearOfBirth,
            country: form.country,
        };

        const request = isEdit ? updateAuthor(id, author) : createAuthor(author);

        request.then(() => {
            navigate("/authors")
        });
    }

    return (
        <div className="container my-5">
            <h1>{isEdit ? "Edit Author" : "Add Author"}</h1>

            <form onSubmit={handleSubmit} className="mt-4">

                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="yearOfBirth" className="form-label">Year of Birth</label>
                    <input
                        type="number"
                        className="form-control"
                        id="yearOfBirth"
                        name="yearOfBirth"
                        value={form.yearOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    {isEdit ? "Save changes" : "Save author"}
                </button>
                <Link to="/authors" className="btn btn-secondary">Cancel</Link>
            </form>
        </div>
    )
}

export default AuthorFormPage;