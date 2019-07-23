export default function AuthReducer (state={currentUser: {}, token: null}, action){
	switch(action.type){
		case "LOG_IN":
			localStorage.setItem('jwt', action.payload.jwt)
			return {...state, currentUser: action.payload.user, token: action.payload.jwt}
		case "LOG_OUT":
		    localStorage.removeItem('jwt')
			return {...state, currentUser:{}, token: action.payload.jwt } 
		case "AUTO_LOGIN":
			return {...state, currentUser: action.payload.user, token: action.payload.jwt}
		default:
			return state
	}
	
}