import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function HomePage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setInLoggedIn(true);
    };

    const handleLogout = () => {
        setInLoggedIn(false);
    };

    return (
        <div>
          <h1>Welcome to our Website!</h1>
          {isLoggedIn ? (
            <div>
              <p>You are logged in.</p>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <p>Please log in to access our site.</p>
              <Button variant="contained">
              <Link to="/login">Login</Link>
              </Button>
              <Button variant="contained">
                <Link to="/registration">Register</Link>
              </Button>
            </div>
          )}
        </div>
      );
    }