import React from 'react';
import {Button, Form} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Project from "../controllers/Project";

require("../../styles/Home.css");

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            showModal: false,
            projectName: "",
            newName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({render: true})
        }.bind(this), 1000)
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    };

    handleDelete = e => {
        e.preventDefault();
        this.props.handleDelete(e.target.id);
    };

    renderProjects = () => {
        if (this.props.projects.length === 0) {
            return (<div className="bookmark-info">Brak projektów!</div>)
        }
        return this.props.projects.map(project => this.renderProject(project));
    };

    renderProject = (project) => {

        const handleOpen = () => {
            this.setState({
                showModal: true
            })
        };

        const handleClose = () => {
            this.setState({
                showModal: false
            })
        };

        const handleEdit = () => {
            handleClose()
            this.props.handleEdit(project.name, this.state.newName)
            this.setState({newName: ""});
        }

        return (
            <div>
                <div className="bookmark">
                    {project.name}
                    <Button
                        className="actionbtn"
                        id={project.name}
                        onClick={this.handleDelete}
                        variant="danger"
                    >
                        USUŃ
                    </Button>
                    <Button
                        className="actionbtn"
                        id={project.name}
                        onClick={handleOpen}
                        variant="warning"
                    >
                        EDYTUJ
                    </Button>
                    <Dialog open={this.state.showModal} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edytuj projekt {project.name}</DialogTitle>
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
                            <Button disabled={this.state.newName === ""} onClick={handleEdit} color="primary">
                                Zapisz
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                {/*A TU WSTAWIĆ <PROJECT> - KOLEJNE ELEMENTY ANALOGICZNIE, CZYLI W
                PROJECTCIE POWIAZANIE Z BAZA, PRZEKAZANIE METOD BAZOWYCH DO PROJECTVIEW KTORE
                WYSWIETLI BOARDY, ITD...*/}
            </div>
        )
    };

    renderAddProject = () => {
        return (
            <Form inline onSubmit={this.handleSubmit} className="input">
                <Form.Group>
                    <Form.Control
                        className="textfield"
                        label="Nowy projekt: "
                        type="text"
                        placeholder="Nazwa nowego projektu"
                        value={this.state.projectName}
                        name="projectName"
                        onChange={this.handleChange}
                        required={true}
                    />
                    <Button disabled={this.state.projectName === ""} variant="success" type="submit">
                        Dodaj
                    </Button>
                </Form.Group>
            </Form>
        );

    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleSubmit(this.state)
        this.setState({projectName: ""});
    };

    render() {
        let renderContainer = false
        if (this.state.render) {
            renderContainer =
                <div>
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