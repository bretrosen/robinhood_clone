import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  type,
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  if (type === "watchlist") {
    return (
      <p className='login-signup round-buttons' id='add-to-list' onClick={onClick}>Add to list</p>
    )
  }
  if (buttonText === "Edit list") {
    return (
      <div onClick={onClick} id='edit-list'>
        <i className='fa fa-cog edit-icon'></i>
        <span>Edit list</span>
      </div>
    )
  }
  if (type === 'create') {
    return (<i style={{color: "white"}} className='fa fa-plus' onClick={onClick}></i>)
  }
  if (type === 'transfer') {
    return (<p className="login-signup watchlist-sm" id="transfer-money-btn" onClick={onClick}>Transer money</p>)
  }

  return (
    <button onClick={onClick} className='nav-button'>{buttonText}</button>
  );
}

export default OpenModalButton;
