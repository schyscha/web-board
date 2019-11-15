import React from 'react';
import HomeView from '../views/HomeView'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        //TODO: sciagniecie listy projektow z bazy
        const res = "" //zaciagniete info
        this.setState ({
            projects: res.projects
        })
    }

    handleSubmit = data => {
        //TODO: kontakt z bazą - dodanie nowego projektu
    }

    handleEdit = data => {
        //TODO: kontakt z bazą - edycja danego projektu
    }

    handleDelete = data => {
        //TODO: kontakt z bazą - usuniecie danego projektu
    }

    render() {
        return (
            <div>
                <div className="name">Projekty</div>
                <HomeView
                    projects={this.state.projects}
                    handleSubmit={this.handleSubmit}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
            </div>
        )
    }

}

export default Home;