import React from 'react';
import ProjectView from '../views/ProjectView'

class Project extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            boards: []
        }
    }

    componentDidMount() {
        //TODO: sciagniecie z bazy listy boardow dla danego id projektu
    }

    render() {
        return (
            <ProjectView boards={this.state.boards}/>
        )
    }

}

export default Project;