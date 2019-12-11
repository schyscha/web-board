import React from 'react';
import {Button} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Column from "../controllers/Column";

require("../../styles/Board.css");
require("../../styles/Column.css");

class BoardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            modalShow: false,
            modalAddShow: false,
            modalColumn: "",
            columnName: "",
            columnOrder: "",
            newName: "",
            newOrder: "",
            validate: true,
            hideColumns: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    renderColumns = () => {
        if (this.props.columns.length === 0) {
            return (<div className="no-content">Brak kolumn!</div>)
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
            this.props.handleEdit(this.state.modalColumn.name, this.state.newName, parseInt(this.state.newOrder));
            this.setState({
                modalColumn: ""
            });
        };

        return (
            <div className="column">
                <div className="bookmark column-head">
                    {column.name}
                    <Button
                        className="action-button delete"
                        id={column.name}
                        onClick={this.handleDelete}
                        variant="danger"
                    >
                        X
                    </Button>
                    <Button
                        className="action-button edit"
                        id={column.name}
                        onClick={() => this.renderModal(column)}
                        variant="warning"
                    >
                        O
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
                                    disabled={
                                        this.state.newName === "" ||
                                        this.state.newOrder === "" ||
                                        this.state.newOrder < 0 ||
                                        !this.state.validate
                                    }
                                    color="primary">
                                Zapisz
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Column columnReference={column.ref} name={column.name}/>
            </div>
        )
    };

    renderAddModal = () => {
        this.setState({
            modalAddShow: true,
        })
    };

    renderAddColumn = () => {
        const handleClose = () => {
            this.setState({
                modalAddShow: false,
                newName: ""
            })
        };

        const handleAdd = () => {
            this.props.handleSubmit(this.state.columnName, parseInt(this.state.columnOrder));
            this.setState({columnName: "", columnOrder: ""});
            handleClose();
            this.setState({
                modalColumn: ""
            });
        };

        return (
            <div className="new-column-button-wrapper">
                <Button
                    className="add-button new-column"
                    onClick={this.renderAddModal}
                    variant="success"
                >
                    +
                </Button>
                <Dialog open={this.state.modalAddShow} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Dodaj kolumnę</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="columnName"
                            label="Nazwa kolumny"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.columnName}
                            fullWidth
                        >
                        </TextField>
                        <TextField
                            margin="dense"
                            name="columnOrder"
                            label="Kolejność"
                            type="number"
                            min={1}
                            onChange={this.handleChange}
                            value={this.state.columnOrder}
                            fullWidth
                        >
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Anuluj
                        </Button>
                        <Button onClick={handleAdd} disabled={
                            this.state.columnName === "" ||
                            this.state.columnOrder === "" ||
                            this.state.columnOrder < 0 ||
                            !this.state.validate
                        } color="primary">
                            Dodaj
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    handleDelete = e => {
        e.preventDefault();
        this.props.handleDelete(e.target);
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
        if (input.name === "newName" && this.state.modalColumn.name === input.value)
            return true
        const filter = this.props.columns.find(column =>
            column.name === input.value
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
                <div className="board-body" hidden={this.props.isHidden}>
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
