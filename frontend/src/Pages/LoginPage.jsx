import {useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((prevForm) =>({
            ...prevForm,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Invalid username or password");
            }

            return res.json();
        })
        .then((data) => {
            localStorage.setItem("token", data.token);
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

                    <h1 className="mb-4">Login</h1>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-4">
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

                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;