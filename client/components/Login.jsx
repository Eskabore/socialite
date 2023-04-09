import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const registeredUser = useRef({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    useEffect(() => {
        if (registeredUser.current.email !== "" && registeredUser.current.password !== "") {
            fetch("/login", {
                method: "POST",
                body: JSON.stringify(registeredUser.current),
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    console.log("response is: ", response.ok);
                    if (response.ok) {
                        // User is logged-in
                        // -> reload page to show logged-in
                        location.reload();
                    } else {
                        // Update 'error' property in state
                        setError(true);
                    }
                })
                .catch((error) => {
                    console.log("Error (/login): ", error);
                });
        }
    }, [registeredUser]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("About to submit the form!");
        console.log({ email, password });

        registeredUser.current.email = email;
        registeredUser.current.password = password;
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
}
