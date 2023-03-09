import { io } from "socket.io-client";

import { chatMessages, chatMessage } from "../../client/src/redux/messages/slice";

export let socket;

//               SOCKET.IO                //
export const init = (store) => {

    if (!socket) {
        socket = io.connect();

        // Load last 10 chat messages
        socket.on("chatMessages", (messages) => {
            // bringing messages into redux store
            store.dispatch(chatMessages(messages));
        });

        // Some user wrote a new message
        socket.on("chatMessage", (message) => {
            // bringing message into redux store
            store.dispatch(chatMessage(message));
        });
    }
};
