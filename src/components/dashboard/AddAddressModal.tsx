import React from 'react';

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className='modal fade theme-modal show'
      style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
      tabIndex={-1}
    >
      <div className='modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Add a new address
            </h5>
            <button type='button' className='btn-close' onClick={onClose}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
          <form>
            <div className='modal-body'>
              <div className='row g-4'>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='fname'
                      placeholder='Enter First Name'
                    />
                    <label htmlFor='fname'>First Name</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='lname'
                      placeholder='Enter Last Name'
                    />
                    <label htmlFor='lname'>Last Name</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='phone'
                      className='form-control'
                      id='phone'
                      placeholder='Enter Phone Number'
                    />
                    <label htmlFor='phone'>Phone Number</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      placeholder='Enter Email Address'
                    />
                    <label htmlFor='email'>Email Address</label>
                  </div>
                </div>
                <div className='col-xxl-12'>
                  <div className='form-floating theme-form-floating'>
                    <textarea
                      className='form-control'
                      placeholder='Leave a comment here'
                      id='address1'
                      style={{ height: '80px' }}
                    ></textarea>
                    <label htmlFor='address1'>Enter Address Line 1</label>
                  </div>
                </div>
                <div className='col-xxl-12'>
                  <div className='form-floating theme-form-floating'>
                    <textarea
                      className='form-control'
                      placeholder='Leave a comment here'
                      id='address2'
                      style={{ height: '80px' }}
                    ></textarea>
                    <label htmlFor='address2'>Enter Address Line 2</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <select className='form-select' id='country' defaultValue='India'>
                      <option value='India'>India</option>
                    </select>
                    <label htmlFor='country'>Country</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='state'
                      placeholder='Enter State'
                    />
                    <label htmlFor='state'>State</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='city'
                      placeholder='Enter City'
                    />
                    <label htmlFor='city'>City</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='pin'
                      placeholder='Enter Pin Code'
                    />
                    <label htmlFor='pin'>Pin Code</label>
                  </div>
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
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
