import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "first") {
            setFirst(value);
        } else if (name === "last") {
            setLast(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            first,
            last,
            email,
            password,
        };

        try {
            const response = await fetch("/registration", {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                setIsRegistered(true);
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div>
            <h1>This is the registration component</h1>
            {isRegistered ? (
                <>
                    <p>Registration successful! Please log in.</p>
                    <button>
                        <Link to="/login">Log In</Link>
                    </button>
                </>
            ) : (
                <>
                    <div className="error">
                        {error && <p>Something went wrong! Please try again.</p>}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="first"
                            onChange={handleChange}
                            value={first}
                            placeholder="First name"
                        />
                        <input
                            type="text"
                            name="last"
                            onChange={handleChange}
                            value={last}
                            placeholder="Last name"
                        />
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
                            autoComplete="newPassword"
                            onChange={handleChange}
                            value={password}
                            placeholder="Password"
                        />
                        <div>
                            <button type="submit">Register Now</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default Registration;
