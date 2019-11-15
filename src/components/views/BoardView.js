import React from 'react';

require("../../styles/Board.css")

class BoardView extends React.Component {

    renderColumns = () => {
        return this.props.columns.map(column => this.renderColumn(column));
    }

    renderColumn = (column) => {

    }

    renderAddColumn = () => {

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
                {this.renderColumns()}
                {this.renderAddColumn()}
            </div>
        )
    }

}

export default BoardView;