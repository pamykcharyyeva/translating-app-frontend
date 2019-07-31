import React from 'react'
import * as actions from '../actions/SelectedConversation.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider'

class ConversationsContainer extends React.Component {

	state = {
		text: "",
		conversations: []
	}

	componentDidMount(){
		let form= document.getElementById("message-form")
	console.log(form)
	if (!!form) {
		form.scrollIntoView()
	}
		fetch('http://localhost:3000/conversations')
		.then(res => res.json())
		.then(data => {
			this.setState({
				conversations: data
			})
		})
	}

	renderConversations = (convos) => {
		return convos.map(convo => <div key={convo.id}><strong>{convo.creator}</strong> - {convo.title}</div>)
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		e.target.reset();
        fetch('http://localhost:3000/conversations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
          },
          body: JSON.stringify({
				title: this.state.text,
				user_id: this.props.currentUser.id,
				creator: this.props.currentUser.first_name
              })
		})
		.then(res=>res.json())
		.then(data => {
			this.setState({
				text: ""
			})
		})
	.catch(error => console.error(error))		
	}


	
renderItems = () => {

	
	console.log(this.state.text)
	return !this.props.token ?
		null
	:
	<div>
		<ActionCableConsumer
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={(data) => this.setState({conversations: [...this.state.conversations, data]})}
        />
		<div className="conversation-div">
			
			<div id="message-container">
			<h3 style={{color: 'black', fontWeight: 'bold'}}> Conversations:</h3>
			<br/>
				<div id="chat">
				{this.renderConversations(this.state.conversations)}
				</div>
			</div>
			<form id="message-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
				<input name="text" type="text" />
				<button id ="submit" type="submit">submit</button>
			</form>
		</div>
	</div>
 
}




render(){
  return (
	    <div className="right-sidebar">
	    <h2 style={{marginTop: 5}}><Link to="/home" style={{color: 'black', fontWeight: 'bold'}}>Talk & Meet App</Link></h2>
	      <div style={{marginTop: 90, fontSize: 20}}>
	        {this.renderItems()}
	       </div>
	    </div>
	  )
	}
}

function mapStateToProps(state){
	return({...state.auth, ...state.selected})
}

export default connect(mapStateToProps, actions)(ConversationsContainer)