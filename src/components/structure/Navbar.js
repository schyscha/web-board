import React from "react"
import {Navbar} from "react-bootstrap";
import {getNick} from "./App"

require("../../styles/Navbar.css")

function NavBar() {
    return (
        <div>
            <Navbar variant="dark" sticky="top" expand="md">
                <div className="hello">
                    <span>Witaj&nbsp;</span>
                    <span id="nick"></span>
                    <span>!</span>
                    <form>
                        <input type="button" value="Zmień nick" onClick={getNick}/>
                    </form>
                </div>
                <div className="header">Web Board</div>
            </Navbar>
        </div>
    )
}

export default NavBar