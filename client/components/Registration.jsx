import { Component } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";

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
            <Box sx={{ maxWidth: 400, mx: 'auto', my: 4, p: 2 }}>
                <h1>Register</h1>
                
                {this.state.error && (
                    <p>Something went wrong! Please try again.</p>
                )}


                <form onSubmit={ this.handleSubmit }>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="First Name:"
                            type="text"
                            name="first"
                            onChange={this.handleChange}
                            value={this.state.first}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            type="text"
                            name="last"
                            onChange={this.handleChange}
                            value={this.state.last}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="newPassword"
                            onChange={this.handleChange}
                            value={this.state.password}
                            placeholder="Password"
                        />
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button variant="contained" color="primary" type="submit">
                        Register Now
                        </Button>
                    </Box>
                </form>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button component={Link} to="/login">
                        Log In
                    </Button>
                </Box>
            </Box>
        );
    }
}
