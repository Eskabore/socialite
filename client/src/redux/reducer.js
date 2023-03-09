import { combineReducers } from "redux";
import friendsReducer from "./friends/slice";
import messagesReducer from "./messages/slice";

const reducer = combineReducers({
    friends: friendsReducer,
    messages: messagesReducer
});

export default reducer;