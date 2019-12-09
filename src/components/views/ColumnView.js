import React from 'react';
import {Button} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from 'react-percent-bar';
import Task from "../controllers/Task";


require("../../styles/Column.css");
require("../../styles/Task.css");

class ColumnView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            modalShow: false,
            modalAddShow: false,
            timeModalShow: false,
            modalTask: "",
            taskName: "",
            taskOrder: "",
            estimated: "",
            newName: "",
            newOrder: "",
            newEstimated: "",
            newLoggedTime: "",
            validate: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    renderTasks = () => {
        if (this.props.tasks.length === 0) {
            return (<div className="no-content">Brak zadań!</div>)
        }

        return this.props.tasks.map(task =>
            this.renderTask(task)
        );
    };

    renderModal = (task) => {
        this.setState({
            modalShow: true,
            modalTask: task,
            newName: task.name,
            newOrder: task.order,
            newEstimated: task.estimatedTime
        })
    };

    renderTimeModal = (task) => {
        this.setState({
            timeModalShow: true,
            modalTask: task,
            newLoggedTime: task.loggedTime
        })
    };

    renderTask = (task) => {
        const handleClose = () => {
            this.setState({
                newName: "",
                newOrder: "",
                newEstimated: "",
                modalShow: false,
                timeModalShow: false,
                newLoggedTime: ""
            })
        };

        const handleEdit = () => {
            this.props.handleEdit({
                "name": this.state.modalTask.name,
                "newName": this.state.newName,
                "order": parseInt(this.state.newOrder),
                "estimatedTime": this.state.newEstimated
            });
            handleClose();
            this.setState({
                modalTask: ""
            });
        };

        return (
            <div className="task">
                <div className="bookmark task-head">
                    <Button
                        className="time-button"
                        onClick={() => this.renderTimeModal(task)}
                    ><FontAwesomeIcon icon={faClock}/></Button>
                    {task.name}
                    <Button
                        className="action-button delete"
                        id={task.name}
                        onClick={this.handleDelete}
                        variant="danger"
                    >
                        X
                    </Button>
                    <Button
                        className="action-button edit"
                        onClick={() => this.renderModal(task)}
                        variant="warning"
                    >
                        O
                    </Button>
                    <Dialog open={this.state.modalShow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edytuj zadanie {this.state.modalTask.name}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="newName"
                                label="Nazwa zadania"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.newName}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                name="newOrder"
                                label="Kolejność zadania"
                                type="number"
                                min={1}
                                onChange={this.handleChange}
                                value={this.state.newOrder}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                name="newEstimated"
                                label="Czas zadania"
                                type="number"
                                min={1}
                                onChange={this.handleChange}
                                value={this.state.newEstimated}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Anuluj
                            </Button>
                            <Button onClick={handleEdit}
                                    disabled={this.state.newName === ""
                                    || this.state.newOrder === ""
                                    || this.state.newOrder < 0
                                    || this.state.newEstimated === ""
                                    || this.state.newEstimated < 0
                                    || !this.state.validate}
                                    color="primary">
                                Zapisz
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.timeModalShow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Czas zadania {this.state.modalTask.name}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="newLoggedTime"
                                label="Wykorzystany czas:"
                                type="number"
                                min={1}
                                onChange={this.handleChange}
                                value={this.state.newLoggedTime}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Wyjdź
                            </Button>
                            <Button onClick={handleEdit}
                                    disabled={this.state.newLoggedTime === ""
                                    || this.state.newLoggedTime > this.state.modalTask.estimatedTime
                                    || this.state.newLoggedTime < 0
                                    }
                                    color="primary">
                                Zapisz
                            </Button>
                            {/*TODO: DOKONCZYC OBSLUGE ZMIAN PO WSTAWIENIU BACKENDU*/}
                        </DialogActions>
                        <DialogContentText>
                            Wykorzystano {this.percentage()}% czasu
                            <ProgressBar colorShift={true} fillColor="orange" percent={this.percentage()}
                                         borderColor="black"/>
                        </DialogContentText>
                    </Dialog>
                </div>
                <Task taskReference={task.ref} name={task.name}/>
            </div>
        )
    };

    percentage = () => {
        const raw = 100 * this.state.modalTask.loggedTime / this.state.modalTask.estimatedTime
        return raw.toFixed(2)
    }

    renderAddModal = () => {
        this.setState({
            modalAddShow: true,
        })
    };

    renderAddTask = () => {
        const handleClose = () => {
            this.setState({
                modalAddShow: false,
                newName: ""
            })
        };

        const handleAdd = () => {
            this.props.handleSubmit({
                "estimatedTime": this.state.estimated,
                "name": this.state.taskName,
                "order": parseInt(this.state.taskOrder)
            });
            this.setState({estimated: "", taskName: "", taskOrder: ""});
            handleClose();
            this.setState({
                modalTask: ""
            });
        };

        return (
            <div>
                <Button
                    className="add-button new-task"
                    onClick={this.renderAddModal}
                    variant="success"
                >
                    +
                </Button>
                <Dialog open={this.state.modalAddShow} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Dodaj zadanie</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="taskName"
                            label="Nazwa zadania"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.taskName}
                            fullWidth
                        >
                        </TextField>
                        <TextField
                            margin="dense"
                            name="taskOrder"
                            label="Kolejność"
                            type="number"
                            min={1}
                            onChange={this.handleChange}
                            value={this.state.taskOrder}
                            fullWidth
                        >
                        </TextField>
                        <TextField
                            margin="dense"
                            name="estimated"
                            label="Szacowany czas"
                            type="number"
                            min={1}
                            onChange={this.handleChange}
                            value={this.state.estimated}
                            fullWidth
                        >
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Anuluj
                        </Button>
                        <Button onClick={handleAdd}
                                disabled={this.state.taskName === ""
                                || this.state.taskOrder === ""
                                || this.state.taskOrder < 0
                                || this.state.estimated === ""
                                || this.state.estimated < 0
                                || !this.state.validate}
                                color="primary">
                            Dodaj
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    handleDelete = e => {
        e.preventDefault();
        this.props.handleDelete(e.target.id);
    };

    handleChange = e => {
        e.preventDefault();
        const isValid = this.validator(e.target)
        this.setState({
            [e.target.name]: e.target.value,
            validate: isValid
        });
    };

    validator = input => {
        if (input.name === "newName" && this.state.modalTask.name === input.value)
            return true
        const filter = this.props.tasks.find(task =>
            task.name === input.value
        )
        return typeof (filter) === "undefined"
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({render: true})
        }.bind(this), 1000)
    }

    render() {
        let renderContainer = false;
        if (this.state.render) {
            renderContainer =
                <div>
                    {this.renderTasks()}
                    {this.renderAddTask()}
                </div>
        }
        return (
            renderContainer
        )
    }

}

export default ColumnView;
