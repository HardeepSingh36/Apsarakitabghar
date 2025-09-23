import React from 'react';

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className='modal fade theme-modal show'
      style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
      tabIndex={-1}
    >
      <div className='modal-dialog modal-dialog-centered modal-fullscreen-sm-down'>
        <div className='modal-content'>
          <div className='modal-header d-block text-center'>
            <h5 className='modal-title w-100'>Are You Sure You Want to Logout?</h5>
            <button type='button' className='btn-close' onClick={onClose}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
          <div className='modal-body'>
            <div className='remove-box'>
              <p>You will be signed out of your account and taken back to the homepage.</p>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-animation btn-md fw-bold' onClick={onClose}>
              Cancel
            </button>
            <button
              type='button'
              className='btn theme-bg-color btn-md fw-bold text-light'
              onClick={onConfirm}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
