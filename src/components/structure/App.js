import React from 'react';
import '../../styles/App.css';
import Navbar from "./Navbar"
import Home from "../controllers/Home";

require("../../styles/App.css");

export function getNick() {
    let oldNick = document.getElementById("nick").innerText;
    let newNick;
    while (true) {
        newNick = prompt("Wprowadź swój nick: ", oldNick);
        if (newNick === "") {
            continue;
        }
        if (newNick == null) {
            if (oldNick === "") {
                continue;
            } else {
                break;
            }
        }
        document.getElementById("nick").innerText = newNick;
        break;
    }
}

class App extends React.Component {
    componentDidMount() {
        setTimeout(function () {
            getNick();
        }, 150);
    }

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
