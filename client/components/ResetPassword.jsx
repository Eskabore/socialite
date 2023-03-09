import { Component } from "react";
import { Link } from "react-router-dom";
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            code: "",
            password: "", // Updated password
            error: false,
            step: 1 // Component first mount
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVerify = this.handleVerify.bind(this);
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

        console.log(this.state.step);

        const rpEmail = {};

        rpEmail.email = this.state.email;
        console.log(rpEmail);

        fetch('/password/reset/start.json', {
            method: 'POST',
            body: JSON.stringify(rpEmail),
            headers: { 'Content-Type': 'application/json'}
        })
            .then((response) => {
                console.log("response is: ", response.ok);

                if(response.ok) {

                    // User should have received an email with a random code
                    // NXT (Step 2) is verify code
                    this.setState( { step: 2 }); // Step 2
                    console.log("Fetch 'reset/start.json' succeeded");
                } else {
                    this.setState( { error: true }); //
                }
            });
    }

    handleVerify(e) {
        e.preventDefault();

        console.log(this.state.step);

        const rpCode = {};

        rpCode.email = this.state.email;
        rpCode.code = this.state.code;
        rpCode.password = this.state.password;

        console.log(rpCode);

        fetch("/password/reset/verify.json", {
            method: "POST",
            body: JSON.stringify(rpCode),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                console.log("response is: ", response.ok);

                if (response.ok) {
                // Code should match and User set new password
                // NXT (Step 3) OR 'else'
                    this.setState({ step: 3 });
                    console.log("Fetch 'reset/verify.json' succeeded");
                } else {
                    this.setState({ error: true });
                }
            });
    }

    render () {
        if (this.state.step === 1) {
            // Render form with email field
            // and button next Step
            return (
                <div>

                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <button type="submit">
                            Next Step
                        </button>
                    </form>

                </div>
            );
        } else if (this.state.step === 2) {
            // Verify Code
            // Field for New Password
            return (
                <div>

                    <form onSubmit={this.handleVerify}>
                        <input
                            type="text"
                            name="code"
                            placeholder="code"
                            value={this.state.code}
                            onChange={this.handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="New Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />

                        <button type="submit">
                            Set New Password
                        </button>
                    </form>
                </div>
            );
        } else {
            // Step 3
            return (
                <div>
                    <h1>Password successfully Updated</h1>
                    <button>
                        <Link to='/login'>
                            Log In
                        </Link>
                    </button>
                </div>
            );
        }
    }
}