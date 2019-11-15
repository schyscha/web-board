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
        const res = "" //zaciagniete info
        this.setState ({
            tasks: res.tasks
        })
    }

    handleSubmit = data => {
        //TODO: kontakt z bazą - dodanie nowego taska
    }

    handleEdit = data => {
        //TODO: kontakt z bazą - edycja danego taska
    }

    handleDelete = data => {
        //TODO: kontakt z bazą - usuniecie danego taska
    }

    render() {
        return (
            <div>
                <div className="name">Zakładka <u>{this.props.name}</u></div>
                <ColumnView
                    tasks={this.state.tasks}
                    handleSubmit={this.handleSubmit}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
            </div>
        )
    }

}

export default Column;