import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FriendButton from "./FriendButton";

// Importing Hooks -> functional component
export default function OtherProfile(props) {

    console.log("Other Profile id: ", id);
    // Params for url
    const { id } = useParams();
    const goHome = () => {
        // redirect with react router
        navigate("/");
    };
    const userId = props.id;


    // useNavigate hook
    const navigate = useNavigate();
    const [ user, setUser ] = useState({});

    const [ error, setError ] = useState(false);




    useEffect(() => {

        // GET (with fetch) info about user
        fetch(`/user/${id}.json`)
        // Fetching info from user
        // -> Stores it into state
            .then((res) => {

                console.log("cons log user/:id in <OP>", res);

                // If user is found ...
                if (res.ok) {

                    // User is on own Profile page
                    // Redirects to '/' using useNavigate
                    if (userId == id) {
                        navigate.replace('/');

                    } else {
                        return res.json();
                    }
                } else {
                    // (!res.ok)
                    // User not found
                    // Show error message
                    setError(true);
                    document.title = "User not found";
                }
            })
            .then((res) => {
                // Return the object
                if (res) {
                    setUser(res);
                }
            });
    }, [id, userId]);



    if (!error) {
        return (

            <div>

                <div>

                    <h1>This is the UserProfile for the user with the id {id}</h1>

                    <div>
                        <img src={user.picture  || "/avatardefault.png"} />
                    </div>

                    <div>
                        <h4>
                            { user.first } { user.last }
                        </h4>
                    </div>

                    <div>
                        <h5>
                    BIO: <br />
                        </h5>

                        <p>
                            { user.bio }
                        </p>

                        <div>
                            <FriendButton id={ id }  />
                        </div>

                    </div>

                </div>


                

            </div>
        );

    } else {
        <div>
            <p>
            ERROR !!!
            </p>
            <button onClick={goHome}>Click to go to home</button>
        </div>;
    }

}