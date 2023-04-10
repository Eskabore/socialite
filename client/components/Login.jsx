import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registeredUser = {
            email,
            password,
        };

        try {
            const response = await fetch("/login", {
                method: "POST",
                body: JSON.stringify(registeredUser),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                location.reload();
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div>
            <h1>This is the login component</h1>
            <div className="error">
                {error && <p>Something went wrong! Please try again.</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    autoComplete="currentPassword"
                    onChange={handleChange}
                    value={password}
                    placeholder="Password"
                />
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <button>
                <Link to="/password">Reset Password</Link>
            </button>
            <button>
                <Link to="/registration">Create an Account</Link>
            </button>
        </div>
    );
};

export default Login;
