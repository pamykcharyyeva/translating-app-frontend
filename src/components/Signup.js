
import React from 'react'
import {Form}  from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
// import { Link } from 'react-router-dom'
import * as actions from '../actions/signup.js'
import { connect } from "react-redux"
// import * as actions from './actions/Login.js'


class Signup extends React.Component {

	state = {
	    first_name: "",
		last_name: "",
		email: "",
		password:"",
		password_confirmation: "",
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


	handleSubmit = (e) => {
		e.preventDefault(e)
		
		// if (password !== password_confirmation){
		// 	alert("passwords do not match")
		// } else {
			this.props.signup(this.state, this.props, this.props.password)
			this.setState({
				first_name: "",
				last_name: "",
				email: "",
				password: "",
				password_confirmation: "",
				language:"",
				location:""
			})
		// }
	// }
}

	render(){
		return(
			<div>
				<br/>
				
				<Form id="sign-up-form" onSubmit={this.handleSubmit}>
				<h1>Signup</h1>
				  <Form.Row>
				    <Form.Group as={Col} controlId="formGridFirstName">
				      <Form.Label>First Name</Form.Label>
				      <Form.Control name="first_name" type="text" placeholder="Enter First Name" onChange={this.handleChange} />
				    </Form.Group>

				    <Form.Group as={Col} controlId="formGridLastName">
				      <Form.Label>Last Name</Form.Label>
				      <Form.Control name="last_name" type="text" placeholder="Enter Last Name" onChange={this.handleChange}/>
				    </Form.Group>
					</Form.Row>
					
				  <Form.Group as={Col} controlId="formGridEmailAddress">
				      <Form.Label>Email Address</Form.Label>
				      <Form.Control name="email"type="text" placeholder="Enter Email Address" onChange={this.handleChange}/>
				    </Form.Group>

			<Form.Row>
				<Form.Group as={Col} controlId="formGridAPassword1">
				    <Form.Label>Password</Form.Label>
				    <Form.Control name="password" type ="password" placeholder="Password" onChange={this.handleChange}/>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridPassword2">
				    <Form.Label>Confirm Password</Form.Label>
				    <Form.Control name="password_confirmation" type= "password_confirmation" placeholder="Confirm Password" onChange={this.handleChange}/>
				</Form.Group>
			</Form.Row>
			
			<Form.Row>
				<Form.Group as={Col} controlId="formGridLanguage">
				    <Form.Label>Language</Form.Label>
				    <Form.Control name="language" type="text" placeholder="Enter Language" onChange={this.handleChange}/>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridLocation">
					<Form.Label>Location</Form.Label>
					<Form.Control name="location" type="text" placeholder="Enter location" onChange={this.handleChange}/>
				</Form.Group>
			</Form.Row>
				    <br />
				    <br />
				    <br />

				  <Button variant="primary" type="submit">
				   Submit
				  </Button>
				</Form>
			</div>
		)
	}
}



  
  export default connect(null, actions)(Signup)
