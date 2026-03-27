import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import defaultImage from "../assets/loadImage.png";
import "./add-view.css";

export default function AddItem() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(defaultImage);

    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [pickupTime, setPickupTime] = useState("");

    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState(new Set());
    
    const [locations, setLocations] = useState([])
    const [location, setLocation] = useState("");

    // Fetch tags and locations for dropdowns
    useEffect(() => {
        async function fetchTags() {
            const res = await fetch("http://localhost:8080/tags");
            const data = await res.json();
            setTags(data);
        }
        fetchTags();
    }, []);

    useEffect(() => {
        async function fetchLocations() {
            const res = await fetch("http://localhost:8080/locations");
            const data = await res.json();
            setLocations(data);
        }
        fetchLocations();
    }, []);

    // User Object ID
    const { id: sellerId } = jwtDecode(localStorage.getItem('token'));

    // Image Configuration 
    async function imageHandle(event) {
        const file = event.target.files[0];
        if (!file) return;

        setImagePreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("http://localhost:8080/upload", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        setImage(data.imagePath);
    }

    // Save tag selection 
    function Tags(id) {
        setTagsSelected(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    // Add post to database 
    async function handleSubmit() {
        if (!title || !description || !price || !pickupTime || !location || tagsSelected.size === 0 || !image) {
            alert("Warning! Please fill out all fields before submitting.");
            return;
        }

        const newItem = {
            title,
            description, 
            price,
            pickupTime,
            sellerId,
            tags: [...tagsSelected],
            location,
            image
        }
        
        const response = await fetch("http://localhost:8080/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)});

        const data = await response.json();
            alert("Item posted successfully!");
            window.location.reload();
    }

    return (
        <>
            <div id="title">
            <p className="h2">Create a Post</p>
            </div>

            <div className="container">
                <div className="row">
                    {/* Image upload and preview */}
                    <div className="col-lg-4 bg-dark rounded">
                        <div  id="image-insert">
                            <img src={imagePreview}></img>
                        </div>
                        <div id="image-insert" className="col m-2"><input type="file" accept="image/*" onChange={imageHandle}/></div>
                    </div>

                    <div className="col-lg-7 rounded">
                        {/* Title */}
                        <div className= "col m-4">
                            <label className="form-label">NAME OF ITEM:</label>
                            <input id="info-insert" type="text" className="form-control" 
                             value={title} onChange={(e) => setTitle(e.target.value)} /> </div>
                        
                        {/* Description */}
                         <div className="col m-4">
                            <label className="form-label">DESCRIPTION OF ITEM:</label>
                            <textarea className="form-control"
                            value={description} onChange={(e) => setDescription(e.target.value)} ></textarea></div>

                        {/* Price */}
                        <div className="col m-4">
                            <label className="form-label">INPUT PRICE OF ITEM:</label>
                            <div id="price-input">
                                <input id="info-insert" type="number" className="form-control" 
                                value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="col m-4">
                            <label className="form-label">SELECT TAGS:</label>
                            <div id="tag">
                                {tags.map(tag => (
                                    <button id="tags"
                                        key=
                                        {tag._id}
                                            onClick={() => Tags(tag._id)}
                                            className={`btn rounded-pill form-label'
                                            ${tagsSelected.has(tag._id) ? "active" : ""}`}>
                                            {tagsSelected.has(tag._id) && '✓ '}
                                        {tag.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="col m-4">
                            <label className="form-label">LOCATION TO PICKUP:</label>
                            <select className="form-control" value={location} onChange={(e) => setLocation(e.target.value)}>
                                <option value="">Select a location</option>
                                {locations.map((loc) => (
                                    <option key={loc._id} value={loc._id}>
                                        {loc.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col m-4">
                            <label className="form-label">PICKUP TIME:</label>
                            <br></br>
                            <label id="reference">*Please use the following format: DOW/DOW - HH:MM-HH:MM*</label>
                            <input id="info-insert" type="text" className="form-control" style={{height: '50px'}}
                            value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}/>

                            <div className="col m-4"><button className="btn-dark rounded" onClick={() => {handleSubmit()}}>POST ITEM</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}