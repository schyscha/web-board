import React from 'react';
import {Button, Form} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Column from "../controllers/Column";

require("../../styles/Board.css");

class BoardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            modalShow: false,
            modalColumn: "",
            columnName: "",
            columnOrder: "",
            newName: "",
            newOrder: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderColumns = () => {
        if (this.props.columns.length === 0) {
            return (<div className="bookmark-info shift-board">Brak kolumn!</div>)
        }

        return this.props.columns.map(column =>
            this.renderColumn(column)
        );
    };

    renderModal = (column) => {
        this.setState({
            modalShow: true,
            modalColumn: column,
            newName: column.name,
            newOrder: column.order
        })
    };

    renderColumn = (column) => {

        const handleClose = () => {
            this.setState({
                modalShow: false,
                newName: "",
                newOrder: ""
            })
        };

        const handleEdit = () => {
            handleClose();
            this.props.handleEdit(this.state.modalColumn.name, this.state.newName, this.state.newOrder);
            this.setState({
                modalColumn: ""
            });
        };

        return (
            <div>
                <div className="bookmark shift-board">
                    {column.name}
                    <Button
                        className="actionbtn"
                        id={column.name}
                        onClick={this.handleDelete}
                        variant="danger"
                    >
                        USUŃ
                    </Button>
                    <Button
                        className="actionbtn"
                        id={column.name}
                        onClick={() => this.renderModal(column)}
                        variant="warning"
                    >
                        EDYTUJ
                    </Button>
                    <Dialog open={this.state.modalShow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edytuj kolumnę {this.state.modalColumn.name}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="newName"
                                label="Nazwa kolumny"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.newName}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                name="newOrder"
                                label="Kolejność kolumny"
                                type="number"
                                min={1}
                                onChange={this.handleChange}
                                value={this.state.newOrder}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Anuluj
                            </Button>
                            <Button onClick={handleEdit}
                                    disabled={this.state.newName === "" || this.state.newOrder === ""} color="primary">
                                Zapisz
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Column columnReference={column.ref} name={column.name}/>
            </div>
        )
    };

    renderAddColumn = () => {
        return (
            <Form inline onSubmit={this.handleSubmit} className="shift-board">
                <Form.Group>
                    <Form.Control
                        className="textfield"
                        type="text"
                        placeholder="Nazwa nowej kolumny"
                        value={this.state.columnName}
                        name="columnName"
                        onChange={this.handleChange}
                        required={true}
                    />
                    <Form.Control
                        className="textfield"
                        type="number"
                        min={1}
                        placeholder="Kolejność nowej kolumny"
                        value={this.state.columnOrder}
                        name="columnOrder"
                        onChange={this.handleChange}
                        required={true}
                    />
                    <Button
                        disabled={this.state.columnName === "" || this.state.columnOrder === ""} variant="success"
                        type="submit">
                        Dodaj
                    </Button>
                </Form.Group>
            </Form>
        );
    };

    handleDelete = e => {
        e.preventDefault();
        this.props.handleDelete(e.target);
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleSubmit(this.state.columnName, this.state.columnOrder);
        this.setState({columnName: "", columnOrder: ""});
    };

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
                    {this.renderColumns()}
                    {this.renderAddColumn()}
                </div>
        }
        return (
            renderContainer
        )
    }

}

export default BoardView;
