import React from 'react'
import ProfileContainer from './ProfileContainer'
import Login from '../components/Login'
import Signup from '../components/Signup'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import CurrentConversation from '../components/CurrentConversation'
import ConversationForm from '../components/ConversationForm'
import { Route } from 'react-router-dom'



class MainContainer extends React.Component {
	render(){
  // const token = localStorage.getItem("token")
  return (
    <div className="center-div">
    	<NavBar />
      
      	<div  >
          {/* <div id="second-main-content"> */}
          	 <Route path="/login" component={ Login } />
             <Route path="/signup" component={ Signup } />
             <Route path='/home' component={ Home } />
             <Route path='/conversations/new' component={ ConversationForm } />

             <Route path='/conversations/:id' render={(routerProps) => <CurrentConversation conversations={this.props.conversations} {...routerProps} />} />
          </div>
        {/* </div> */}

        <ProfileContainer />

    </div>
  	)
	}
}

export default MainContainer