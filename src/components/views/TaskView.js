import React from 'react';
import {Button} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Column from "../controllers/Column";

require("../../styles/Task.css");
require("../../styles/Comment.css");

class TaskView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            modalShow: false,
            modalAddShow: false,
            modalComment: "",
            commentContent: "",
            newContent: "",
            validate: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    renderComments = () => {
        if (this.props.comments.length === 0) {
            return (<div className="no-content">Brak komentarzy!</div>)
        }

        return this.props.comments.map(comment =>
            this.renderComment(comment)
        );
    };

    renderModal = (comment) => {
        this.setState({
            modalShow: true,
            modalComment: comment,
            newContent: comment.content
        })
    };

    renderComment = (comment) => {
        const handleClose = () => {
            this.setState({
                modalShow: false,
                newContent: ""
            })
        };

        const handleEdit = () => {
            handleClose();
            this.props.handleEdit({
                "author": this.state.modalComment.author,
                "content": this.state.newContent,
                "time": this.state.modalComment.time
            });
            this.setState({
                modalColumn: ""
            });
        };

        const date = new Date(comment.time);

        return (
            <div className="comment">
                <Button
                    className="action-button delete"
                    id={comment.time}
                    onClick={this.handleDelete}
                    variant="danger"
                    disabled={this.props.nick !== comment.author}
                >
                    X
                </Button>
                <Button
                    className="action-button edit"
                    id={comment.time}
                    onClick={() => this.renderModal(comment)}
                    variant="warning"
                    disabled={this.props.nick !== comment.author}
                >
                    O
                </Button>
                <Dialog open={this.state.modalShow} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edytuj
                        komentarz {this.state.modalComment.content}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="newContent"
                            label="Treść"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.newContent}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Anuluj
                        </Button>
                        <Button onClick={handleEdit}
                                disabled={
                                    this.state.newContent === "" ||
                                    !this.state.validate
                                }
                                color="primary">
                            Zapisz
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className="comment-data-time">{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
                <div className="comment-content">{comment.content}</div>
                <div className="comment-author">{comment.author}</div>
            </div>
        )
    };

    renderAddModal = () => {
        this.setState({
            modalAddShow: true,
        })
    };

    renderAddComment = () => {
        const handleClose = () => {
            this.setState({
                modalAddShow: false,
                newContent: ""
            })
        };

        const handleAdd = () => {
            const date = new Date();
            this.props.handleSubmit({
                content: this.state.commentContent,
                time: date.toString()
            });
            this.setState({commentContent: ""});
            handleClose();
            this.setState({
                modalComment: ""
            });
        };

        return (
            <div>
                <Button
                    className="add-button new-comment"
                    onClick={this.renderAddModal}
                    variant="success"
                >
                    +
                </Button>
                <Dialog open={this.state.modalAddShow} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Dodaj komentarz</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="commentContent"
                            label="Treść"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.commentContent}
                            fullWidth
                        >
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Anuluj
                        </Button>
                        <Button onClick={handleAdd} disabled={
                            this.state.commentContent === "" ||
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
        this.props.handleDelete(e.target.id);
    };

    handleChange = e => {
        e.preventDefault();
        const isValid = this.validator(e.target);
        this.setState({
            [e.target.name]: e.target.value,
            validate: isValid
        });
    };

    validator = input => {
        if (input.name === "newContent" && this.state.modalComment.content === input.value)
            return true;
        const filter = this.props.comments.find(comment =>
            comment.content === input.value
        );
        return typeof (filter) === "undefined"
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
                <div className="task-body">
                    {this.renderComments()}
                    {this.renderAddComment()}
                </div>
        }
        return (
            renderContainer
        )
    }
}

export default TaskView;
