import { getReaderById, createReader, updateReader } from "../api/readersApi.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ReaderFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        yearOfBirth: "",
        email: "",
    });

    useEffect(() => {
        if (isEdit) {
            getReaderById(id).then((reader) => {
                setForm({
                    firstName: reader.firstName || "",
                    lastName: reader.lastName || "",
                    yearOfBirth: reader.yearOfBirth || "",
                    email: reader.email || "",
                })
            })
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

        const reader = {
            firstName: form.firstName,
            lastName: form.lastName,
            yearOfBirth: form.yearOfBirth,
            email: form.email,
        };

        const request = isEdit ? updateReader(id, reader) : createReader(reader);

        request.then(() => {
            navigate("/readers");
        });
    }

    return (
        <div className="container my-5">
            <h1>{isEdit ? "Edit Reader" : "Create Reader"}</h1>

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
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success">{isEdit ? "Save changes" : "Save reader"}</button>
                <Link to="/readers" className="btn btn-secondary">Cancel</Link>
            </form>
        </div>
    )
}

export default ReaderFormPage;