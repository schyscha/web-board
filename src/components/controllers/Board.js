import React from 'react';
import BoardView from '../views/BoardView';

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: []
        }
    }

    componentDidMount() {
        //TODO: sciagniecie z bazy listy kolumn dla danego id boarda
        const res = "" //zaciagniete info
        this.setState ({
            columns: res.columns
        })
    }

    handleSubmit = data => {
        //TODO: kontakt z bazą - dodanie nowej kolumny
    }

    handleEdit = data => {
        //TODO: kontakt z bazą - edycja danej kolumny
    }

    handleDelete = data => {
        //TODO: kontakt z bazą - usuniecie danej kolumny
    }

    render() {
        return (
            <div>
                <div className="name">Panel <u>{this.props.name}</u></div>
                <BoardView
                    columns={this.state.columns}
                    handleSubmit={this.handleSubmit}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
            </div>
        )
    }

}

export default Board;