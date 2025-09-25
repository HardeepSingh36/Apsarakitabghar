import React, { useState, useEffect } from 'react';
import { countries } from '@/data/countries';
import Select from 'react-select';
import ReactSelect from 'react-select';

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  // type: 'billing' | 'shipping';
  country: string;
}

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address?: Address | null;
  onSave: (updatedAddress: Address) => void;
}

const countriesOptions = countries.map((country) => ({
  value: country.code,
  label: country.name,
}));

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isOpen, onClose, address, onSave }) => {
  const [formData, setFormData] = useState<Address>(
    address || {
      id: `${Date.now()}`,
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      phone: '',
      country: '',
    }
  );
  const [selectedCode, setSelectedCode] = useState('+91'); // Default country code
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEdit, setIsEdit] = useState(false); // New edit flag

  useEffect(() => {
    if (address) {
      setFormData(address); // Initialize formData with the address prop when editing
      setIsEdit(true); // Set edit flag to true
    } else {
      setFormData({
        id: `${Date.now()}`,
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        country: '',
      });
      setIsEdit(false);
    }
  }, [address]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCode(e.target.value);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Street Address is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal Code is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    if (!isEdit) {
      setFormData({
        id: `${Date.now()}`,
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        country: '',
      });
      setErrors({});
    }

    onClose();
  };

  const handleSubmit = () => {
    if (!validateForm()) return; // Prevent submission if validation fails

    const addressWithId = { ...formData, id: formData.id || `${Date.now()}` }; // Add unique ID if not present
    onSave(addressWithId);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className='modal fade theme-modal show'
      style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
      tabIndex={-1}
    >
      <div className='modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              {isEdit ? 'Edit Delivery Address' : 'Add Delivery Address'}
            </h5>
            <button type='button' className='btn-close' onClick={handleClose}>
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
                    <label htmlFor='firstName'>First Name</label>
                    {errors.firstName && <div className='text-danger'>{errors.firstName}</div>}
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
                    <label htmlFor='lastName'>Last Name</label>
                    {errors.lastName && <div className='text-danger'>{errors.lastName}</div>}
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
                    {errors.addressLine1 && (
                      <div className='text-danger'>{errors.addressLine1}</div>
                    )}
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
                  <Select
                    options={countriesOptions}
                    placeholder='Select a country'
                    isClearable
                    styles={
                      {
                        control: (base: any) => ({
                          ...base,
                          height: '53px',
                          minHeight: '53px',
                          boxShadow: 'none',
                          '&:hover': {
                            borderColor: '#0da487',
                          },
                          '&:focus-within': { borderColor: '#0da487' },
                        }),
                        placeholder: (base: any) => ({
                          ...base,
                          color: '#4a5558', // placeholder text color
                          fontSize: 'calc(13px + 3 * (100vw - 320px) / 1600)',
                        }),
                        input: (base: any) => ({
                          ...base,
                          color: 'black', // input text color
                          fontSize: 'calc(15px + 2 * (100vw - 320px) / 1600)',
                        }),
                        singleValue: (base: any) => ({
                          ...base,
                          color: 'black', // input text color
                          fontSize: 'calc(14px + 2 * (100vw - 320px) / 1600)',
                        }),
                      } as any
                    }
                    value={countriesOptions.find((option) => option.value === formData.country)}
                    onChange={(selectedOption) =>
                      setFormData((prev) => ({
                        ...prev,
                        country: selectedOption ? selectedOption.value : '',
                      }))
                    }
                  />
                  {errors.country && <div className='text-danger'>{errors.country}</div>}

                  {/* <label htmlFor='floatingSelect1'>Country</label> */}
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
                    {errors.city && <div className='text-danger'>{errors.city}</div>}
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
                    {errors.state && <div className='text-danger'>{errors.state}</div>}
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <input
                      type='number'
                      className='form-control'
                      id='postalCode'
                      placeholder='Enter Postal Code'
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                    <label htmlFor='postalCode'>Postal Code</label>
                    {errors.postalCode && <div className='text-danger'>{errors.postalCode}</div>}
                  </div>
                </div>
                <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <div className='input-group'>
                      <select
                        className='form-select max-w-[90px] focus:!shadow-none focus:!border-[#0da487]'
                        id='floatingSelect1'
                        value={selectedCode}
                        onChange={handleCodeChange}
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.dialCode}
                          </option>
                        ))}
                      </select>
                      <input
                        type='text'
                        className='form-control'
                        id='phone'
                        placeholder='Enter Phone Number'
                        value={formData.phone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                    {errors.phone && <div className='text-danger'>{errors.phone}</div>}
                    {/* <label htmlFor='phone'>Phone Number</label> */}
                  </div>
                </div>
                {/* <div className='col-xxl-6'>
                  <div className='form-floating theme-form-floating'>
                    <select
                      className='form-select'
                      id='type'
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value='shipping'>Shipping</option>
                      <option value='billing'>Billing</option>
                    </select>
                    <label htmlFor='type'>Address Type</label>
                  </div>
                </div> */}
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-animation btn-md fw-bold'
                onClick={handleClose}
              >
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
