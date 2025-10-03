import React, { useState } from 'react';
import { changePassword } from '@/services/authService';
import { useAuthDialog } from '@/context/AuthDialogContext';
import toast from 'react-hot-toast';

interface ChangePasswordFormProps {
  className?: string;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { logout } = useAuthDialog();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.current_password.trim()) {
      newErrors.current_password = 'Current password is required';
    }

    if (!formData.new_password.trim()) {
      newErrors.new_password = 'New password is required';
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = 'New password must be at least 8 characters';
    } else if (formData.new_password.length > 100) {
      newErrors.new_password = 'New password must be less than 100 characters';
    }

    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = 'Please confirm your new password';
    } else if (formData.new_password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    if (formData.current_password === formData.new_password) {
      newErrors.new_password = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      current_password: '',
      new_password: '',
      confirm_password: '',
    });
    setErrors({});
    setShowPasswords({
      current: false,
      new: false,
      confirm: false,
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await changePassword(formData);

      if (response.status === 'success') {
        toast.success('Password changed successfully! Please login again.');
        resetForm();

        // Logout user after successful password change
        setTimeout(() => {
          logout();
        }, 2000);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`dashboard-bg-box ${className}`}>
      <div className='dashboard-title mb-3'>
        <h3>Change Password</h3>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='row g-4'>
          <div className='col-12'>
            <div className='form-floating theme-form-floating position-relative'>
              <input
                type={showPasswords.current ? 'text' : 'password'}
                className='form-control'
                id='current_password'
                placeholder='Enter Current Password'
                value={formData.current_password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type='button'
                className='btn position-absolute top-50 end-0 translate-middle-y me-2'
                onClick={() => togglePasswordVisibility('current')}
                disabled={loading}
                style={{ zIndex: 5 }}
              >
                <i className={`fa-solid ${showPasswords.current ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
              <label htmlFor='current_password'>Current Password</label>
              {errors.current_password && (
                <div className='text-danger mt-1'>{errors.current_password}</div>
              )}
            </div>
          </div>

          <div className='col-12'>
            <div className='form-floating theme-form-floating position-relative'>
              <input
                type={showPasswords.new ? 'text' : 'password'}
                className='form-control'
                id='new_password'
                placeholder='Enter New Password'
                value={formData.new_password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type='button'
                className='btn position-absolute top-1/2 end-0 -translate-y-1/2 me-2'
                onClick={() => togglePasswordVisibility('new')}
                disabled={loading}
                style={{ zIndex: 5 }}
              >
                <i className={`fa-solid ${showPasswords.new ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
              <label htmlFor='new_password'>New Password</label>
            </div>
              <div className='form-text'>Password must be 8-100 characters long</div>
              {errors.new_password && <div className='text-danger mt-1'>{errors.new_password}</div>}
          </div>

          <div className='col-12'>
            <div className='form-floating theme-form-floating position-relative'>
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                className='form-control'
                id='confirm_password'
                placeholder='Confirm New Password'
                value={formData.confirm_password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type='button'
                className='btn position-absolute top-50 end-0 translate-middle-y me-2'
                onClick={() => togglePasswordVisibility('confirm')}
                disabled={loading}
                style={{ zIndex: 5 }}
              >
                <i className={`fa-solid ${showPasswords.confirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
              <label htmlFor='confirm_password'>Confirm New Password</label>
            </div>
              {errors.confirm_password && (
                <div className='text-danger mt-1'>{errors.confirm_password}</div>
              )}
          </div>

          <div className='col-12'>
            <div className='d-flex gap-3'>
              <button
                type='button'
                className='btn theme-bg-color btn-md fw-bold text-light'
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className='spinner-border spinner-border-sm me-2' role='status'></span>
                    Changing Password...
                  </>
                ) : (
                  'Change Password'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
