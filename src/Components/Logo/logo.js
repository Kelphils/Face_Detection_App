import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'
import './logo.css'

const Logo = () => {
        return (
            <div className= 'ma4 mt0'>
                <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3">
                    <img style = {{paddingTop: '2px', height: 70, width: '100%'}} alt= 'logo' src= {brain} /> 
                </div>
                </Tilt>  
            </div>
                );
    
}

export default Logo;
