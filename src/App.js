import React, { Component } from 'react';
import Navigation from './Components/Navigation/navigation';
import Logo from './Components/Logo/logo';
import Signin from './Components/SignIn/signIn';
import ImageLinkForm from './Components/Imagelink/Imagelink';
import FaceRecognition from './Components/Facereg/facereg';
import Register from './Components/Register/register';
import Rank from './Components/rank/rank';
import Particles from 'react-particles-js';
import './App.css';


// setup what design you want your particles to look like on the website
const particleOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

const firstState = {
  input: '',
  imageUrl: "",
  box: {},
  route: 'signin',
  userSignedIn: false,
  user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
  }
}
class App extends Component {

  
  // manage your state in the appp
  constructor() {
    super();
    this.state = firstState;
  };

  loadUser = (data) => {
    this.setState( {user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
    },
      })
  }

  calculateFaceLocation = (data) => {
    const clarifiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width)
    const height = Number(image.height);
    return {
      leftCol: clarifiFace.left_col * width,
      topRow:  clarifiFace.top_row * height,
      rightCol: width - (clarifiFace.right_col * width),
      bottomRow: height - (clarifiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://myfacedetectjs.herokuapp.com/image', {
      method: 'post',
      headers: {'content-Type' : 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
      .then(response =>  {
        if (response) {
          fetch('https://myfacedetectjs.herokuapp.com/image', {
            method: 'put',
            headers: {'content-Type' : 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
    .then(response => response.json())
    .then(count => {
      this.setState( Object.assign(this.state.user, {entries: count})) 
    })
    .catch(console.log)
    }
        this.displayFaceBox(this.calculateFaceLocation(response))
  })
      .catch(err => console.log(err));
 
   
   }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(firstState)
    } else if (route === 'home') {
      this.setState({ userSignedIn: true })
    }
    this.setState({route: route})
  }

  render() {
    return (
      
    <div className="App">
      <Particles className= 'particles'
      params = {particleOptions}/>
      <Navigation  userSignedIn= {this.state.userSignedIn} onRouteChange= {this.onRouteChange}/>
      { this.state.route === 'home'
       ? <div>
       <Logo />
       <Rank  name= {this.state.user.name} entries= {this.state.user.entries} />
       <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
       <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
       </div>
      :(
        this.state.route === 'signin'
        ?<Signin loadUser = {this.loadUser} onRouteChange= {this.onRouteChange}/>
        :<Register loadUser = {this.loadUser} onRouteChange= {this.onRouteChange}/>
      )
      }
    </div>
    
  );
  }
}

export default App;
