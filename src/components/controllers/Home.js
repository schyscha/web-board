import React from 'react';
import HomeView from '../views/HomeView'
import { ProjectService } from '../../services/ProjectService';
import { ChatService } from '../../services/ChatService';
import * as hash from 'object-hash';
import {connect} from "react-redux";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.projectService = new ProjectService();
        this.chatService = new ChatService();
        this.state = {
            projects: [],
            messages: []
        }
    }

    componentDidMount() {
        this.setDatabaseListener();
        this.setChatListener();
    }

    handleSubmit = async data => {
        const projectName = data.projectName;
        this.projectService.addProject(projectName);
    }

    handleEdit = (name, newName) => {
        this.projectService.editProject(name, newName);
    }

    handleDelete = async data => {
        this.projectService.deleteProject(data);
    }

    addMessage = async (content) => {
        this.chatService.addMessage(content, this.props.author);
    }

    render() {
        return (
            <HomeView
                key={hash(this.state.messages)}
                projects={this.state.projects}
                handleSubmit={this.handleSubmit}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                addMessage={this.addMessage}
                messages={this.state.messages}
            />
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
            });
            this.setState({
                projects: listOfFetchedProjects
            });
        });
    }

    setChatListener() {
        this.chatService.messagesRef().onSnapshot(snap => {
            const arr = snap.data().messages;
            this.setState({messages: arr});
        });
    }
}

const mapStateToProps = state => {
    return {
        author: state.nick
    };
};

export default connect(mapStateToProps, null)(Home);