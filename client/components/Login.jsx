import { Component } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Box } from '@mui/material';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: false,        };

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
            <Box sx={{ maxWidth: 400, mx: 'auto', my: 4, p: 2 }}>
                <h1>Login</h1>
                
                {this.state.error && (
                    <p>Something went wrong! Please try again.</p>
                )}


                <form onSubmit={this.handleSubmit}>
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
                            autoComplete="currentPassword"
                            onChange={this.handleChange}
                            value={this.state.password}
                            placeholder="Password"
                        />
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <Button variant="contained" color="primary" type="submit">
                        Login
                        </Button>
                    </Box>
                </form>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button component={Link} to="/password" sx={{ mr: 1 }}>
                        Reset Password
                    </Button>

                    <Button component={Link} to="/registration">
                        Create an Account
                    </Button>
                </Box>
            </Box>
        );
    }
}
