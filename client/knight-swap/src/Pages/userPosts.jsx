import React from 'react'
import { useEffect } from 'react';
import { useState} from "react";
import { jwtDecode } from 'jwt-decode';
import "../CSS/add-view.css";

export default function UserPosts() {

    // User Object ID
    const { id: sellerId } = jwtDecode(localStorage.getItem('token'));

    const [userPosts, setUserPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [loading, setLoading] = useState();
    const [Data, setData] = useState({});

    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState(new Set());

    const [locations, setLocations] = useState([]);
    const [PostImage, setPostImage] = useState();

    // Fetch User's Posts
    useEffect(() => {
        const fetchUserPosts = async () => {
            const response = await fetch(`http://localhost:8080/items?sellerId=${sellerId}`);
            const data = await response.json();
            setUserPosts(data);

            if (data.length === 0) {
            setLoading(false);
            } else {
            setLoading(true);
            }
        };
        fetchUserPosts();
    }, [sellerId]);

    // If in Editing mode, fetch all the tags and locations
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
    
    // If in Editing mode, save tag selections
    function Tags(id) {
        setTagsSelected(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    // Set info for specifc User Post
    const EditPost = (post) => {
        setEditingPost(post._id);
        setData({
            title: post.title,
            description: post.description,
            image: post.image,
            price: post.price,
            pickupTime: post.pickupTime,
            location: post.location,
            tags: post.tags.map(tag => tag._id),
        });
        
        setTagsSelected(new Set(post.tags.map(tag => tag._id)))
    };

    // 
    async function imageHandle(event) {
        const file = event.target.files[0];
        if (!file) return;

        Data.image = (URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("http://localhost:8080/upload", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        setPostImage(data.imagePath);
    }

    // Delete User's Post
   async function DeletePost(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

        await fetch(`http://localhost:8080/items/${id}`, {
            method: "DELETE"
        });
        setUserPosts(userPosts.filter(post => post._id !== id));

        alert("Item deleted successfully!");
    }

    // Save User's Edit
    async function Save(id) {
        if (!Data.title || !Data.description || !Data.price || !Data.pickupTime || !Data.location || tagsSelected.size === 0) {
            alert("Warning! Please fill out all fields before submitting.");
            return;
        }

        const data = {
            title: Data.title,
            description: Data.description,
            price: Data.price,
            pickupTime: Data.pickupTime,
            tags: [...tagsSelected],
            location: Data.location,
            image: PostImage
        };

        const response = await fetch(`http://localhost:8080/items/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const res = await fetch(`http://localhost:8080/items?sellerId=${sellerId}`);
        const updated = await res.json();
        setUserPosts(updated);

        setEditingPost(null);
    }

    return (
        <>
            <div id="title"> <p className="h2">USER'S POSTS</p> </div>

            <div className="post-container" >
                {loading === false ? (
                    <label className="item-label" style={{ fontSize: "1.25rem" }}>CURRENTLY NO POSTED ITEMS.</label>
                ) : (
                    userPosts.map((post) => (
                        <div id="posts" key={post._id} className="item rounded">
                                    {editingPost === post._id ? (
                                        <>
                                            {/* Image upload and preview */}
                                            <div id="posts-image" className="rounded">
                                                <div className="m-4" >
                                                    <img src={Data.image} className="form-control"></img>
                                                    <input type="file" accept="image/*" onChange={imageHandle}/>
                                                </div>
                                            </div>    
                                            
                                            <div id="posts-info" className="form-control rounded border">
                                                <div className="m-4">
                                                    {/* Title, Desc, Price */}
                                                    <label className="item-label">TITLE:</label>
                                                    <input name="title" className="form-control" value={Data.title} onChange={(e) => setData({...Data, title: e.target.value})} />
                                                    <label className="item-label">DESCRIPTION:</label>
                                                    <textarea name="description" className="form-control" value={Data.description} onChange={(e) => setData({...Data, description: e.target.value})}></textarea>
                                                    <label className="item-label">PRICE:</label>
                                                    <div id="price-input"><input type="number" className="form-control"value={Data.price} onChange={(e) => setData({...Data, price: e.target.value})} /></div>
                                                    {/* Tags */}
                                                    <div className="col m-2">
                                                        <label className="item-label">TAGS:</label>
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
                                                    {/* Locations */}
                                                    <label className="item-label">LOCATION:</label>
                                                    <select className="form-control" value={Data.location._id} onChange={(e) => setData({ ...Data, location: e.target.value })} name="location">
                                                        <option value="">Select a location</option>
                                                        {locations.map((loc) => (
                                                            <option key={loc._id} value={loc._id}>
                                                            {loc.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {/* Pickup Time */}
                                                    <label className="item-label">PICKUP TIME:</label>
                                                    <input className="form-control" name="pickupTime" value={Data.pickupTime} onChange={(e) => setData({...Data, pickupTime: e.target.value})} />
                                                    
                                                    
                                                </div>
                                            </div>
                                            {/* Save and Cancel Buttons */}
                                            <div id="posts-buttons" className="d-flex flex-column">
                                                <button id='save'className="m-4" onClick={() => Save(post._id)}>SAVE</button>
                                                <button id='cancel'className="m-4" onClick={() => setEditingPost(null)}>CANCEL</button>
                                            </div>
                                        </>
                                        ) : (
                                        <>
                                            <div id="posts-image" className="rounded">
                                                <div className="m-4" >
                                                    <img src={post.image} alt={post.title} 
                                                    className="item-image form-control rounded"/>
                                                </div>
                                            </div>

                                            <div id="posts-info" className="form control rounded border">
                                                <div className="m-4">
                                                    
                                                    <h3 id="title">{post.title}</h3>
                                                    <label className="item-label">DESCRIPTION:</label>
                                                    <p>{post.description}</p>
                                                    <label className="item-label">PRICE:</label>
                                                    <p>${post.price}</p>
                                                    <label className="item-label">TAGS:</label>
                                                    <p>{post.tags.map(tag => tag.name).join(", ")}</p>
                                                    <label className="item-label">LOCATION:</label>
                                                    <p>{post.location.name}</p>
                                                    <label className="item-label">PICKUP TIME:</label>
                                                    <p>{post.pickupTime}</p>
                                                </div>
                                            </div>
                                            {/* Edit and Delete Buttons */}
                                            <div id="posts-buttons" className="d-flex flex-column">
                                                <button id='edit'className="m-4" onClick={() => EditPost(post)}>EDIT</button>
                                                <button id='delete'className="m-4" onClick={() => DeletePost(post._id)}>DELETE</button>
                                            </div> 
                                        </>
                                    )}
                        </div>
                    ))
                )}
            </div>
        </>
    )
}