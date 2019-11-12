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
    }

    render() {
        return (
            <TaskView comments={this.state.comments}/>
        )
    }

}

export default Task;