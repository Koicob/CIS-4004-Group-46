import React from 'react'
import { useState } from "react";
import { AddItemPage, UserPostsPage, HomePage, OffersPage } from './main';

export default function Menu() {
    const [activePage, setActivePage] = useState("HOME");

    function handleNavClick(page) {
        setActivePage(page);
        ({
            "HOME": () => HomePage(),
            "ADD_ITEM": () => AddItemPage(),
            "OFFERS": () => OffersPage(),
            "POSTS": () => UserPostsPage()
        }) [page]();
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark w-100">
            <div className="container-fluid" style={{ cursor: "pointer"}}>
                <h2 className="navbar-brand">Knight Swap</h2>
                <ul className="navbar-nav">
                <li className="nav-item">
                     <a className={`nav-link ${activePage === "HOME" ? "active" : ""}`}
                     onClick={() => handleNavClick("HOME")}>HOME</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activePage === "ADD_ITEM" ? "active" : ""}`}
                    onClick={() => handleNavClick("ADD_ITEM")}>ADD ITEM</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activePage === "OFFERS" ? "active" : ""}`} 
                    onClick={() => handleNavClick("OFFERS")}>OFFERS</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activePage === "POSTS" ? "active" : ""}`} 
                    onClick={() => handleNavClick("POSTS")}>POSTS</a>
                </li>
                </ul>
            </div>
            </nav>
        </>
    )
}