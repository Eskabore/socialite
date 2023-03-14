import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import HomePage from './HomePage';

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <div>
                <a className='button' href='/registration'>Register here</a>
            </div>
            <div>
                <a className='button' href='/login'>Log In</a>
            </div>
            <div>
                <a className="button" href="/logout">Log out</a>
            </div>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/"  element={<HomePage />}>
                        </Route>
                        <Route path="/registration" element={<Registration />}>
                        </Route>
                        <Route path="/login" element={<Login />}>
                        </Route>
                        <Route path="/password" element={<ResetPassword />}>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}