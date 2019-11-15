import React from 'react';

require("../../styles/Project.css")

class ProjectView extends React.Component {

    renderBoards = () => {
        return this.props.boards.map(board => this.renderBoard(board));
    }

    renderBoard = (project) => {
        
    }

    renderAddBoard = () => {

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
                {this.renderBoards()}
                {this.renderAddBoard()}
            </div>
        )
    }
}

export default ProjectView;