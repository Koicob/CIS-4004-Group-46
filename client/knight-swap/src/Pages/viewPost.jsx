import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import "../CSS/add-view.css";


export default function ViewPost() { 

    const { id: buyerID } = jwtDecode(localStorage.getItem('token'));
    const location = useLocation();
    const {id} = location.state || {}; 

    const [userPost, setUserPost] = useState(null);
    const [bid, setBid] = useState(0);
    const [message, setMessage] = useState("");

    // Fetch Specifc Item Post
    useEffect(() => {
        const fetchUserPost = async () => {
            const response = await fetch(`http://localhost:8080/items/${id}`);
            const data = await response.json();
            setUserPost(data);
        };

        fetchUserPost();
    }, [id]);

    // Handle Offer Submission
    async function handleSubmit() {

        if (!bid || !message) {
            alert("Warning! Please fill out all fields before submitting.");
            return;
        }
        const newOffer = {
            itemId: id,
            buyerId: buyerID,
            offerPrice: bid,
            comment: message,
        }

        const response = await fetch("http://localhost:8080/offers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newOffer)});

        const data = await response.json();
            alert("Offer submitted successfully!");
            window.location.reload();
    }

    if (!userPost) return <p>Loading...</p> 

    return (
        <>
            {/* Display Item Post */}
            <div>
                <div id="post">
                    <div id="posts-image" className="rounded">
                        <div className="m-4">
                            <img src={userPost.image} alt={userPost.title}
                            className="form-control" />
                        </div>
                    </div>
                    
                    <div id="posts-info" className="rounded border">
                        <div className="m-4">
                            <h3 id="title">{userPost.title}</h3>
                            <label className="item-label">DESCRIPTION:</label>
                            <p>{userPost.description}</p>
                            <label className="item-label">PRICE:</label>
                            <p>${userPost.price}</p>
                            <label className="item-label">TAGS:</label>
                            <p>{userPost.tags.map(tag => tag.name).join(", ")}</p>
                            <label className="item-label">LOCATION:</label>
                            <p>{userPost.location.name}</p>
                            <label className="item-label">PICKUP TIME:</label>
                            <p>{userPost.pickupTime}</p>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            {/* Offer Submission Form */}
            <div className="post">
            <div id="title"> <p className="h2">MAKE AN OFFER:</p> </div>
            <div className="col m-4">
                <label className="item-label">INPUT BID PRICE:</label>
                    <div id="price-input">
                        <input id="info-insert" type="number" className="form-control" 
                        value={bid} onChange={(e) => setBid(e.target.value)} />
                    </div>
                <br></br>
                <label className="item-label">MESSAGE TO SELLER:</label>
                <br></br>
                <label id="referenceOffer">*PLEASE TELL SELLER SPECIFC DATE/TIME</label>
                    <div id="description">
                        <textarea id="info-insert" type="text" className="form-control" 
                        value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
            </div>
            <div className="col m-4"><button className="submit-button" onClick={() => {handleSubmit()}}>SEND OFFER</button></div>
            </div>
        </>                                        
    )
}