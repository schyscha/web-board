import React from 'react';

require("../../styles/Home.css")

class HomeView extends React.Component {

    renderProjects = () => {
        //return this.props.projects.map(project => this.renderProject(project));
    }

    renderProject = (project) => {

    }

    renderAddProject = () => {

    }

    handleDelete = e => {
        e.preventDefault();
        this.props.handleDelete(e.target);
    };

    handleEdit = e => {
        e.preventDefault()
        this.props.handleEdit(e.target)
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.handleSubmit(e.target)
    }

    render() {
        return (
            <div>
                {this.renderProjects()}
                {this.renderAddProject()}
            </div>
        )
    }

}

export default HomeView;