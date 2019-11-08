import React from 'react';
import './App.css';
import { withRouter } from "react-router-dom";


require("./App.css");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        //
    }

    render() {
        return (
            <div>
            Hello world!
            </div>
        )
    }
}

export default App;
