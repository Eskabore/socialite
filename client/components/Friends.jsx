import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { receiveFriends, acceptFriend, unfriend } from "../src/redux/friends/slice";

export default function Friends() {

    const dispatch = useDispatch();

    // Grab the friendship wannabes from the Redux storefriendswannabes = useSelector((friends) => {
    // Do this check to avoid errors when
    // there are no friends yet.
    const wannabes = useSelector((state) =>
        state.friends && state.friends.filter(
            (friends) => !friends.accepted
        )
    );

    // Grab the friends from the Redux store
    const friends = useSelector((state) =>
        // ...
        state.friends && state.friends.filter(
            (friends) => friends.accepted
        )
    );

    // load data from server and pass it to redux
    // only when the component first loads!
    useEffect(() => {
        // - fetch friend data (friends & friendship wannabes) from server
        // - pass it to redux
        // - redux will update our data, because we use useSelector above!
        // `data` is fetched server data.
        fetch("/friends-wannabes.json")
            .then((res) => {
                console.log("useEffect reponse is: ", res);
                return res.json();
            })
            .then((data) => {
                console.log("useEffect dispacth block is: ", data);
                dispatch(receiveFriends(data));
            });
    }, []); // Return array of friends

    // function to accept a single user
    // param: user's id!
    const handleAccept = (friendsId) => {
        console.log("'accept friend request' button triggered. friendsId is: ", friendsId);
        // 1. make a POST request (fetch) to update the server
        // 2. make sure update was successful on server
        // 3. prepare an action for our reducer
        // 4. dispatch action to reducer
        fetch(`/accept-friend-request/${friendsId}.json`, {
            method: 'POST'
        })
            .then(() => {
                dispatch(acceptFriend(friendsId));
            });
    };

    const handleUnfriend = (friendsId) => {
        console.log("'cancel request' OR 'unfriend' button has been triggered, friendsId is: ", friendsId);

        fetch(`/end-friendship/${friendsId}.json`, {
            method: 'POST'
        })
            .then(() => {
                dispatch(unfriend(friendsId));
            });
    };

    if (!friends || !wannabes) {
        return [];
    }

    const myWannabes = (
        <div>
            <ul>
                <h2>Friendship wannabes</h2>
                {wannabes.map((wannabe) => (
                    <div key={ wannabe.id }>

                        <p>Info about the person who wwant to be friend</p>

                        <Link to={`/user/${wannabe.id}`}>
                            <img
                                src={ wannabe.picture || "/avatardefault.png" }
                                alt={ wannabe.first }
                            />

                            <p>
                                { wannabe.first } { wannabe.last }
                            </p>
                        </Link>

                        <button onClick={() => handleAccept(wannabe.id)}>
                            Accept
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );

    const myFriends = (
        <div>
            <ul>
                <h2>Your Friends</h2>
                {friends.map((friend) => (
                    <div key={friend.id}>

                        <p>Your friends list</p>
                        <Link to={`/user/${friend.id}`}>
                            <img
                                src={ friend.picture || "/avatardefault.png" }
                                alt={ friend.first }
                            />

                            <p>
                                { friend.first } { friend.last }
                            </p>
                        </Link>

                        <button onClick={() => handleUnfriend(friend.id)}>
                            Unfriend
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );


    return (
        <div>
            <div>
                { !friends.length && (
                    <p>
                    Sorry, you have no friends yet. Please, look for one
                    </p>
                )}

                { !!friends.length && myFriends }
            </div>

            <div>
                { !wannabes.length && (
                    <p>
                    Sorry, you have no friends requests yet
                    </p>
                )}
                { !!wannabes.length && myWannabes }
            </div>
        </div>
    );
}