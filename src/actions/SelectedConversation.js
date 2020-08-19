export function SelectedConversation(convoId) {
	
	return dispatch => {
		fetch(`http://localhost:3000/conversations/${convoId}`)
		.then(res => res.json())
		.then(data => dispatch({type: "SELECT_CONVERSATION", payload: {currentConversation: data}})
		)
	}
}

export function resetCurrentConversation(conversation, message){
	return dispatch => {
		conversation.messages = [...conversation.messages, message]
		console.log(conversation)
		dispatch({type: "SELECT_CONVERSATION", payload: {currentConversation: conversation}})
	}
}

export function deselectConversation(){
	return dispatch => {
		dispatch({type: "DESELECT_CONVERSATION", payload: {currentConversation: {}}})
	}
}

export function createConversation(userData, props, userName, user){
	return dispatch => {
		fetch("http://localhost:3000/conversations", {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        Accept: 'application/json'
	      },
	      body: JSON.stringify({
	          title: userData.title,
	          purpose: userData.purpose,
	          creator: userName
	    })
	  })
		.then(res => res.json())
		.then(data => {
			user.conversations = [...user.conversations, data]
			props.history.push(`/conversations/${data.id}`)
			dispatch({type: "RESET_USER", payload: {user: {...user}}})
			
		})
	}
}

export function selectUser(user_id){

	return dispatch => {
		fetch(`http://localhost:3001/users/${user_id}`)
		.then(res => res.json())
		.then(data => {
			dispatch({type: "SELECT_USER", payload: {selectedUser: data}})

		})
	}
}

export function resetSelectedUser(currentUser){
	return dispatch => {
		dispatch({type: "SELECT_USER", payload: {selectedUser: currentUser}})
	}
}

export function joinConversation(user, convo, props){
	return dispatch => {
		user.conversations = [...user.conversations, convo]
		fetch("http://localhost:3000/join_conversation", {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        Accept: 'application/json'
	      },
	      body: JSON.stringify({
	          user_id: user.id,
	          conversation_id: convo.id
	    	})
	 	})
	 	.then(res => res.json())
		.then(data => {
			dispatch({type: "RESET_USER", payload: {user: {...user}}})
		})
	}
}