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
        const res = "" //zaciagniete info
        this.setState ({
            boards: res.boards
        })
    }

    handleSubmit = data => {
        //TODO: kontakt z bazą - dodanie nowego boarda
    }

    handleEdit = data => {
        //TODO: kontakt z bazą - edycja danego boarda
    }

    handleDelete = data => {
        //TODO: kontakt z bazą - usuniecie danego boarda
    }


    render() {
        return (
            <div>
                <div className="name">Projekt <u>{this.props.name}</u></div>
                <ProjectView
                    boards={this.state.boards}
                    handleSubmit={this.handleSubmit}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
            </div>
        )
    }

}

export default Project;