import { useState, useEffect } from 'react';
import '../CSS/Admin.css'; 

export default function Admin() {
    const savedUserString = localStorage.getItem("savedUser");
    let loggedInUser = null;
    
    if (savedUserString !== null) {
        loggedInUser = JSON.parse(savedUserString);
    }
    
    const [allMarketItems, setAllMarketItems] = useState([]);
    const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);
    
    const [newLocationName, setNewLocationName] = useState("");

    useEffect(() => {
        const getEverythingFromServer = async () => {
            if (loggedInUser !== null && loggedInUser.role === "admin") {
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
        };

        getEverythingFromServer();
    }, [loggedInUser]);

    const handlePromoteUser = async (userIdToPromote) => {
        try {
            let response = await fetch("http://localhost:8080/users/" + userIdToPromote, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: "admin" })
            });

            if (response.ok === true) {
                alert("User successfully promoted to Admin!");
                window.location.reload(); 
            }
        } catch (error) {
            console.log(error);
        }
    };

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

    const handleEditTitleClick = async (item) => {
        const newTitle = window.prompt("Enter a new, title for this item:", item.title);

        if (!newTitle || newTitle.trim() === "") {
            return;
        }

        try {
            let response = await fetch("http://localhost:8080/items/" + item._id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTitle })
            });

            if (response.ok === true) {
                alert("Item title successfully updated!");
                window.location.reload(); 
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateLocation = async (event) => {
        event.preventDefault();
        
        try {
            let response = await fetch("http://localhost:8080/locations", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newLocationName })
            });

            if (response.ok === true) {
                alert("New location added successfully!");
                setNewLocationName("");
                
            } else {
                alert("Failed to create location.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loggedInUser === null) {
        return <h2 className="ks-admin-error">You are not logged in.</h2>;
    }
    
    if (loggedInUser.role !== "admin") {
        return <h2 className="ks-admin-error">Access Denied: You are not an Administrator.</h2>;
    }

    return (
        <div className="ks-admin-page">
            <div className="ks-admin-header">
                <h2>Admin Control Panel</h2>
            </div>

            <h3 className="ks-admin-section-title">Database Management</h3>
            <div className="ks-admin-grid">
                <div className="ks-admin-card">
                    <h4>Add New UCF Location</h4>
                    <p>Add a new meetup spot for buyers and sellers.</p>
                    <form onSubmit={handleCreateLocation}>
                        <input 
                            type="text" 
                            className="ks-admin-input"
                            placeholder="e.g. Recreation & Wellness Center" 
                            value={newLocationName}
                            onChange={(event) => setNewLocationName(event.target.value)}
                            required
                        />
                        <button type="submit" className="ks-admin-btn">Create Location</button>
                    </form>
                </div>
            </div>
            
            <h3 className="ks-admin-section-title">All Registered Users</h3>
            <div className="ks-admin-grid">
                {allRegisteredUsers.map((u) => (
                    <div key={u._id} className="ks-admin-card">
                        <h4>{u.username}</h4>
                        <p><strong>Role:</strong> {u.role}</p>
                        <p><strong>ID:</strong> {u._id}</p>
                        
                        {u.role !== "admin" && (
                            <button 
                                className="ks-admin-btn" 
                                onClick={() => handlePromoteUser(u._id)}
                            >
                                Promote to Admin
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <h3 className="ks-admin-section-title">Marketplace Moderation</h3>
            <div className="ks-admin-grid">
                {allMarketItems.map((item) => {
                    const seller = allRegisteredUsers.find((user) => user._id.toString() === item.sellerId.toString());
                    return (            
                    <div key={item._id} className="ks-admin-card">
                        <h4>{item.title}</h4>
                        <p><strong>Seller:</strong> {seller ? seller.username : "Unknown"}</p>
                        <p><strong>Seller ID:</strong> {item.sellerId}</p>
                        <p><strong>Price:</strong> ${item.price}</p>
                        
                        <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
                            <button 
                                className="ks-admin-btn" 
                                style={{ marginTop: "0" }}
                                onClick={() => handleEditTitleClick(item)}
                            >
                                Edit Title
                            </button>
                            <button 
                                className="ks-admin-btn" 
                                style={{ marginTop: "0" }}
                                onClick={() => handleForceDeleteClick(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}