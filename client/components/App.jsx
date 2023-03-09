import { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";
import FindPeople from "./FindPeople";
import OtherProfile from "./OtherProfile";
import Friends from "./Friends";
import Chat from "./Chat";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            first: "",
            last: "",
            email: "",
            picture: "",
            uploaderIsVisible: false,
            bio: ""
        };

        this.uploadImage = this.uploadImage.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.bioUpdated = this.bioUpdated.bind(this);
    }

    componentDidMount() {
        // componentDidMount <--> setState
        console.warn("componentDidMount");

        // fetch requests server for logged-in user's info
        fetch('/user.json',{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("Received user data App componentDidMount: ", data);

                // fetch sets setState
                this.setState({
                    id: data.id,
                    first: data.first,
                    last: data.last,
                    email: data.email,
                    picture: data.picture || '../public/avatardefault.png',
                    uploaderIsVisible: false,
                    bio: data.bio
                });
            })
            .catch((error) => {
                console.log("Received error in fetch /user.json", error);
            });
    }

    toggleUploader() {
        this.setState( { uploaderIsVisible: !this.state.uploaderIsVisible } );
    }

    bioUpdated(newBio) {
        this.setState({ bio: newBio });
    }

    uploadImage(file) {
        console.log("UploadImage function in <App /> is triggered, state is: ", this.state, "file is: ", file);

        this.setState( { picture: file } );
        this.setState( { uploaderIsVisible: false } );
    }


    logout() {
        console.log("You've clicked on logout button");
        fetch('/logout.json', {
            method: 'POST'
        })
            .then((response) => {

                if (response.ok) {

                    location.href = "/login";
                }
            })
            .catch((error) => {
                console.log("Error with logout(): ", error);
            });
    }


    render() {
        console.warn("render");

        if (!this.state.id) {
            return <p>Session is Unkmown! Please either Log In or Register.</p>;
        } else {
            return (
                <div>
                    <BrowserRouter>
                        <Link to="/">
                            <img src="/Logo2.png"
                                alt="avatardefault"
                                width="200"
                                height="auto"
                            />
                        </Link>

                        <br />

                        <Link to="/users">
                        Find People
                        </Link>

                        <br />

                        <Link to="/friends-wannabes">
                            Friends List
                        </Link>

                        <br />

                        <Link to="/chat">
                            Chat
                        </Link>

                        <Routes>
                            <Route path="/users" element={<FindPeople />}>

                            </Route>
                            <Route path="/user/:id" element={<OtherProfile />}>

                            </Route>
                            <Route path="/friends-wannabes" element={<Friends />}>

                            </Route>
                            <Route path="/chat" element={<Chat />}>

                            </Route>
                        </Routes>

                        <Profile
                            first={ this.state.first }
                            last={ this.state.last }
                            picture={ this.state.picture }
                            toggleUploader={ this.toggleUploader }
                            bio={ this.state.bio }
                            bioUpdated={ this.bioUpdated }
                            profilePic={
                                <ProfilePic
                                    picture={ this.state.picture }
                                    first={ this.state.first }
                                    last={ this.state.last }
                                    toggleUploader={ this.toggleUploader }
                                />
                            }
                        />

                        <div>
                            <img
                                src="/logout.png"
                                alt="logout icon"
                                width="50"
                                height="auto"
                                onClick={ this.logout }
                            />
                        </div>
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                uploadImage={ this.uploadImage }
                                toggleUploader={ this.toggleUploader }
                            />
                        )}

                    </BrowserRouter>
                </div>
            );
        }
    }

}