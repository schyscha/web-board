import React from 'react';
import HomeView from '../views/HomeView'
import { ProjectService } from '../../services/ProjectService';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.projectService = new ProjectService();
        this.state = {
            projects: []
        }
    }
    componentDidMount() {
        this.setDatabaseListener();
    }

    handleSubmit = async data => {
        const projectName = data.projectName;
        this.projectService.addProject(projectName);
    }

    handleEdit = data => {
        const projectName = data.name;
        const newProjectName = data.newName;
        this.projectService.editProject(projectName, newProjectName);
    }

    handleDelete = async data => {
        this.projectService.deleteProject(data);
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

    setDatabaseListener() {
        this.projectService.projectsRef().onSnapshot(data => {
            const listOfFetchedProjects = [];
            data.docs.forEach(doc => {
                const documentReference = doc.ref;
                const data = doc.data();
                data['ref'] = documentReference;
                listOfFetchedProjects.push(data);
                console.log('fetched project', data);
            });
            this.setState({
                projects: listOfFetchedProjects
            });
        });
    }
}

export default Home;