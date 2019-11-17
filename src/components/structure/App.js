import React from 'react';
import '../../styles/App.css';
import { withRouter } from "react-router-dom";
import Navbar from "./Navbar"
import Routes from "./Routes"

require("../../styles/App.css");

const API = "http://localhost:3000/"

class App extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <Routes api={API} />
            </div>
        )
    }
}

export default withRouter(App);
