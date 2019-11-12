import React from "react"
import { Route, Switch } from "react-router-dom"
import Board from "../controllers/Board"
import Column from "../controllers/Column"
import Comment from "../controllers/Comment"
import Home from "../controllers/Home"
import Project from "../controllers/Project"
import Task from "../controllers/Task"
import NotFound from "../views/NotFoundView"

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/"
                    render={() => <Home api={this.props.api}/> }
                />
                <Route
                    path="/board"
                    render={() => <Board api={this.props.api}/> }
                />
                <Route
                    path="/column"
                    render={() => <Column api={this.props.api}/> }
                />
                <Route
                    path="/comment"
                    render={() => <Comment api={this.props.api}/> }
                />
                <Route
                    path="/project"
                    render={() => <Project api={this.props.api}/> }
                />
                <Route
                    path="/task"
                    render={() => <Task api={this.props.api}/> }
                />
                <Route
                    component={NotFound}
                />
            </Switch>
        )
    }
}

export default Routes;