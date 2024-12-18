import React from 'react';
import '../popup.css';

const DeleteConfirmation = ({handleDelete,handleClose,text}) => {
    return (
        <div className="popup-background">
        <div className="popup-content"> 
          <p>{text}</p>
          <div className="popup-buttons">
            <button className="popup-button" onClick={handleDelete}>Yes</button>
            <button className="popup-button" onClick={handleClose}>No</button>
          </div>
        </div>
      </div> 
    );
}

export default DeleteConfirmation;
