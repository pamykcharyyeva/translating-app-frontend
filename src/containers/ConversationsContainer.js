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
		fetch('http://localhost:3000/conversations')
		.then(res => res.json())
		.then(data => {
			this.setState({
				conversations: data
			})
		})
	}

	renderConversations = (convos) => {
		return convos.map(convo => <div key={convo.id}>{convo.title}</div>)
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/conversations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
          },
          body: JSON.stringify({
                title: this.state.text,
              })
		})
		.then(res=>res.json())
		.then(data => {
			this.setState({
				text: ""
			})
		})
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
		<div>
			{this.renderConversations(this.state.conversations)}
			<form id="message-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
				<input name="text" type="text" />
				<button type="submit">submit</button>
			</form>
		</div>
	</div>
 
}




render(){
  return (
	    <div className="right-sidebar">
	    <h2 style={{marginTop: 5}}><Link to="/home" style={{color: 'Blue', fontWeight: 'bold'}}>Translators App</Link></h2>
	      
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