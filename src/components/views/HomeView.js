import React from 'react';
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

require("../../styles/Home.css");

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            projectName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({render: true})
        }.bind(this), 500)
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    };

    renderProjects = () => {
        if (this.props.projects.length === 0) {
            return (<div className="bookmark-info">Brak projektów!</div>)
        }
        return this.props.projects.map(project => this.renderProject(project));
    };

    renderProject = (project) => {
        return (
            <Link to="/Project">
                <div className="bookmark">
                    {project.name}
                    <Button
                        className="deleter"
                        id={project.name}
                        onClick={this.handleDelete}
                        variant="danger"
                    >
                        USUŃ
                    </Button>
                </div>
            </Link>
        )
    };

    renderAddProject = () => {
        return (
            <Form inline onSubmit={this.handleSubmit} className="input">
                <Form.Group>
                    <Form.Control
                        className={"control-test"}
                        label="Nowy projekt: "
                        type="text"
                        placeholder="Nazwa nowego projektu"
                        value={this.state.projectName}
                        name="projectName"
                        onChange={this.handleChange}
                        required={true}
                    />
                    <Button disabled={this.state.projectName == ""} variant="success" type="submit">
                        Dodaj
                    </Button>
                </Form.Group>
            </Form>
        );

    };

    handleDelete = e => {
        e.preventDefault();
        this.props.handleDelete(e.target.id);
    };

    handleEdit = e => {
        e.preventDefault();
        this.props.handleEdit(e.target)
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