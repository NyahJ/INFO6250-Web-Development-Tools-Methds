import React, { useState } from "react";
import Game from "./Game";
import verify from "./verify";

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        loginResult(username);
    };

    const loginResult = (username) => {
        const isValidUsername = verify(username);
        setIsLoggedIn(isValidUsername);

        if (!isValidUsername) {
            if (username.toString().toLowerCase() === "dog") {
                setMessage(`Sorry, you are not a valid user :(`);
            } else {
                setMessage(`Sorry, your username was not made up of valid characters.`);
            }
        }
    }


    return (
        <div>
            { isLoggedIn
            ?<div>
                <Game/>
             </div>
            :<div>
                <h2> Login the Game using your username: </h2>
                <form>
                    <input
                        placeholder="Type here"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="button" onClick={handleClick}>Login </button>
                </form>
                <p className="verify-message">{message}</p>
            </div>}
        </div>
    );
};

export default Login;