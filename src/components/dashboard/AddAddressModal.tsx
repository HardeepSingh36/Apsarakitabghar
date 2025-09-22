import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../features/user/userSlice';

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    type: 'home',
    country: 'India',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const addressWithId = { ...formData, id: `${Date.now()}` }; // Add unique ID
    dispatch(addAddress(addressWithId));
    onClose();
  };

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
                      id='firstName'
                      placeholder='Enter First Name'
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <label htmlFor='fullName'>Full Name</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='lastName'
                      placeholder='Enter Last Name'
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <label htmlFor='fullName'>Full Name</label>
                  </div>
                </div>
                <div className='col-xxl-12'>
                  <div className='form-floating theme-form-floating'>
                    <textarea
                      className='form-control'
                      placeholder='Enter Street Address'
                      id='addressLine1'
                      style={{ height: '80px' }}
                      value={formData.addressLine1}
                      onChange={handleChange}
                    ></textarea>
                    <label htmlFor='street'>Street Address</label>
                  </div>
                </div>
                <div className='col-xxl-12'>
                  <div className='form-floating theme-form-floating'>
                    <textarea
                      className='form-control'
                      placeholder='Enter Apartment, suite, unit etc. (optional)'
                      id='addressLine2'
                      style={{ height: '80px' }}
                      value={formData.addressLine2}
                      onChange={handleChange}
                    ></textarea>
                    <label htmlFor='addressLine2'>Address Line 2</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='city'
                      placeholder='Enter City'
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <label htmlFor='city'>City</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='state'
                      placeholder='Enter State'
                      value={formData.state}
                      onChange={handleChange}
                    />
                    <label htmlFor='state'>State</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='postalCode'
                      placeholder='Enter Postal Code'
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                    <label htmlFor='postalCode'>Postal Code</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='phone'
                      placeholder='Enter Phone Number'
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <label htmlFor='phone'>Phone Number</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <select
                      className='form-select'
                      id='type'
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value='home'>Home</option>
                      <option value='work'>Work</option>
                      <option value='billing'>Billing</option>
                      <option value='shipping'>Shipping</option>
                    </select>
                    <label htmlFor='type'>Address Type</label>
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='text'
                      className='form-control'
                      id='country'
                      placeholder='Enter Country'
                      value={formData.country}
                      onChange={handleChange}
                    />
                    <label htmlFor='country'>Country</label>
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
                onClick={handleSubmit}
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
