import React from 'react';
import BoardView from '../views/BoardView';
import { ColumnService } from '../../services/ColumnService';

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.boardReference = this.props.boardReference; //TODO przekazywac database reference tak jak z Home do Project
        this.columnService = new ColumnService();
        this.state = {
            columns: []
        }
    }

    componentDidMount() {
        this.setDatabaseListener();
    }

    handleSubmit = data => {
        const columnName = data.name;
        const order = data.order;
        this.columnService.addColumn(columnName, order, this.boardReference);
    }

    handleEdit = data => {
        const name = data.columnName;
        const newColumnObject = data.newColumnObject;
        this.columnService.editColumn(name, newColumnObject, this.boardReference);
    }

    handleDelete = data => {
        const name = data.name;
        this.columnService.deleteColumn(name, this.boardReference);
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

    setDatabaseListener() {
        this.columnService.columnRef(this.boardReference).onSnapshot(data => {
            const listOfFetchedColumns = [];
            data.docs.forEach(doc => {
                const columnReference = doc.ref;
                const data = doc.data();
                data['ref'] = columnReference;
                listOfFetchedColumns.push(data);
                console.log('fetched columns', data);
            });
            this.setState({
                columns: listOfFetchedColumns
            });
        });
    }
}

export default Board;