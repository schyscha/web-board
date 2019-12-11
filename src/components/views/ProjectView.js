import React from 'react';
import {Button} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Board from "../controllers/Board";
import {PhotoshopPicker} from 'react-color';

require("../../styles/Project.css");
require("../../styles/Board.css");

class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            modalShow: false,
            modalAddShow: false,
            modalBoard: "",
            boardName: "",
            boardBackground: "orange",
            newName: "",
            newBackground: "",
            showAddBackground: false,
            showChangeBackground: false,
            pickedBackground: "orange",
            validate: true,
            visibilityMap: new Map()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    renderBoards = () => {
        if (this.props.boards.length === 0) {
            return (<div className="no-content">Brak board'ów!</div>)
        }

        if (this.state.visibilityMap.size === 0) {
            this.props.boards.map(board => this.state.visibilityMap.set(board.name, true))
        }

        return this.props.boards.map(board =>
            this.renderBoard(board)
        );
    };

    renderModal = (board) => {
        this.setState({
            modalShow: true,
            modalBoard: board,
            newName: board.name,
            newBackground: board.background,
        })
    };

    handleChangeColor = (color) => {
        this.setState({
            pickedBackground: color
        })
    };

    handleCancelColor = () => {
        this.setState({
            showAddBackground: false,
            showChangeBackground: false,
        })
    };

    handleAcceptAddColor = () => {
        const newColor = this.state.pickedBackground.hex;
        this.setState({
            boardBackground: newColor,
            showAddBackground: false
        })
    };

    handleAcceptChangeColor = () => {
        const newColor = this.state.pickedBackground.hex;
        this.setState({
            newBackground: newColor,
            showChangeBackground: false
        })
    };

    renderBoard = (board) => {
        const handleClose = () => {
            this.setState({
                newName: "",
                newBackground: "",
                modalShow: false
            })
        };

        const switchVisibility = () => {
            this.setState(state => {
                let oldValue = state.visibilityMap.get(board.name)
                state.visibilityMap.set(board.name, !oldValue)
                return state
            })
        }

        const handleEdit = () => {
            this.props.handleEdit(this.state.modalBoard.name, this.state.newName, this.state.newBackground);
            handleClose();
            this.setState({
                modalBoard: ""
            });
        };

        return (
            <div className="board" style={{backgroundColor: board.background}}>
                <div className="bookmark board-head" onClick={switchVisibility}>
                    {board.name}
                    <Button
                        className="action-button delete"
                        id={board.name}
                        onClick={this.handleDelete}
                        variant="danger"
                    >
                        X
                    </Button>
                    <Button
                        className="action-button edit"
                        id={board.name}
                        onClick={() => this.renderModal(board)}
                        variant="warning"
                    >
                        O
                    </Button>
                    <Dialog open={this.state.modalShow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edytuj boarda {this.state.modalBoard.name}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="newName"
                                label="Nazwa boarda"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.newName}
                                fullWidth
                            />
                            <div style={{display: "flex", flexFlow: "nowrap row"}}>
                                <Button
                                    variant="light"
                                    onClick={() => this.setState({
                                        showChangeBackground: true,
                                        pickedBackground: this.state.newBackground
                                    })}
                                >
                                    Kolor:
                                </Button>
                                <div className="color-box"
                                     style={{background: this.state.newBackground}}>
                                </div>
                                <Dialog open={this.state.showChangeBackground} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Kolor boarda {board.name}</DialogTitle>
                                    <DialogContent>
                                        <PhotoshopPicker
                                            header="Wybierz kolor"
                                            onAccept={this.handleAcceptChangeColor}
                                            onCancel={this.handleCancelColor}
                                            color={this.state.pickedBackground}
                                            onChangeComplete={this.handleChangeColor}/>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Anuluj
                            </Button>
                            <Button
                                onClick={handleEdit}
                                disabled={this.state.newName === "" || !this.state.validate}
                                color="primary">
                                Zapisz
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Board isHidden={this.state.visibilityMap.get(board.name)} boardReference={board.ref}
                       name={board.name}/>
            </div>
        )
    };

    renderAddModal = () => {
        this.setState({
            modalAddShow: true,
        })
    };

    renderAddBoard = () => {
        const handleClose = () => {
            this.setState({
                modalAddShow: false,
                newName: ""
            })
        };

        const handleAdd = () => {
            this.props.handleSubmit(this.state.boardName, this.state.boardBackground);
            this.setState({boardName: "", boardBackground: "orange"});
            handleClose();
            this.setState({
                modalBoard: ""
            });
        };

        return (
            <div>
                <Button
                    className="add-button new-board"
                    onClick={this.renderAddModal}
                    variant="success"
                >
                    +
                </Button>
                <Dialog open={this.state.modalAddShow} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Dodaj board'a</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="boardName"
                            label="Nazwa"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.boardName}
                            fullWidth
                        >
                        </TextField>
                        <div style={{display: "flex", flexFlow: "nowrap row"}}>
                            <Button
                                margin="dense"
                                fullWidth
                                variant="light"
                                onClick={() => this.setState({
                                    showAddBackground: true
                                })}
                            >
                                Kolor:
                            </Button>
                            <div className="color-box"
                                 style={{background: this.state.boardBackground}}>
                            </div>
                        </div>
                        <Dialog open={this.state.showAddBackground} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Kolor nowego boarda</DialogTitle>
                            <DialogContent>
                                <PhotoshopPicker
                                    header="Wybierz kolor"
                                    onAccept={this.handleAcceptAddColor}
                                    onCancel={this.handleCancelColor}
                                    color={this.state.pickedBackground}
                                    onChangeComplete={this.handleChangeColor}/>
                            </DialogContent>
                        </Dialog>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Anuluj
                        </Button>
                        <Button onClick={handleAdd}
                                disabled={this.state.boardName === "" || !this.state.validate}
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
        if (input.name === "newName" && this.state.modalBoard.name === input.value)
            return true
        const filter = this.props.boards.find(board =>
            board.name === input.value
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
                    {this.renderBoards()}
                    {this.renderAddBoard()}
                </div>
        }
        return (
            renderContainer
        )
    }
}

export default ProjectView;
