import React from 'react';

require("../../styles/Task.css");
require("../../styles/Comment.css");

class TaskView extends React.Component {

    renderComments = () => {
        return this.props.comments.map(comment => this.renderComment(comment));
    };

    renderComment = (comment) => {

    };

    renderAddComment = () => {

    };

    handleDelete = e => {
        e.preventDefault();
        this.props.handleDelete(e.target);
    };

    handleEdit = e => {
        e.preventDefault();
        this.props.handleEdit(e.target)
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleSubmit(e.target)
    };

    render() {
        return (
            <div>
                {this.renderComments()}
                {this.renderAddComment()}
            </div>
        )
    }
}

export default TaskView;