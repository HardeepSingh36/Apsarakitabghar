import React from 'react';

interface RemoveDoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RemoveDoneModal: React.FC<RemoveDoneModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className='modal fade theme-modal show'
      style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
      tabIndex={-1}
    >
      <div className='modal-dialog modal-dialog-centered modal-fullscreen-sm-down'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title text-center' id='exampleModalLabel12'>
              Done!
            </h5>
            <button type='button' className='btn-close' onClick={onClose}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
          <div className='modal-body'>
            <div className='remove-box text-center'>
              <h4 className='text-content'>It's Removed.</h4>
            </div>
          </div>
          <div className='modal-footer pt-0'>
            <button
              type='button'
              className='btn theme-bg-color btn-md fw-bold text-light'
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveDoneModal;
