import React from 'react';
import TaskView from '../views/TaskView'
import { CommentService } from '../../services/CommentService';
import { connect } from "react-redux";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.taskReference = this.props.taskReference;
        this.commentService = new CommentService();
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        this.setDatabaseListener();
    }

    handleSubmit = data => {
        const author = this.props.author;
        const content = data.content;
        const time = data.time;
        this.commentService.addComment(author, content, time, this.taskReference);
    };

    handleEdit = data => {
        const time = data.time;
        const newCommentObject = data;
        this.commentService.editComment(time, newCommentObject, this.taskReference);
    };

    handleDelete = time => {
        this.commentService.deleteComment(time, this.taskReference);
    };

    render() {
        return (
            <TaskView
                nick={this.props.author}
                comments={this.state.comments}
                handleSubmit={this.handleSubmit}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
            />
        )
    }

    setDatabaseListener() {
        this.commentService.commentRef(this.taskReference).onSnapshot(data => {
            const listOfFetchedComments = [];
            data.docs.forEach(doc => {
                const commentReference = doc.ref;
                const data = doc.data();
                data['ref'] = commentReference;
                listOfFetchedComments.push(data);
                console.log('fetched comments', data);
            });
            this.setState({
                comments: listOfFetchedComments
            });
        });
    }
}

const mapStateToProps = state => {
    return {
        author: state.nick
    };
};

export default connect(mapStateToProps, null)(Task);
