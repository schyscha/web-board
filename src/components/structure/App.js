import React from 'react';
import '../../styles/App.css';
import Navbar from "./Navbar"
import Home from "../controllers/Home";

require("../../styles/App.css");

class App extends React.Component {

    render() {
        return (
            <div>
                <Navbar/>
                <Home/>
            </div>
        )
    }
}

export default App;
