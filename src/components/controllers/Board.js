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
    }

    render() {
        return (
            <BoardView columns={this.state.columns}/>
        )
    }

}

export default Board;