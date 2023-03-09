import { createRoot } from "react-dom/client";

/* This is newly added */
import configureStore from "./redux/store/store";
import { applyMiddleware } from "redux";

import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer";
import { Provider } from "react-redux";

// Socket.io
import { init } from "./socket";

import  Welcome  from "../components/Welcome";
import App from "../components/App";

const root = createRoot(document.querySelector("main"));

/* This is newly added */
const store = configureStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

// PART 1 - STEP 4
// Make 'fetch' request to check if user is logged in
fetch('/user/id.json')
    .then(response => response.json())
    .then(data => {
        console.log("data userId: ", data.userId);

        // If registration is successfull renders logo
        if (data.userId) {

            init(store);

            root.render(
                <Provider store={ store }>
                    <App />
                </Provider>
            );
        } else {
            // If registrationhas failed, render Welcome
            root.render(
                <div>
                    <Welcome />This is the root Welcome() rendering
                </div>);
        }
    })
;