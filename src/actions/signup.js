export function signup(userData, props, password){

  return dispatch => {
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
        body: JSON.stringify({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: password,
         language: userData.language,
          location: userData.location
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors);
      } else {
        localStorage.setItem("token", data.token);
        // console.log(data)
        props.history.push('/home')
        dispatch({type: "LOG_IN", payload: {user: data.user, jwt: data.token}})
      }
    })
  }
}
