import React from 'react';

const NFTCard = ( props ) => {
  console.log(props)
  return (
    
      <div className='flex flex-row'>
            {props.map((dta) => (
        <div className='flex flex-col columns-4'>
          <div className='flex flex-col'>
            {/* <img src={dta.files[0].uri} /> */}
              <p>{dta.metadata.name}</p>
          </div>
        </div>
            ))}
        
      </div>
    
  )
 };
 
 export default NFTCard;