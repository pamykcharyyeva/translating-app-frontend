import React from 'react';
import './App.css';
import ConversationsContainer from './containers/ConversationsContainer'
import MainContainer from './containers/MainContainer'
import * as actions from './actions/AutoLogin.js'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';




class App extends React.Component {

state = {
	conversations: []
}

componentDidMount(){
		const token = localStorage.getItem("token")
			fetch('http://localhost:3000/conversations')
					.then(res => res.json())
					.then(data => {
						this.setState({
							conversations: data
				})
			})
		if(token){
			this.props.autoLogin(token)

	}
}

handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    })
  }

handleReceivedMessage = response => {
	const { message } = response;
	const conversations = [...this.state.conversations];
	const conversation = conversations.find(
	  conversation => conversation.id === message.conversation_id
	)
	conversation.messages = [...conversation.messages, message]
	this.setState({ conversations })
}


render(){
	// console.log(this.props)
	  	return (
	  		<Router>
			    <div className="App">
			      <ConversationsContainer handleReceivedMessage={this.handleReceivedMessage} handleReceivedConversation={this.handleReceivedConversation} conversations={this.state.conversations}/>
			      <MainContainer conversations={this.state.conversations} />
			    </div>
		    </Router>
	  	);
	}
}

export default connect(null, actions)(App);
