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
    const [sellerInfo, setSellerInfo] = useState(null);


    
    // Fetch Specifc Item Post
    useEffect(() => {
        const fetchUserPost = async () => {
            const response = await fetch(`http://localhost:8080/items/${id}`);
            const data = await response.json();
            setUserPost(data);

            const response2 = await fetch(`http://localhost:8080/users?sellerId=${data.sellerId}`);
            const userData = await response2.json();
            setSellerInfo(userData[0]);
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
            sellerId: userPost.sellerId,
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
    if (!sellerInfo) return <p>Loading...</p> 

    return (
        <>
            <div className="item-container" style={{backgroundColor: "#1a1a1a", minHeight: "100vh" }}>
                {/* Display Item Post */}
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
                                <label className="item-label">SELLER USERNAME:</label>
                                <p><strong>{sellerInfo.username}</strong></p>
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

                {/* Offer Submission Form */}
                {buyerID === userPost.sellerId ? (
                    <div id="postOffer">
                        <div id="title"><h2 className="offer">THIS IS YOUR POST.</h2></div>
                    </div>
                ) : (
                    <div id="postOffer">
                        <div id="title"><h2 className="offer">MAKE AN OFFER:</h2></div>
                        <div className="col m-4">
                            <label className="item-label">INPUT BID PRICE:</label>
                                <div id="price-input">
                                    <input id="info-insert" type="number" className="form-control" 
                                    value={bid} onChange={(e) => setBid(e.target.value)} />
                                </div>
                            <br></br>
                            <label className="item-label">MESSAGE TO SELLER:</label>
                            <br></br>
                            <label id="reference">*PLEASE TELL SELLER SPECIFC DATE/TIME</label>
                                <div id="description">
                                    <textarea id="info-insert" type="text" className="form-control" 
                                    value={message} onChange={(e) => setMessage(e.target.value)} />
                                </div>
                        </div>
                        <div className ="col m-4"><button className="submit-button" onClick={() => {handleSubmit()}}>SEND OFFER</button></div> 
                    </div>
                )}
            </div>
        </>                                        
    )
}