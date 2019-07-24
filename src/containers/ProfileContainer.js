import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { connect } from 'react-redux'


const ProfileContainer = (props) => {
return !props.token ?
	 null
	:
  (
    <div className="sidebar">
      
      <div id="profile-card">
		<Card  bg="danger" text="yellow" style={{ width: '18rem' }}>
		  
		  <Card.Body>
		    <Card.Title>{props.currentUser.first_name} {props.currentUser.last_name}</Card.Title>
		  </Card.Body>
		  <ListGroup className="list-group-flush">
		    <ListGroupItem>Email: {props.currentUser.email}</ListGroupItem>
		    <ListGroupItem>Language: {props.currentUser.language}</ListGroupItem>
			<ListGroupItem>Location: {props.currentUser.location}</ListGroupItem>
		  </ListGroup>
		</Card>
	  </div>
    </div>
  )
}


function mapStateToProps(state){
	return ({...state.auth})
}


export default connect(mapStateToProps)(ProfileContainer)