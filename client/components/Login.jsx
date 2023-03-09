import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        console.log(e);

        this.setState(
            {
                [e.currentTarget.name]: e.currentTarget.value,
            },
            () => {
                console.log(this.state);
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("About to submit the form!");
        console.log(this.state);

        const registeredUser = {};

        registeredUser.email = this.state.email;
        registeredUser.password = this.state.password;

        console.log(registeredUser);

        fetch("/login", {
            method: "POST",
            body: JSON.stringify(registeredUser),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                console.log("response is: ", response.ok);

                if (response.ok) {
                    // User is logged-in
                    // -> reload page to show logged-in
                    location.reload();
                } else {
                    // Update 'error' property in state
                    this.setState({ error: true });
                }
            })
            .catch((error) => {
                console.log("Error (/login): ", error);
            });
    }

    render() {
        return (
            <div>
                <h1>This is the login component</h1>
                <div className="error">{this.state.error && (
                    <p>Something went wrong! Please try again.
                    </p>
                )}</div>


                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        name="password"
                        autoComplete="currentPassword"
                        onChange={this.handleChange}
                        value={this.state.password}
                        placeholder="Password"
                    />

                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>

                <button>
                    <Link to="/password">
                        Reset Password
                    </Link>
                </button>
                <button>
                    <Link to="/registration">
                        Create an Account
                    </Link>
                </button>
            </div>
        );
    }
}
