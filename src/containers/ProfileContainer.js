import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import * as actions from '../actions/SelectedConversation'

import { connect } from 'react-redux'


const ProfileContainer = (props) => {
return !props.token ?
	 null
	:
  (
    <div className="sidebar">
		 {props.selectedUser.id !== props.currentUser.id ? <h5 style={{float: 'right', marginRight: 5, display: 'inline-block', cursor: 'pointer'}} onClick={() => handleClick(props.currentUser, props.resetSelectedUser)}>x</h5> : null}
      <div id="profile-card"></div>
      
      
		{/* <Card  bg="danger" text="yellow" style={{ width: '18rem' }}> */}
		<Card id="profile-card">
		  
		  <Card.Body>
		    <Card.Title style={{color: 'black', fontWeight: 'bold'}}>{props.currentUser.first_name} {props.currentUser.last_name}</Card.Title>
		  </Card.Body>
		  <ListGroup className="list-group-flush">
		    <ListGroupItem>Email: {props.currentUser.email}</ListGroupItem>
		    <ListGroupItem>Language: {props.currentUser.language}</ListGroupItem>
			<ListGroupItem>Location: {props.currentUser.location}</ListGroupItem>
		  </ListGroup>
		</Card>
	  </div>
   
  )
}


const handleClick = (currentUser, reducer) => {
	reducer(currentUser)
}

function mapStateToProps(state){
	return ({...state.auth})
}


export default connect(mapStateToProps, actions)(ProfileContainer)