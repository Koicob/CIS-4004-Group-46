import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    

    const authContext = useContext(AuthContext); 
    const loginFunction = authContext.login; 
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault(); 

        let loginData = {
            username: usernameInput,
            password: passwordInput
        };

        try {
            let response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok === true) {
                let responseData = await response.json();
                
                let loggedInUser = responseData.user;
                
                loginFunction(loggedInUser);
                
                alert("Login successful!");
                navigate("/seller"); 
            } else {
                alert("Login failed. Please check your username and password.");
            }
        } catch (error) {
            console.log(error);
            alert("Could not connect to the server.");
        }
    };

    return (
        <div>
            <h2>Login to Knight Swap</h2>
            
            <form onSubmit={handleLoginSubmit}>
                <label>Username: </label>
                <input 
                    type="text" 
                    onChange={(event) => setUsernameInput(event.target.value)} 
                    required 
                />
                
                <br /><br />
                
                <label>Password: </label>
                <input 
                    type="password" 
                    onChange={(event) => setPasswordInput(event.target.value)} 
                    required 
                />
                
                <br /><br />
                
                <button type="submit">Log In</button>
            </form>

            <br /><br />
            
            <p>Don't have an account?</p>
            <button onClick={() => navigate("/register")}>Go to Register Page</button>
        </div>
    );
}