import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { socket } from "../src/socket";

export default function Chat() {
    // Declare state variables using the useState hook
    const [draft, setDraft] = useState("");

    // Declare a state variable to store any error that may occur while fetching messages
    const [error, setError] = useState(null);

    const containerRef = useRef(null);

    // Add error handling in the useSelector hook
    const messages = useSelector((state) => {
        try {
            return state.messages;
        } catch (error) {
            setError(error);
        }
    });

    // Use the useEffect hook to update the scrollTop property of the container element when a new message is added
    useEffect(() => {
        // Scroll to the last message
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [messages]); // The array ensures that the effect only runs when the messages array changes

    // Handle the key down event on the textarea element
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            // Prevent the default behavior of inserting a new line
            e.preventDefault();
            // Generate a new UUID for the message
            const messageId = uuidv4();

            // Emit a socket event to the server with the message and ID
            socket.emit("chatMessage", draft);

            setDraft("");
        }
    }

    // Handle the click event on the button element
    function handleClick() {
    // Generate a new UUID for the message
        const messageId = uuidv4();

        // Emit a socket event to the server with the message and ID
        socket.emit("chatMessage", draft);

        setDraft("");
    }

    // Return null if there are no messages
    if (!messages) {
        return null;
    }

    // Use a fragment to avoid unnecessary divs
    const allMessages = (
        <div>
            {messages.map((message) => (
                <div key={message.id}>
                    <Link to={`/user/${message.sender_id}`}>
                        <div>
                            <img
                                src={
                                    message.picture || "/avatardefault.png"
                                }
                            />
                            <div>
                                <p>
                                    {message.first} {message.last}:</p>
                                <p>{message.message}</p>
                                
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );


    // Display an error message if there is an error
    if (error) {
        return <p>An error occurred while fetching messages: {error.message}</p>;

    } else {

        return (
            <div>
                <p>Welcome to our open chat:</p>
                <div className="conatiner-chat" ref={containerRef}>
                    {!messages.length && (
                        <p>Sorry, but there are no messages yet.</p>
                    )}
                    {!!messages.length && (<div ref={containerRef}>{allMessages}</div>)}
                </div>
                <div >
                    <textarea
                        value={draft}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="write your chat message here …"
                    />
                    <button onClick={handleClick} disabled={draft === ""}>
          SAVE
                    </button>
                </div>
            </div>

        );
    }
}
