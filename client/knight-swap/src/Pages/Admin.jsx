import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Admin() {
    const authContext = useContext(AuthContext);
    const loggedInUser = authContext.user;
    
    const [allMarketItems, setAllMarketItems] = useState([]);
    const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);

    useEffect(() => {
        const getEverythingFromServer = async () => {
            if (loggedInUser !== null) {
                if (loggedInUser.role === "admin") {
                    try {
                        let itemResponse = await fetch("http://localhost:8080/items");
                        if (itemResponse.ok === true) {
                            let itemData = await itemResponse.json();
                            setAllMarketItems(itemData);
                        }

                        let userResponse = await fetch("http://localhost:8080/users");
                        if (userResponse.ok === true) {
                            let userData = await userResponse.json();
                            setAllRegisteredUsers(userData);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        };

        getEverythingFromServer();
    }, [loggedInUser]);

    const handleForceDeleteClick = async (itemIdToDelete) => {
        try {
            let deleteData = {
                userId: loggedInUser._id,
                role: loggedInUser.role 
            };

            let response = await fetch("http://localhost:8080/items/" + itemIdToDelete, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteData)
            });

            if (response.ok === true) {
                alert("Item removed by Admin");
                window.location.reload(); 
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loggedInUser === null) {
        return <h2>You are not logged in.</h2>;
    }
    
    if (loggedInUser.role !== "admin") {
        return <h2>You are not an Administrator.</h2>;
    }

    return (
        <div>
            <h2>Admin Control Panel</h2>
            <hr />
            
            <h3>All Registered Users</h3>
            <ul>
                {allRegisteredUsers.map((u) => (
                    <li key={u._id}>
                        Username: {u.username} | Role: {u.role}
                    </li>
                ))}
            </ul>

            <hr />

            <h3>Marketplace Moderation</h3>
            {allMarketItems.map((item) => (
                <div key={item._id}>
                    <h4>Item: {item.title}</h4>
                    <p>Seller ID: {item.sellerId}</p>
                    <p>Price: ${item.price}</p>
                    <button onClick={() => handleForceDeleteClick(item._id)}>Force Delete Item</button>
                    <br /><br />
                </div>
            ))}
        </div>
    );
}