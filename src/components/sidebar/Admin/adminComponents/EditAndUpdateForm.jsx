import React from 'react';
import './popup.css';
import '../admin.css';

const EditAndUpdateForm = ({children,buttonName,heading,additionalChildren,onSubmit,onCancel}) => {


    return (
        <div className='popup-background'>
        <div className='popup-content' >
         <h1 className='AddItemHeading'>{heading}</h1>
         <form class="max-w-sm mx-auto formField">
            <div class="mb-5 formContents">
                {children}
            </div>
           <div className="popup-buttons popup-button-add">
            <button type='submit' onClick={onSubmit} className="popup-button" >{buttonName}</button>
            <button className="popup-button" onClick={onCancel} >Cancel</button>
          
            </div>
            {additionalChildren}
            </form>
             
            </div>
        </div>
    ); 
}

export default EditAndUpdateForm;
