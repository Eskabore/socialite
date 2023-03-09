import { Component } from "react";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        console.log(e);
        // `target` is the element that triggered the event
        // `currentTarget`a` is the element that the event listener is attached to
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

        // Create empty object to 'store' user inputs
        const newUser = {};

        newUser.first = this.state.first;
        newUser.last = this.state.last;
        newUser.email = this.state.email;
        newUser.password = this.state.password;

        console.log(newUser);

        fetch("/registration", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                console.log("response is: ", response.ok);

                if (response.ok) {
                    // User is registered
                    // -> reload page to show logged-in
                    location.reload();
                } else {
                    // Update 'error' property in state
                    this.setState({ error: true });
                }
            })
            .catch((error) => {
                console.log("Error (/registration): ", error);
            });
    }

    render() {
        return (
            <div>
                <h1>This is the registration component</h1>
                <div className="error">{this.state.error && (
                    <p>Something went wrong! Please try again.
                    </p>
                )}</div>


                <form onSubmit={ this.handleSubmit }>
                    <input
                        type="text"
                        name="first"
                        onChange={this.handleChange}
                        value={this.state.first}
                        placeholder="First name"
                    />
                    <input
                        type="text"
                        name="last"
                        onChange={this.handleChange}
                        value={this.state.last}
                        placeholder="Last name"
                    />

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
                        autoComplete="newPassword"
                        onChange={this.handleChange}
                        value={this.state.password}
                        placeholder="Password"
                    />

                    <div>
                        <button type="submit">Register Now</button>
                    </div>
                </form>

                <button>
                    <Link to="/login">
                        Log In
                    </Link>
                </button>
            </div>
        );
    }
}
