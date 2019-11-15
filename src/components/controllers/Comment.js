import React from 'react';
import CommentView from '../views/CommentView'

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: "",
            content: "",
            time: ""
        }
    }

    componentDidMount() {
        //TODO: sciagniecie z bazy informacji o commencie o danym ID
        const res = "" //zaciagniete info
        this.setState ({
            author: res.author,
            content: res.content,
            time: res.time
        })

    }

    render() {
        return (
            <CommentView
                author = {this.state.author}
                content = {this.state.content}
                time = {this.state.time}
            />
        )
    }

}

export default Comment;