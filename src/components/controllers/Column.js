import React from 'react';
import ColumnView from '../views/ColumnView'
import { TaskService } from '../../services/TaskService';

class Column extends React.Component {
    constructor(props) {
        super(props)
        this.columnReference = this.props.columnReference;
        this.taskService = new TaskService();
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        this.setDatabaseListener();
    }

    handleSubmit = data => {
        const estimatedTime = data.estimatedTime;
        const name = data.name;
        const order = data.order;
        this.taskService.addTask(estimatedTime, 0, name, order, this.columnReference);
    }

    handleEdit = data => {
        const name = data.name;
        const newName = data.newName;
        const estimatedTime = data.estimatedTime;
        const order = data.order;
        this.taskService.editTask(name, newName, estimatedTime, order, this.columnReference);
    }

    handleDelete = name => {
        this.taskService.deleteTask(name, this.columnReference);
    }

    handleLogTime = data => {
        const name = data.name
        const time = data.time
        this.taskService.setLoggedTime(name, time, this.columnReference)
    }

    render() {
        return (
                <ColumnView
                    tasks={this.state.tasks}
                    handleSubmit={this.handleSubmit}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    handleLogTime={this.handleLogTime}
                />
        )
    }

    setDatabaseListener() {
        this.taskService.tasksRef(this.columnReference).onSnapshot(data => {
            const listOfFetchedTasks = [];
            data.docs.forEach(doc => {
                const taskReference = doc.ref;
                const data = doc.data();
                data['ref'] = taskReference;
                listOfFetchedTasks.push(data);
            });
            listOfFetchedTasks.sort((a, b) => (a.order > b.order) ? 1 : -1)
            this.setState({
                tasks: listOfFetchedTasks
            });
        });
    }
}

export default Column;
