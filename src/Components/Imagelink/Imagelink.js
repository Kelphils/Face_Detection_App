import React from 'react';
import './imagelink.css'

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
        return (
            <div>
               <p className = 'f3'>
                   {'Magic Brain Detects face in a Picture'}
               </p>
               <div className= 'center'>
                   <div className= 'form pa4 br3 shadow-5'>
                   <input className= 'f4 pa2 w-80 center' type= 'text' onChange={onInputChange} />
                   <button className= 'w-30 grow f4 link ph3 pv2'
                   style={{color: 'turquoise', backgroundColor: 'white', border: '1px solid gray', textAlign: 'center'}}
                   onClick= {onPictureSubmit}
                    >Detect</button>
               </div>
               </div>
            </div>
                );
    
}

export default ImageLinkForm;
