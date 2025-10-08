import React from 'react';

interface RemoveConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onConfirm may return a Promise
  onConfirm: () => Promise<any> | void;
}

const RemoveConfirmationModal: React.FC<RemoveConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
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
            <h5 className='modal-title w-100' id='exampleModalLabel22'>
              Are You Sure ?
            </h5>
            <button type='button' className='btn-close' onClick={onClose}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
          <div className='modal-body'>
            <div className='remove-box'>
              <p>
                The permission for the use/group, preview is inherited from the object, object will
                create a new permission for this object
              </p>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-animation btn-md fw-bold'
              onClick={onClose}
              disabled={isProcessing}
            >
              No
            </button>
            <button
              type='button'
              className='btn theme-bg-color btn-md fw-bold text-light'
              onClick={async () => {
                try {
                  setIsProcessing(true);
                  const res = onConfirm();
                  if (res && typeof (res as any).then === 'function') {
                    await res;
                  }
                } catch (err) {
                  // swallow here; parent will show toast
                } finally {
                  setIsProcessing(false);
                }
              }}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className='spinner-border spinner-border-sm me-2' role='status' />
                  Removing...
                </>
              ) : (
                'Yes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveConfirmationModal;
