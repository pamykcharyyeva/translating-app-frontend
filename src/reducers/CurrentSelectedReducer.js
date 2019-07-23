export default function CurrentSelectedReducer (state={selectedUser: {}, CurrentConversation: {}}, action){
	switch(action.type){
		case "SELECT_USER":
			return {...state, selectedUser: action.payload.user}
		case "SELECT_CONVERSATION":
			return {...state, CurrentConversation: action.payload.CurrentConversation}
		default:
			return state
	}	
}