import React from 'react';
import TaskView from '../views/TaskView'

class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        //TODO: sciagniecie z bazy listy komentarzy dla danego id taska
        const res = "" //zaciagniete info
        this.setState ({
            comments: res.comments
        })
    }

    handleSubmit = data => {
        //TODO: kontakt z bazą - dodanie nowego komentarza
    }

    handleEdit = data => {
        //TODO: kontakt z bazą - edycja danego komentarza
    }

    handleDelete = data => {
        //TODO: kontakt z bazą - usuniecie danego komentarza
    }

    render() {
        return (
            <div>
                <div className="name">Zadanie <u>{this.props.name}</u></div>
                <TaskView
                    comments={this.state.comments}
                    handleSubmit={this.handleSubmit}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
            </div>
        )
    }

}

export default Task;