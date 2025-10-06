import React from 'react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave: (profileData: Record<string, any>) => void;
  loading: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, onSave, loading }) => {
  const [form, setForm] = React.useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
  });

  React.useEffect(() => {
    setForm({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      username: user?.username || '',
      email: user?.email || '',
      mobile: user?.mobile || user?.phone_number || '',
      dob: user?.dob || '',
      gender: user?.gender || '',
    });
  }, [user]);

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
          <h5 className='modal-title' id='exampleModalLabel2'>
            Edit Profile
          </h5>
          <button type='button' className='btn-close' onClick={onClose}>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave(form);
          }}
        >
          <div className='modal-body'>
            <div className='row g-4'>
              <div className='col-xxl-6'>
                <div className='form-floating theme-form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    id='first_name'
                    value={form.first_name}
                    onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                    required
                  />
                  <label htmlFor='first_name'>First Name</label>
                </div>
              </div>
              <div className='col-xxl-6'>
                <div className='form-floating theme-form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    id='last_name'
                    value={form.last_name}
                    onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                    required
                  />
                  <label htmlFor='last_name'>Last Name</label>
                </div>
              </div>
              <div className='col-xxl-6'>
                <div className='form-floating theme-form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    id='username'
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    required
                  />
                  <label htmlFor='username'>Username</label>
                </div>
              </div>
              <div className='col-xxl-6'>
                <div className='form-floating theme-form-floating'>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    value={form.email}
                    readOnly
                  />
                  <label htmlFor='email'>Email address</label>
                </div>
              </div>
              <div className='col-xxl-6'>
                <div className='form-floating theme-form-floating'>
                  <input
                    className='form-control'
                    type='tel'
                    id='mobile'
                    value={form.mobile}
                    maxLength={15}
                    onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
                  />
                  <label htmlFor='mobile'>Mobile</label>
                </div>
              </div>
              <div className='col-xxl-6'>
                <div className='form-floating theme-form-floating'>
                  <select
                    className='form-select'
                    id='gender'
                    value={form.gender}
                    onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                  >
                    <option value=''>Select Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                    <option value='Not to Say'>Not to Say</option>
                  </select>
                  <label htmlFor='gender'>Gender</label>
                </div>
              </div>
              <div className='col-xxl-6'>
                <div className='form-floating theme-form-floating'>
                  <input
                    type='date'
                    className='form-control'
                    id='dob'
                    value={form.dob}
                    onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
                  />
                  <label htmlFor='dob'>Date of Birth</label>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-animation btn-md fw-bold' onClick={onClose}>
              Close
            </button>
            <button
              type='submit'
              className='btn theme-bg-color btn-md fw-bold text-light'
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default EditProfileModal;
