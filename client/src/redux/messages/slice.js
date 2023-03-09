export default function messagesReducer(state = null, action) {
    switch (action.type) {
                    case 'chat/chatMessages':
                        return action.payload.messages;
                    case 'chat/chatMessage':
                        return [...state, action.payload.message];
                    default:
                        return state;
    }
}

export function chatMessages(messages) {
    return {
        type: 'chat/chatMessages',
        payload: { messages },
    };
}

export function chatMessage(message) {
    return {
        type: 'chat/chatMessage',
        payload: { message },
    };
}
