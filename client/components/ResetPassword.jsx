import { useState } from "react";
import { Link } from "react-router-dom";

const ErrorMessage = () => (
    <div className="error">
        <p>Something went wrong! Please try again.</p>
    </div>
);

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "code") {
            setCode(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const rpEmail = { email };

        try {
            const response = await fetch("/password/reset/start.json", {
                method: "POST",
                body: JSON.stringify(rpEmail),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                setStep(2);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        const rpCode = { email, code, password };

        try {
            const response = await fetch("/password/reset/verify.json", {
                method: "POST",
                body: JSON.stringify(rpCode),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                setStep(3);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        }
    };

    if (step === 1) {
        return (
            <div>
                {error && <ErrorMessage />}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <button type="submit">Next Step</button>
                </form>
            </div>
        );
    } else if (step === 2) {
        return (
            <div>
                {error && <ErrorMessage />}
                <form onSubmit={handleVerify}>
                    <input
                        type="text"
                        name="code"
                        placeholder="code"
                        value={code}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={password}
                        onChange={handleChange}
                    />
                    <button type="submit">Set New Password</button>
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Password successfully Updated</h1>
                <button>
                    <Link to="/login">Log In</Link>
                </button>
            </div>
        );
    }
};

export default ResetPassword;
