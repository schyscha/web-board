import React from 'react';

require("../../styles/App.css");

class ChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages
        };
    }

    componentDidMount() {
        this.setState({messages: this.props.messages});
    }

    renderMessage(message) {
        return (
            <div class="message">
                <b>{message.author}</b>: {message.message}
            </div>
        )
    }

    render = () => {
        return (
            <div className="messages">
                {this.props.messages.map(msg => this.renderMessage(msg))}
            </div>
        )
    }
}

export default ChatView