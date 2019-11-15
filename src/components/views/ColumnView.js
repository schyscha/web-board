import React from 'react';

require("../../styles/Column.css")

class ColumnView extends React.Component {

    renderTasks = () => {
        return this.props.tasks.map(task => this.renderTask(task));
    }

    renderTask = (task) => {

    }

    renderAddTask = () => {

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
                {this.renderTasks()}
                {this.renderAddTask()}
            </div>
        )
    }

}

export default ColumnView;