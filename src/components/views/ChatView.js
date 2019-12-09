import React from 'react';

class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    };
  }

  componentDidMount() {
    this.setState({ messages: this.props.messages } );
  }

  renderMessage(message) {
    return (
      <div class="message">
        <div class="message-author"> 
        <b>Autor:</b> {message.author}
        </div>
        <div class="message-content">
          <b>Wiadomość:</b> {message.message}
        </div>
      </div>
    )
  }

  render = () => {  
    return this.props.messages.map(msg => this.renderMessage(msg));
  }
}

export default ChatView