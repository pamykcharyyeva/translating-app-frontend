
import React from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import * as actions from '../actions/Login.js'
import { connect } from "react-redux"
// import * as actions from './actions/Login.js'


class Signup extends React.Component {

	state = {
	    first_name: "",
		last_name: "",
		email: "",
		password:"",
		passwordConfirmation: "",
		location: "",
		language: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	createUser = () => {
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then((response) => {
			if (response.errors){
				alert(response.errors)
			} else {
				localStorage.setItem("token", response.token)
				this.props.login(response.user)
				this.props.history.push(`/users/${response.user.id}`)
			}
		})
	}


	handleSubmit = () => {
		if(this.state.password === this.state.passwordConfirmation){
			this.createUser()
		} else {
			alert("Passwords don't match!")
		}
	}

	render(){
		return(
			<div>
				<br/>
				
				<Form id="sign-up-form">
				<h1>Signup</h1>
				  <Form.Row>
				    <Form.Group as={Col} controlId="formGridFirstName">
				      <Form.Label>First Name</Form.Label>
				      <Form.Control type="text" placeholder="Enter First Name" />
				    </Form.Group>

				    <Form.Group as={Col} controlId="formGridLastName">
				      <Form.Label>Last Name</Form.Label>
				      <Form.Control type="text" placeholder="Enter Last Name" />
				    </Form.Group>
					</Form.Row>
					
				  <Form.Group as={Col} controlId="formGridEmailAddress">
				      <Form.Label>Email Address</Form.Label>
				      <Form.Control type="text" placeholder="Enter Email Address" />
				    </Form.Group>

			<Form.Row>
				<Form.Group controlId="formGridAPassword1">
				    <Form.Label>Password</Form.Label>
				    <Form.Control placeholder="Password" />
				</Form.Group>

				<Form.Group controlId="formGridPassword2">
				    <Form.Label>Confirm Password</Form.Label>
				    <Form.Control placeholder="Confirm Password" />
				</Form.Group>
			</Form.Row>
			
			<Form.Row>
				<Form.Group as={Col} controlId="formGridLanguage">
				    <Form.Label>Language</Form.Label>
				    <Form.Control type="text" placeholder="Enter Language" />
				</Form.Group>

				<Form.Group as={Col} controlId="formGridLocation">
					<Form.Label>Location</Form.Label>
					<Form.Control type="text" placeholder="Enter location" />
				</Form.Group>
			</Form.Row>
				    <br />
				    <br />
				    <br />

				  <Button variant="primary" type="submit">
				    <Link style={{color: 'white'}} to='/home'>Submit</Link>
				  </Button>
				</Form>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
	 ...state.auth
	}
  }
  
  export default connect(mapStateToProps, actions)(Signup)
