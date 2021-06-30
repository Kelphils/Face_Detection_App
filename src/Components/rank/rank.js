import React from 'react';
import './rank.css';

const Rank = ({name, entries}) => {
        return (
            <div>
               <div className= 'white f3 font'>
                   {`${name}, Based on Entries Your Rank is...`}
               </div>
               <div className= 'white f1 font '>
                   {entries}
               </div>
            </div>
                );
    
}

export default Rank;