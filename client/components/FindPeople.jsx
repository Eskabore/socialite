import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {

    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetch(`users.json?q=${query}`, { // New route
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return [];
            }
        })
            .then(usersData => {
                setUsers(usersData);
            });
    }, [query]);

    return(
        <div>
            <p>
                Search People Bar:
            </p>

            <input
                autoComplete="off"
                type="text"
                name="query"
                onChange={ (e) => setQuery(e.currentTarget.value) }
                value={query}
                placeholder="Who zou want to seach"
            />

            {/* Using unordered list for fooping */}

            <ul>
                {
                    users.map(
                        (user) => {
                            return (
                                <li  key={ user.id }>
                                    <Link to={`/user/${user.id}`}>
                                        <ul>
                                            <img
                                                src={ user.picture || "/avatardefault.png" }
                                                alt={`${user.first} ${user.last}`}
                                            />
                                            { user.first } { user.last }

                                        </ul>
                                    </Link>
                                </li>
                            );
                        }
                    )}
            </ul>

        </div>
    );

}