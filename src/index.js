import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css"
import './index.css';
import App from './components/structure/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);


serviceWorker.unregister();
