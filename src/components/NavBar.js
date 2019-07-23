import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/Logout.js'
import { Link } from 'react-router-dom'



const NavBar = (props) => {
	return (
	<div className="nav-bar">
		<div className="nav-links">
    		{renderNavItems(props)}
    	</div>
    </div> 
   )
}

const handleLogout = (props) => {
	localStorage.removeItem("token")
	props.logout()
}

const renderNavItems = (props) => {
	
	if (!props.token) {
		return(
			<div >
		    	<Link to='/login' className="single-nav-link">Login</Link>
		    	<Link to='/signup' className="single-nav-link">Signup</Link>
    		</div>
		)
	} else {
		return <Link onClick={() => handleLogout(props)} className="single-nav-link" to='/login'>Logout</Link>
	}
}

function mapStateToProps(state){
	return({...state.auth, ...state.selected.currentConversation})
}

export default connect(mapStateToProps, actions)(NavBar)