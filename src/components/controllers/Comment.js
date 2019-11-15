import React from 'react';
import CommentView from '../views/CommentView'

class Comment extends React.Component {

    render() {
        return (
            <CommentView
                author = {this.props.author}
                content = {this.props.content}
                time = {this.props.time}
            />
        )
    }

}

export default Comment;