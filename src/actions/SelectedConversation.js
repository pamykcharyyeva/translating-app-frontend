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