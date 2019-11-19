import React from "react"
import {Navbar} from "react-bootstrap";
require("../../styles/Navbar.css")

function NavBar() {
    return (
        <div>
            <Navbar variant="dark" sticky="top" expand="md">
                <div className="header">Web Board</div>
            </Navbar>
        </div>
    )

}

export default NavBar