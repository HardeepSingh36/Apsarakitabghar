import React from 'react';

interface PublishBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PublishBookModal: React.FC<PublishBookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className='modal fade theme-modal show'
      style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
      tabIndex={-1}
    >
      <div className='modal-dialog modal-md modal-dialog-centered modal-fullscreen-sm-down'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Publish Your Book</h5>
            <button type='button' className='btn-close' onClick={onClose}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
          <div className='modal-body'>
            <div className='row g-4'>
              <div className='col-12'>
                <form>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='bookName'
                      placeholder='Book Name'
                    />
                    <label htmlFor='bookName'>Book Name</label>
                  </div>
                </form>
              </div>
              <div className='col-12'>
                <form>
                  <div className='form-floating theme-form-floating'>
                    <input type='file' className='form-control' id='bookPdf' />
                    <label htmlFor='bookPdf'>Upload PDF</label>
                  </div>
                </form>
              </div>
              <div className='col-12'>
                <form>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='authorName'
                      placeholder='Author Name'
                    />
                    <label htmlFor='authorName'>Author Name</label>
                  </div>
                </form>
              </div>
              <div className='col-12'>
                <form>
                  <div className='form-floating theme-form-floating'>
                    <input type='email' className='form-control' id='email' placeholder='Email' />
                    <label htmlFor='email'>Email</label>
                  </div>
                </form>
              </div>
              <div className='col-12'>
                <form>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='tel'
                      className='form-control'
                      id='mobile'
                      placeholder='Mobile'
                      maxLength={10}
                    />
                    <label htmlFor='mobile'>Mobile</label>
                  </div>
                </form>
              </div>
              <div className='col-12'>
                <form>
                  <div className='form-floating theme-form-floating'>
                    <textarea
                      className='form-control'
                      id='message'
                      placeholder='Message'
                      maxLength={10}
                      style={{ height: '80px' }}
                    />
                    <label htmlFor='message'>Message</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-animation btn-md fw-bold' onClick={onClose}>
              Close
            </button>
            <button
              type='button'
              className='btn theme-bg-color btn-md fw-bold text-light'
              onClick={onClose}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishBookModal;
