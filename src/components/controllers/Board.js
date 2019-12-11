import React from 'react';
import BoardView from '../views/BoardView';
import {ColumnService} from '../../services/ColumnService';

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.boardReference = this.props.boardReference;
        this.columnService = new ColumnService();
        this.state = {
            columns: []
        }
    }

    componentDidMount() {
        this.setDatabaseListener();
    }

    handleSubmit = (columnName, order) => {
        this.columnService.addColumn(columnName, order, this.boardReference);
    }

    handleEdit = (name, newColumnName, newColumnOrder) => {
        this.columnService.editColumn(name, newColumnName, newColumnOrder, this.boardReference);
    }

    handleDelete = data => {
        const name = data.id;
        this.columnService.deleteColumn(name, this.boardReference);
    }

    render() {
        return (
            <BoardView
                columns={this.state.columns}
                handleSubmit={this.handleSubmit}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
            />
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
            });
            listOfFetchedColumns.sort((a, b) => (a.order > b.order) ? 1 : -1)
            this.setState({
                columns: listOfFetchedColumns
            });
        });
    }
}

export default Board;
