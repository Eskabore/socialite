import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`users.json?q=${query}`, {
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return [];
                }
            })
            .then((usersData) => {
                setUsers(usersData);
            });
    }, [query]);

    return (
        <div>
            <p>Search People Bar:</p>

            <input
                autoComplete="off"
                type="text"
                name="query"
                onChange={(e) => setQuery(e.currentTarget.value)}
                value={query}
                placeholder="Who you want to search"
            />

            <ul>
                {users.map(({ id, first, last, picture }) => (
                    <li key={id}>
                        <Link to={`/user/${id}`}>
                            <ul>
                                <img
                                    src={picture || "/avatardefault.png"}
                                    alt={`${first} ${last}`}
                                />
                                {first} {last}
                            </ul>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
