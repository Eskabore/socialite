/* friends = state, state is Array */

const initialState = [];
// A. Reducer
export default function friendsReducer (state = initialState, action) {
    switch (action.type) {

                    case 'friends/received':
                        return action.payload.friends;

                    case 'friends/accept':
                        return state.map(friend =>
                            friend.id === action.payload.id
                                ? { ...friend, accepted: true }
                                : friend
                        );

                    case 'friends/unfriend':
                        return state.filter(friend => friend.id !== action.payload.id);

                    default:
                        return state;
    }

}

// B. Action creators
export function receiveFriends (friends) {
    return {
        type: 'friends/received',
        payload: {friends}
    };
}

export function acceptFriend (id) {
    return {
        type: 'friends/accept',
        payload: id
    };
}

export function unfriend (id) {
    return {
        type: 'friends/unfriend',
        payload: id
    };
}