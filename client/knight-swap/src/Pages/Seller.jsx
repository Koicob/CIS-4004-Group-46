import { useState, useEffect } from 'react';

export default function Seller() {
    const savedUserString = localStorage.getItem("savedUser");
    if (savedUserString !== null) {
        loggedInUser = JSON.parse(savedUserString);
    }
    
    const [titleInput, setTitleInput] = useState("");
    const [priceInput, setPriceInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [locationInput, setLocationInput] = useState("");
    
    const [myItemsList, setMyItemsList] = useState([]);
    const [locationsList, setLocationsList] = useState([]);

    useEffect(() => {
        const getLocationsFromServer = async () => {
            try {
                let response = await fetch("http://localhost:8080/locations");
                if (response.ok === true) {
                    let data = await response.json();
                    setLocationsList(data);
                    if (data.length > 0) {
                        setLocationInput(data[0]._id);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        const getMyItemsFromServer = async () => {
            if (loggedInUser !== null) {
                try {
                    let response = await fetch("http://localhost:8080/items");
                    if (response.ok === true) {
                        let allItems = await response.json();
                        let filteredArray = [];
                        
                        for (let i = 0; i < allItems.length; i = i + 1) {
                            if (allItems[i].sellerId === loggedInUser._id) {
                                filteredArray.push(allItems[i]);
                            }
                        }
                        setMyItemsList(filteredArray);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };

        getLocationsFromServer();
        getMyItemsFromServer();
        
    }, []);

    const handleUploadSubmit = async (event) => {
        event.preventDefault(); 

        let newItemData = {
            title: titleInput,
            price: Number(priceInput),
            description: descriptionInput,
            sellerId: loggedInUser._id, 
            location: locationInput
        };

        try {
            let response = await fetch("http://localhost:8080/items", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItemData)
            });

            if (response.ok === true) {
                alert("Item uploaded successfully!");
                window.location.reload(); 
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteClick = async (itemIdToDelete) => {
        try {
            let deleteData = {
                userId: loggedInUser._id,
                role: loggedInUser.role
            };

            let response = await fetch("http://localhost:8080/items/" + itemIdToDelete, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(deleteData)
            });

            if (response.ok === true) {
                alert("Item deleted");
                window.location.reload(); 
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("savedUser");
        window.location.href = "/"; 
    };

    if (loggedInUser === null) {
        return <h2>Please log in to view the Seller Dashboard.</h2>;
    }

    return (
        <div>
            <h2>Seller Dashboard</h2>
            <p>Welcome, {loggedInUser.username}!</p>
            <button onClick={handleLogout}>Log Out</button>
            
            <hr />
            
            <h3>Upload a New Item</h3>
            <form onSubmit={handleUploadSubmit}>
                <label>Item Title: </label>
                <input type="text" onChange={(event) => setTitleInput(event.target.value)} required />
                <br /><br />
                
                <label>Price ($): </label>
                <input type="number" onChange={(event) => setPriceInput(event.target.value)} required />
                <br /><br />
                
                <label>Description: </label>
                <textarea onChange={(event) => setDescriptionInput(event.target.value)} required />
                <br /><br />
                
                <label>Pickup Location: </label>
                <select onChange={(event) => setLocationInput(event.target.value)} value={locationInput}>
                    {locationsList.map((loc) => (
                        <option key={loc._id} value={loc._id}>{loc.name}</option>
                    ))}
                </select>
                <br /><br />
                
                <button type="submit">Upload Item</button>
            </form>

            <hr />

            <h3>My Active Listings</h3>
            {myItemsList.map((item) => (
                <div key={item._id}>
                    <h4>{item.title}</h4>
                    <p>Price: ${item.price}</p>
                    <p>Description: {item.description}</p>
                    <button onClick={() => handleDeleteClick(item._id)}>Delete This Listing</button>
                    <br /><br />
                </div>
            ))}
        </div>
    );
}