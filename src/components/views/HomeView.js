import React from 'react';
import {Button} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Project from "../controllers/Project";
import ChatView from "./ChatView";

require("../../styles/Project.css");

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            modalShow: false,
            modalAddShow: false,
            modalProject: "",
            projectName: "",
            newName: "",
            messages: this.props.messages,
            chatHidden: true,
            chatInputValue: "",
            validate: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({render: true})
        }.bind(this), 1000)
    }

    handleChange = e => {
        e.preventDefault();
        const isValid = this.validator(e.target);
        this.setState({
            [e.target.name]: e.target.value,
            validate: isValid
        });
    };

    validator = input => {
        if (input.name === "newName" && this.state.modalProject.name === input.value)
            return true;
        const filter = this.props.projects.find(project =>
            project.name === input.value
        );
        return typeof (filter) === "undefined"
    };

    handleDelete = e => {
        e.preventDefault();
        this.props.handleDelete(e.target.id);
    };

    renderProjects = () => {
        if (this.props.projects.length === 0) {
            return (<div className="no-content">Brak projektów!</div>)
        }

        return this.props.projects.map(project =>
            this.renderProject(project)
        );
    };

    renderModal = (project) => {
        this.setState({
            modalShow: true,
            modalProject: project,
            newName: project.name
        })
    };

    renderProject = (project) => {
        const handleClose = () => {
            this.setState({
                modalShow: false,
                newName: ""
            })
        };

        const handleEdit = () => {
            this.props.handleEdit(this.state.modalProject.name, this.state.newName);
            handleClose();
            this.setState({
                modalProject: ""
            });
        };

        return (
            <div className="project">
                <div className="bookmark project-head">
                    {project.name}
                    <Button
                        className="action-button delete"
                        id={project.name}
                        onClick={this.handleDelete}
                        variant="danger"
                    >
                        X
                    </Button>
                    <Button
                        className="action-button edit"
                        id={project.name}
                        onClick={() => this.renderModal(project)}
                        variant="warning"
                    >
                        O
                    </Button>
                    <Dialog open={this.state.modalShow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edytuj projekt {this.state.modalProject.name}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="newName"
                                label="Nazwa projektu"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.newName}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Anuluj
                            </Button>
                            <Button onClick={handleEdit} disabled={this.state.newName === "" || !this.state.validate}
                                    color="primary">
                                Zapisz
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Project projectReference={project.ref} name={project.name}/>
            </div>
        )
    };

    renderAddModal = () => {
        this.setState({
            modalAddShow: true,
        })
    };

    renderAddProject = () => {
        const handleClose = () => {
            this.setState({
                modalAddShow: false,
                newName: ""
            })
        };

        const handleAdd = () => {
            this.props.handleSubmit(this.state);
            this.setState({projectName: ""});
            handleClose();
            this.setState({
                modalProject: ""
            });
        };
        return (
            <div>
                <Button
                    className="add-button new-project"
                    onClick={this.renderAddModal}
                    variant="success"
                >
                    +
                </Button>
                <Dialog open={this.state.modalAddShow} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Nowy projekt</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="projectName"
                            label="Nazwa projektu"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.projectName}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Anuluj
                        </Button>
                        <Button onClick={handleAdd} disabled={this.state.projectName === "" || !this.state.validate}
                                color="primary">
                            Dodaj
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    renderChat = () => {
        return (
            <ChatView
                messages={this.state.messages}></ChatView>
        )
    };

    renderMessageInput = () => {
        return (
            <input class="send-message"
                   onChange={this.updateInputValue}
            >
            </input>
        )
    };

    updateInputValue = e => {
        this.setState({
            chatInputValue: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleSubmit(this.state);
        this.setState({projectName: ""});
    };

    showChat = () => {
        this.setState({chatHidden: false})
    };

    closeChat = () => {
        this.setState({chatHidden: true})
    };

    sendMessage = () => {
        const message = this.state.chatInputValue;
        if (message != "")
            this.props.addMessage(message);
    };

    render() {
        let renderContainer = false;
        if (this.state.render) {
            renderContainer =
                <div>
                    <div class="chat-opener"
                         onClick={this.showChat}
                         style={this.state.chatHidden ? {} : {display: 'none'}}
                    >
                        <div>
                            CHAT
                        </div>
                    </div>
                    <div class="chat-window"
                         style={!this.state.chatHidden ? {} : {display: 'none'}}
                    >
                        {this.renderChat()}
                        {this.renderMessageInput()}
                        <div class="chat-closer"
                             onClick={this.closeChat}
                        >
                            Zamknij
                        </div>
                        <div class="message-sender"
                             onClick={this.sendMessage}>
                            Wyślij
                        </div>
                    </div>
                    {this.renderProjects()}
                    {this.renderAddProject()}
                </div>
        }
        return (
            renderContainer
        )
    }
}

export default HomeView;
