import React from 'react';

class Signin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onFormSubmit = e => {
    e.preventDefault();
    const { signInEmail, signInPassword } = this.state;
    if (!signInEmail || !signInPassword) { return alert('Fill in the Required Fields')}
    fetch('https://myfacedetectjs.herokuapp.com/signin', {
      method: 'post',
      headers: {'content-Type' : 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user)
        this.props.onRouteChange('home');
      } else { alert("You Don't Have an Account Please Create an Account or Check if Your Details are Correct") }
    }) 
    
  }


render() {
  const { onRouteChange } = this.props;
  return(
              <article className="br5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 sahdow-5 center">
          <main className="pa4 black-80">
          <form 
          onSubmit={this.onFormSubmit}
          className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="email" name="email-address"  id="email-address"
              // function to recognise email and update it in the state
              onChange = {this.onEmailChange} />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="password" name="password"  id="password"
              // function to recognise password and update it in the state
              onChange= {this.onPasswordChange} />
            </div>
          </fieldset>
          <div className="">
            <input 
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" value="Sign in"/>
          </div>
          <div className="lh-copy mt3">
            <p  onClick= { ()=> onRouteChange('register') }
            className="f5 link dim black db pointer">Register</p>
          </div>
          </form>
          </main>


          </article>


    )
    }

  }
export default Signin;