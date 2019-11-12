import React from 'react';
import ColumnView from '../views/ColumnView'

class Column extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        //TODO: sciagniecie z bazy listy taskow dla danego id kolumny
    }

    render() {
        return (
            <ColumnView tasks={this.state.tasks}/>
        )
    }

}

export default Column;