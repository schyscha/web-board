import React from "react"
import {Navbar} from "react-bootstrap";
import {withRouter, Link} from "react-router-dom"

require("../../styles/Navbar.css")

function NavBar() {
    return (
        <div>
            <Navbar variant="dark" sticky="top" expand="md">
                Top Bar
            </Navbar>
        </div>
    )

}

export default withRouter(NavBar)