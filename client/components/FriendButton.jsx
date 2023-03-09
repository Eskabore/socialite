import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * The GET route should send back to the client the **information that is required** for the FriendButton to render when it mounts.
 * */
export default function FriendButton () {

    const { id } = useParams();

    const [ textButton, setTextButton ] = useState("");


    useEffect(() => {

        // Fetch info from profile owner
        fetch(`/friendshipstatus/${id}.json`)
            .then((res) => {
                console.log("THisis the response objecrt from Friend Buttton", res);
                return res.json();
            })
            // After comparing
            // set new State/Text
            .then((res) => {
                setTextButton(res);
            });
    });

    function handleClick() {
        console.log("FriendButton's button has been triggered");

        if (textButton === "send friend request") {
            fetch(`/send-friend-request/${id}.json`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    return setTextButton(res);
                });
        } else if (textButton === "accept friend request") {
            fetch(`/accept-friend-request/${id}.json`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    return setTextButton(res);
                });
        } else if (textButton === "cancel friend request") {
            fetch(`/end-friendship/${id}.json`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    return setTextButton(res);
                });
        } else { // (textButton === "unfriend")
            fetch(`/end-friendship/${id}.json`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    return setTextButton(res);
                });
        }

    }

    return (
        <div>
            <button type="button" onClick={ handleClick }>
                { textButton }
            </button>
        </div>
    );
}