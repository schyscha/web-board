import React from 'react';
import {Button, Form} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Board from "../controllers/Board";
import {PhotoshopPicker} from 'react-color';


require("../../styles/Project.css");

class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            modalShow: false,
            modalBoard: "",
            boardName: "",
            boardBackground: "orange",
            newName: "",
            newBackground: "",
            showAddBackground: false,
            showChangeBackground: false,
            pickedBackground: "orange"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderBoards = () => {
        if (this.props.boards.length === 0) {
            return (<div className="bookmark-info shift-project">Brak boardów!</div>)
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

        const handleEdit = () => {
            this.props.handleEdit(this.state.modalBoard.name, this.state.newName, this.state.newBackground);
            handleClose();
            this.setState({
                modalBoard: ""
            });
        };

        return (
            <div style={{backgroundColor: board.background}}>
                <div className="bookmark shift-project">
                    {board.name}
                    <Button
                        className="actionbtn"
                        id={board.name}
                        onClick={this.handleDelete}
                        variant="danger"
                    >
                        USUŃ
                    </Button>
                    <Button
                        className="actionbtn"
                        id={board.name}
                        onClick={() => this.renderModal(board)}
                        variant="warning"
                    >
                        EDYTUJ
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
                            <Button
                                variant="light"
                                onClick={() => this.setState({
                                    showChangeBackground: true,
                                    pickedBackground: this.state.newBackground
                                })}
                            >
                                Kolor boarda:
                            </Button>
                            <div className="colorBox long" style={{background: this.state.newBackground}}>
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Anuluj
                            </Button>
                            <Button
                                onClick={handleEdit}
                                disabled={this.state.newName === ""}
                                color="primary">
                                Zapisz
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Board boardReference={board.ref} name={board.name}/>
            </div>
        )
    };

    renderAddBoard = () => {
        return (
            <Form inline onSubmit={this.handleSubmit} className="shift-project">
                <Form.Group>
                    <Form.Control
                        className="textfield"
                        type="text"
                        placeholder="Nazwa nowego boarda"
                        value={this.state.boardName}
                        name="boardName"
                        onChange={this.handleChange}
                        required={true}
                    />
                    <Button
                        variant="light"
                        onClick={() => this.setState({
                            showAddBackground: true
                        })}
                    >
                        Kolor nowego boarda:
                    </Button>
                    <div className="colorBox" style={{background: this.state.boardBackground}}>
                    </div>
                    <Button disabled={this.state.boardName === ""} variant="success" type="submit">
                        Dodaj
                    </Button>
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
                </Form.Group>
            </Form>
        );
    };

    handleDelete = e => {
        e.preventDefault();
        this.props.handleDelete(e.target.id);
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleSubmit(this.state.boardName, this.state.boardBackground);
        this.setState({boardName: "", boardBackground: "orange"});
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
