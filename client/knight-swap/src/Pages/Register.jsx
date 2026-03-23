import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const navigate = useNavigate();

    const handleRegisterSubmit = async (event) => {
        event.preventDefault(); 

        let newUserData = {
            username: usernameInput,
            password: passwordInput,
            role: "user" 
        };

        try {
            let response = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserData)
            });

            // Check if the server says the creation was successful
            if (response.ok === true) {
                alert("Account created! You can now log in.");
                
                navigate("/"); 
            } else {
                alert("Error: That username might already be taken.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Register for Knight Swap</h2>
            
            <form onSubmit={handleRegisterSubmit}>
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
                
                <button type="submit">Create Account</button>
            </form>
            
            <br /><br />
            <button onClick={() => navigate("/")}>Go back to Login</button>
        </div>
    );
}