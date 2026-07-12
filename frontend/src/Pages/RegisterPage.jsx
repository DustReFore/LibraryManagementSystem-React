import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage({ setToken }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Registration failed");
                }

                return res.json();
            })
            .then((data) => {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                navigate("/");
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h1 className="mb-4">Register</h1>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;